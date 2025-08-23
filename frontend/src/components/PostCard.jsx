import React, { useEffect, useState } from "react";
import { BsChatFill, BsThreeDotsVertical } from "react-icons/bs";
import { IoHeartSharp, IoHeartOutline } from "react-icons/io5";
import { UserData } from "../context/UserContext";
import { PostData } from "../context/PostContext";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const PostCard =({type, value}) => {
    const [ isLike, setIsLike ]= useState(false);
    const[ show, setShow ] = useState(false);
    const { user } = UserData();
    const { likePost, addComment } = PostData();

    const formatDate = format(new Date(value.createdAt), "MMMM do")

    useEffect(() => {
        for(let i = 0; i < value.likes.length; i++) {
            if (value.likes[i] === user._id) {
                setIsLike(true);
            }
        };
    }, [value, user._id]);

    const likeHandler = () => {
        setIsLike(!isLike);

        likePost(value._id);
    };

    const [ comment, setComment ] = useState("");

    const addCommentHandler = (e) => {
        e.preventDefault();
        addComment(value._id, comment, setComment, setShow);
    }

    return(
        <div className="bg-gray-50 flex items-center justify-center w-full px-4"/*"bg-gray-100 flex items-center justify-center pt-3 pb-14"*/>
            <div className="bg-white w-full max-w-lg p-6 mb-6 rounded-2xl shadow-lg"/*"bg-white p-8 rounded-lg shadow-md max-w-md"*/>
                <div className="flex justify-between items-center mb-4"/*"flex items-center space-x-2"*/>
                    <Link
                        className="flex items-center gap-3"/*"flex items-center space-x-2"*/
                        to={`/user/${value.owner._id}`}
                    >
                        <img
                            src={value.owner.profilePic.url}
                            alt=""
                            className="w-10 h-10 rounded-full object-cover border"/*"w-8 h-8 rounded-full"*/
                        />

                        <div>
                            <p className="text-gray-800 font-semibold"/*"text-gray-800 font-semibold"*/>{value.owner.name}</p> 
                            <p className="text-gray-500 text-xs"/*"text-gray-500 text-sm"*/>{formatDate}</p>
                        </div>
                    </Link>

                    {value.owner._id === user._id && (
                            <button className="text-gray-500 hover:text-gray-700"/*"hover:bg-gray-500 rounded-full p-1 text-2xl"*/>
                                <BsThreeDotsVertical />
                            </button>
                    )}
                </div>
            
                {value.caption && (
                    <p className="text-gray-700 mb-3 whitespace-pre-line">{value.caption}</p>
                )}
            {/* <div className="mb-4">
                <p className = "text-gray-800">{value.caption}</p>
            </div> */}

            <div className="mb -4">
                {type === "post" ? (
                    <img
                        src = {value.post.url}
                        alt =""
                            className="w-full max-h-[500px] object-cover rounded-xl shadow-sm"/*"object-cover rounded-md"*/
                    />
                ) : (
                <video
                    src = {value.post.url}
                    alt = ""
                                className="w-full max-h-[600px] rounded-xl shadow-sm"/*"w-[450px] h-[600px] object-cover rounded-md"*/
                    autoPlay
                    controls
                />
                )}
            </div>
            
                <div className="flex justify-between items-center text-gray-600 mb-3"/*"flex items-center justify-between text-gray-500"*/>
                    <div className="flex items-center gap-3"/*"flex items-center space x-2"*/>
                    <button onClick={likeHandler} className="text-red-500 text-2xl"/*"text-red-500 text-2xl cursor-pointer"*/>
                        {isLike ? <IoHeartSharp /> : <IoHeartOutline />}
                    </button>

                        <span className="text-sm font-medium"/*"hover:bg-gray-50 rounded-full p-1"*/>
                        {value.likes.length}Likes
                    </span>
                </div>
                
                    <button className="flex items-center gap-2 text-sm hover:text-blue-500 transition"/*"flex justify-center items-center gap-2 px-2 hover: bg-gray-50 rounded-full p-1"*/ onClick={()=>setShow(!show)}>
                    <BsChatFill/>
                    <span>{value.comments.length}Comments</span>
                </button>
                </div>
                
                {show && (
                    <form onSubmit={addCommentHandler} className="flex gap-3 mt-2 items-center"/*"flex gap-3"*/>
                        <input
                            type="text"
                            className="flex-1 border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"/*"custom-input"*/
                            placeholder =" Enter Comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-lg shadow"/*"bg-gray-100 rounded-lg px-5 py-2"*/ type="submit">Add</button>
                    </form>
                )}
                
                {/* <hr className ="mt-2 mb-2"/>
                <p className="text-gray-800 font-semibold" > Comments</p>
                <hr className ="mt-2 mb-2"/> */}
                <div className="mt-4 border-t pt-3 max-h-[200px] overflow-y-auto"/* mt-4"*/>
                        {value.comments && value.comments.length > 0 ? (
                            value.comments.map((e) => <Comment value={e} key={e._id} user={user} />)
                        ) : (
                            <p>No Comments</p>
                        )}
                </div>
            </div>
        </div>
    );
};

export default PostCard;

export const Comment = ({ value, user }) => {
    return (
        <div className="flex items-start gap-3 mb-3"/*"flex items-center space-x-2 mt-2"*/>
            <Link to={`/user/${value.user._id}`}>
                <img
                    src={value.user.profilePic.url}
                    className="w-9 h-9 rounded-full object-cover border"/*"w-8 h-8 rounded-full"*/
                    alt=""
                />
            </Link>
            <div>
                <p className="text-gray-800 font-semibold">{value.user.name}</p>
                <p className="text-gray-500 text-sm">{value.comment}</p>
            </div>

            {value.user._id === user._id && (
                <button className="text-red-500 hover:text-red-600"/*"text-red-500"*/>
                    <MdDelete />
                </button>
            )}
        </div>
    );
};
