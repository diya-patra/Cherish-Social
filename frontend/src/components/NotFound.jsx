import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
            <div className="flex flex-col items-center space-y-6 text-center">
                {/* App/Brand name */}
                <div className="text-gray-600 text-xl font-medium">Social Media</div>

                {/* Heading */}
                <div className="text-5xl font-bold text-gray-800">
                    Page Not Found
                </div>

                {/* Subtext */}
                <div className="text-gray-500">
                    Sorry, this page isn&apos;t available.
                </div>

                {/* Button */}
                <div className="flex justify-center">
                    <button
                        onClick={() => navigate("/")}
                        className="bg-gray-700 px-6 py-2 text-white font-medium rounded-lg hover:bg-gray-800 transition-transform duration-200 hover:scale-105 shadow-md"
                    >
                        Visit Homepage
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;

// import React from "react";
// import { useNavigate } from "react-router-dom";

// const NotFound = () => {
//     const navigate = useNavigate()
//     return(
//     <div className = "flex items-center justify-center h-screen">
//         <div className="flex-col space-y-4 text-center">
//             <div className="text-gray-600 text-xl font-medium">Social Media</div>
//             <div className="text-5xl font-medium">Page Not Found</div>
//             <div className="text-grey-500">Sorry,this page isn't available</div>
//             <div className="flex-items-center justify-center">
//                 <div onClick ={()=>navigate("/")}className="bg-gray-600 px-4 py-1 text-white font-medium rounded-lg hover:scale-105 cursor-pointer">Visit Homepage</div>
//             </div>
//         </div>
//     </div>
//     );
// };

// export default NotFound;
