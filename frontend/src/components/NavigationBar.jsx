import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome ,AiFillHome } from "react-icons/ai";
import { BsCameraReelsFill ,BsCameraReels } from "react-icons/bs";
import { IoSearchOutline, IoSearchCircle } from "react-icons/io5";
import { IoChatbubbleEllipses, IoChatboxEllipsesOutline } from "react-icons/io5";
import { BsSearchHeartFill,BsSearchHeart } from "react-icons/bs";
import { BsChatDotsFill,BsChatDots } from "react-icons/bs";
import { RiAccountCircleFill,RiAccountCircleLine  } from "react-icons/ri";

const NavigationBar = () =>{
  const [tab, setTab] = useState(window.location.pathname);
  return (
    <div className="fixed bottom-0 w-full bg-white border-t border-gray-200 shadow-lg"/*"fixed bottom-0 w-full bg-white py-3"*/>
      <div className="flex justify-around items-center py-3"/*"flex justify-around" */>
        {/* Cherish Brand Name */}
        <Link
          to="/"
          onClick={() => setTab("/")}
          className="flex items-center space-x-1 text-lg font-extrabold italic tracking-wide text-pink-500 hover:text-pink-400 transition"
        >
          <span>Cherish</span>
        </Link>

        {/* Home */}
        <Link
          to="/"
          onClick={() => setTab("/")}
          className={`flex flex-col items-center text-2xl transition ${tab === "/" ? "text-blue-500" : "text-gray-500 hover:text-gray-700"
            }`}
        >
          {tab === "/" ? <AiFillHome /> : <AiOutlineHome />}
        </Link>

        {/* Reels */}
        <Link
          to="/reels"
          onClick={() => setTab("/reels")}
          className={`flex flex-col items-center text-2xl transition ${tab === "/reels" ? "text-blue-500" : "text-gray-500 hover:text-gray-700"
            }`}
        >
          {tab === "/reels" ? <BsCameraReelsFill /> : <BsCameraReels />}
        </Link>

        {/* Search */}
        <Link
          to="/search"
          onClick={() => setTab("/search")}
          className={`flex flex-col items-center text-2xl transition ${tab === "/search" ? "text-blue-500" : "text-gray-500 hover:text-gray-700"
            }`}
        >
          {tab === "/search" ? <BsSearchHeartFill /> : <BsSearchHeart />}
        </Link>

        {/* Chat */}
        <Link
          to="/chat"
          onClick={() => setTab("/chat")}
          className={`flex flex-col items-center text-2xl transition ${tab === "/chat" ? "text-blue-500" : "text-gray-500 hover:text-gray-700"
            }`}
        >
          {tab === "/chat" ? <BsChatDotsFill /> : <BsChatDots />}
        </Link>


        {/* Account */}
        <Link
          to="/account"
          onClick={() => setTab("/account")}
          className={`flex flex-col items-center text-2xl transition ${tab === "/account" ? "text-blue-500" : "text-gray-500 hover:text-gray-700"
            }`}
        >
          {tab === "/account" ? <RiAccountCircleFill /> : <RiAccountCircleLine />}
        </Link>


      </div>
    </div>
  );
};

export default NavigationBar;
