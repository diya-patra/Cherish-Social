import React, { useState } from "react";
import { PostData } from "../context/PostContext";
import { LoadingAnimation } from "./Loading";

const AddPost = ({ type }) => {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState("");
  const [filePrev, setFilePrev] = useState("");

  const { addPost, addLoading } = PostData();

  const changeFileHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setFilePrev(reader.result);
      setFile(file);
    };
  };

  const submitHandler = e => {
    e.preventDefault()
    const formdata = new FormData();

    formdata.append("caption", caption);
    formdata.append("file", file);
    addPost(formdata, setFile, setCaption, setFilePrev, type);
  }
  return (
    <div className="flex items-center justify-center w-full"/*"bg-gray-100 flex items-center justify-center pt-3 pb-5"*/>
      <div className="bg-white w-[90%] max-w-md p-6 rounded-xl shadow-lg border border-gray-200"/*"bg-white p-8 rounded-lg shadow-md max-w-md"*/>
        <form onSubmit={submitHandler} className="flex flex-col gap-4 items-center"/*"flex flex-col gap-4 items-center justify-between mb-4"*/>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"/*"custom-input"*/
            placeholder="Enter Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />

          <input
            type="file"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"/*"custom-input"*/
            accept={type === "post" ? "image/*" : "video/*"}
            onChange={changeFileHandler}
            required
          />

          {filePrev && (
            <div className="mt-2">
              {type === 'post' ? (
                <img src={filePrev} alt="" className="rounded-lg max-h-[300px] object-contain" />
              ) : (
                <video
                  controlsList="nodownload"
                  controls
                  src={filePrev}
                    className="rounded-lg max-h-[450px] w-[300px] object-contain"/*"h-[450px] w-[300px]"*/
                />
              )}
            </div>
          )}
          <button disabled={addLoading} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md transition disabled:opacity-50"/*"bg-blue-500 text-white px-4 py-2 rounded-md"*/>
            {addLoading ? <LoadingAnimation /> : "+ Add Post"}
          </button>
        </form>
      </div>
    </div>

  );
};

export default AddPost;
