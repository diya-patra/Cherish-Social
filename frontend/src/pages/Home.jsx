import React from "react";
import AddPost from "../components/AddPost";
import PostCard from "../components/PostCard";
import { PostData } from "../context/PostContext"; // 👈 use PostData hook
import { Loading } from "../components/Loading";

const Home = () => {
  const { posts, loading } = PostData(); // 👈 now we have posts from context

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex justify-center w-full">
          {/* Main feed container */}
          <div className="w-full max-w-2xl px-4">
            {/* Add post box */}
            <div className="mb-6">
              <AddPost type="post" />
            </div>

            {/* Post feed */}
            <div className="space-y-6">
              {posts && posts.length > 0 ? (
                posts.map((e) => (
                  <PostCard value={e} key={e._id} type={"post"} />
                ))
              ) : (
                <p className="text-center text-gray-500">No Post Yet</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
