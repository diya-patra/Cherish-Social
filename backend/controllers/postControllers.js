import TryCatch from "../utils/Trycatch.js";
import getDataUrl from "../utils/urlGenerator.js";
import cloudinary from "cloudinary";
import { Post } from "../models/postModel.js";

export const newPost = TryCatch(async (req, res) => {
    const { caption } = req.body;

    const ownerId = req.user._id;

    const file = req.file;
    const fileUrl = getDataUrl(file);

    let option

    const type = req.query.type
    if (type === "reel") {
        option = {
            resource_type: "video",
        }
    } else {
        option = {}
    }

    const myCloud = await cloudinary.v2.uploader.upload(fileUrl.content, option);

    const post = await Post.create({
        caption,
        post: {
            id: myCloud.public_id,
            url: myCloud.secure_url,
        },
        owner: ownerId,
        type,
    });

    res.status(201).json({
        message: "Post created",
        post,
    });
});

export const deletePost = TryCatch(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) {
        return res.status(404).json({
            message: "No post with this id",
        });
    }

    if (post.owner.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            message: "Unauthorized",
        });
    }

    await cloudinary.v2.uploader.destroy(post.post.id);

    await post.deleteOne();

    res.status(200).json({
        message: "Post Deleted",
    });
});

export const getAllPosts = TryCatch(async (req, res) => {
    const posts = await Post.find({ type: "post" })
        .sort({ createdAt: -1 })
        .populate("owner", "-password")
        .populate({
            path: "comments.user",
            select: "-password",
        });

    const reels = await Post.find({type: "reel"})
        .sort({ createdAt: -1 })
        .populate("owner", "-password")
        .populate({
            path: "comments.user",
            select: "-password",
        });

    res.status(200).json({
        posts, reels,
    });
});

export const likeUnlikePost = TryCatch(async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        return res.status(404).json({
            message: "No Post with this id",
        });
    }

    if (post.likes.includes(req.user._id)) {
        const index = post.likes.indexOf(req.user._id);

        post.likes.splice(index, 1);

        await post.save();

        res.status(200).json({
            message: "Post Unliked",
        });
    } else {
        post.likes.push(req.user._id);

        await post.save();

        res.status(200).json({
            message: "Post Liked",
        });
    }
});

export const commentonPost = TryCatch(async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        return res.status(404).json({
            message: "No Post with this id",
        });
    }

    post.comments.push({
        user: req.user._id,
        name: req.user.name,
        comment: req.body.comment,
    });

    await post.save();

    res.status(200).json({
        message: "Comment added",
        post,
    });
});

export const deleteComment = TryCatch(async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        return res.status(404).json({
            message: "No Post with this id",
        });
    }

    if (!req.body.commentId) {
        return res.status(400).json({
            message: "Comment ID is required",
        });
    }

    const commentIndex = post.comments.findIndex(
        ( item ) => item._id.toString() === req.body.commentId.toString()
    );

    if (commentIndex === -1) {
        return res.status(400).json({
            message: "Comment not found",
        });
    }

    const comment = post.comments[commentIndex];

    if (post.owner.toString() === req.user._id.toString() || comment.user.toString() === req.user._id.toString()) {
        post.comments.splice(commentIndex, 1);

        await post.save();

        res.status(200).json({
            message: "Comment deleted",
            post,
        });
    } else {
        return res.status(400).json({
            message: "You are not allowed to delete this comment",
        });
    }

    post.comments = post.comments.filter(comment => comment._id.toString() !== req.params.commentId);

    await post.save();

    res.status(200).json({
        message: "Comment deleted",
        post,
    });
});

export const editCaption = TryCatch(async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        return res.status(404).json({
            message: "No Post with this id",
        });
    }

    if (post.owner.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            message: "You are not owner of this post",
        });
    }

    post.caption = req.body.caption;

    await post.save();
    
    res.status(200).json({
        message: "Post updated",
        post,
    });
});