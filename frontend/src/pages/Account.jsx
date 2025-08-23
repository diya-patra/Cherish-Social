import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { PostData } from "../context/PostContext";
import PostCard from "../components/PostCard";
import { FaArrowUp, FaArrowDownLong } from "react-icons/fa6";

const Account = ({ user }) => {
  const navigate = useNavigate();

  const {logoutUser} = UserData();

  const { posts, reels } = PostData();

  let myPosts;

  if(posts) {
    myPosts = posts.filter((post) => post.owner._id === user._id);
  }

  let myReels;

  if(reels) {
    myReels = reels.filter((reel) => reel.owner._id === user._id);
  }

  const [type, settype] = useState("post")

  const logoutHandler =() =>{
    logoutUser(navigate);
  };

  const [index, setIndex] = useState(0);
  
    const prevReel = () => {
      if(index === 0) {
        console.log("null");
        return null;
      }
      
      setIndex(index-1);
    };
  
    const nextReel = () => {
      if (index === myReels.length - 1) {
        console.log("null");
        return null;
      }
  
      setIndex(index + 1);
    };

  return (
    <>
      {user && (
        <>
          <div className="bg-gray-50 min-h-screen flex flex-col gap-6 items-center justify-start pt-10 pb-16 px-4"/*"bg-gray-100 min-h-screen flex flex-col gap-4 items-center justify-center pt-3 pb-14"*/>
            <div className="bg-white flex flex-col md:flex-row justify-between items-center gap-6 p-8 rounded-2xl shadow-lg w-full max-w-3xl"/*"bg-white flex justify-between gap-4 p-8 rounded-ig shadow-md max-w-md"*/>
              <div className="flex flex-col items-center md:items-start"/*"image flex flex-col justify-between mb-4 gap-4"*/>
                <img
                  src={user.profilePic.url}
                  alt="" className="w-40 h-40 rounded-full object-cover border-4 border-blue-300 shadow-md"/*"w-[180px] h-[180px] rounded-full"*/
                />
              </div>

              <div className="flex flex-col gap-2 text-center md:text-left"/*"flex flex-col gap-2"*/>
                <p className="text-gray-800 font-semibold text-xl"/*"text-gray-800 font-semibold"*/>{user.name}</p>
                <p className="text-gray-500 text-sm"/*"text-gray-500 text-sm"*/>{user.email}</p>
                <p className="text-gray-500 text-sm capitalize"/*"text-gray-500 text-sm"*/>{user.gender}</p>
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">{user.followers.length}</span> Followers
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">{user.followings.length}</span> Following
                </p>
                {/* <p className="text-gray-500 text-sm">{user.followers.length}follower</p> */}
                {/* <p className="text-gray-500 text-sm">{user.followings.length}following</p> */}
                <button onClick={logoutHandler} className="mt-3 bg-red-500 hover:bg-red-600 transition text-white font-semibold px-6 py-2 rounded-lg shadow"/*"bg-red-500 text-white rounded-md"*/>Logout</button>
              </div>
            </div>

            <div className="controls flex justify-center items-center bg-white shadow-md p-3 rounded-xl gap-6"/*"controls flex justify-center items-center bg-white p-4 rounded-md gap-7"*/>
              <button
                onClick={() => settype("post")}
                className={`px-5 py-2 rounded-lg font-semibold transition ${type === "post"
                    ? "bg-blue-500 text-white shadow"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                Posts
              </button>
              <button
                onClick={() => settype("reel")}
                className={`px-5 py-2 rounded-lg font-semibold transition ${type === "reel"
                    ? "bg-blue-500 text-white shadow"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                Reels
              </button>
              {/* <button onClick={() => settype("post")}>Posts</button> */}
              {/* <button onClick={() => settype("reel")}>Reels</button> */}
            </div>

            {
              type === "post" && (
                <>
                  {
                    myPosts && myPosts.length > 0 ? myPosts.map((e) => (
                      <PostCard type={"post"} value={e} key={e._id} />
                    )) : (
                        <p className="text-gray-500 italic">No Post Yet</p>
                    )}
                </>
              )
            }
            {
              type === "reel" && (
                <>
                  {
                    myReels && myReels.length > 0 ? (
                      <div className="flex gap-5 justify-center items-center ml-15"/*"flex gap-3 justify-center items-center"*/>
                        <PostCard
                          type={"reel"}
                          value={myReels[index]}
                          key={myReels[index]._id}
                        />
                        <div className="flex flex-col justify-center items-center gap-4"/*"button flex flex-col justify-center items-center gap-6"*/>
                          {index === 0 ? "" : <button className="bg-gray-500 hover:bg-gray-600 text-white p-4 rounded-full shadow transition"/*"bg-gray-500 text-white py-5 px-5 rounded-full"*/ onClick={prevReel}>
                            <FaArrowUp />
                          </button>}
                          {index === myReels.length - 1 ? "" : <button className="bg-gray-500 hover:bg-gray-600 text-white p-4 rounded-full shadow transition"/*"bg-gray-500 text-white py-5 px-5 rounded-full"*/ onClick={nextReel}>
                            <FaArrowDownLong />
                          </button>}
                        </div>
                      </div>
                    ) : (
                        <p className="text-gray-500 italic">No Reels Yet</p>
                    )}
                </>
              )
            }
          </div>

          
        </>
      )}
    </>
  );
};

export default Account;
