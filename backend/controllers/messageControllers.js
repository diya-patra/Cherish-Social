import { Chat } from '../models/chatModels.js';
import { Messages } from '../models/Messages.js';
import TryCatch from '../utils/Trycatch.js';

export const sendMessage = TryCatch(async (req, res) => {
    const { receiverId, message } = req.body;

    const senderId = req.user._id;

    if (!receiverId || !message) {
        return res.status(400).json({
            message: "Receiver ID and message text are required",
        });
    }

    let chat = await Chat.findOne({
        users: { $all: [senderId, receiverId] },
    });

    if (!chat) {
        chat = new Chat({
            users: [senderId, receiverId],
            latestMessage: {
                text: message,
                sender: senderId,
            },
        });

        await chat.save();
    }

    const newMessage = new Messages({
        chatId: chat._id,
        sender: senderId,
        text: message,
    });

    await newMessage.save();

    await chat.updateOne({
        latestMessage: {
            text: message,
            sender: senderId,
        },
    });

    res.status(201).json({
        newMessage,
    });
});

export const getAllMessages = TryCatch(async (req, res) => {
    const {id} = req.params;

    const userId = req.user._id;

    const chat = await Chat.findOne({
        users: { $all: [userId, id] },
    });

    if (!chat) {
        return res.status(404).json({
            message: "No chat with these user",
        });
    }

    const messages = await Messages.find({
        chatId: chat._id,
    });

    res.status(200).json({
        messages,
    });
});
