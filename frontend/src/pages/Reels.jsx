import React, { useState } from "react";
import AddPost from "../components/AddPost";
import { PostData } from "../context/PostContext";
import PostCard from "../components/PostCard";
import { FaArrowUp, FaArrowDownLong } from "react-icons/fa6";
import { Loading } from "../components/Loading";

const Reels = () => {
  const { reels, loading } = PostData();
  const [index, setIndex] = useState(0);

  const prevReel = () => {
    if(index === 0) {
      return null;
    }
    
    setIndex(index-1);
  };

  const nextReel = () => {
    if (index === reels.length-1) {
      return null;
    }

    setIndex(index + 1);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
          <div className="flex flex-col items-center w-full min-h-screen bg-gray-100 py-6"/*"flex justify-center items-center gap-3 w-full"/*"bg-gray-100"*/>
            <div className="mb-6 w-full max-w-md">
              <AddPost type="reel" />
            </div>
            <div className="relative flex flex-col items-center"/*"w-[300px] md:w-[500px]"/*"flex m-auto gap-3 w-[300px] md:w-[500px]"*/>
            {reels && reels.length > 0 ? (
              <PostCard key={reels[index]._id} value={reels[index]} type={"reel"} />
            ) : (
              <p className="text-center text-gray-500">No reels yet</p>
            )}
              <div className="absolute inset-y-0 right-[-70px] flex flex-col justify-center items-center gap-6">
                {index === 0 ? "" : <button className="bg-gray-700 text-white p-4 rounded-full shadow-md hover:bg-gray-800 transition"/*"bg-gray-500 text-white py-5 px-5 rounded-full"*/ onClick={prevReel}>
                <FaArrowUp />
              </button>}
                {index === reels.length - 1 ? "" : <button className="bg-gray-700 text-white p-4 rounded-full shadow-md hover:bg-gray-800 transition"/*"bg-gray-500 text-white py-5 px-5 rounded-full"*/ onClick={nextReel}>
                <FaArrowDownLong />
              </button>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Reels;
