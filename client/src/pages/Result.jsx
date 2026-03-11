import React from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
const Result = () => {
  const { image, resultImage } = useContext(AppContext);
  return (
    <>
      <div className="mx-4 my-3 lg:mx-20 mt-14 min-h-[72vh]">
        <div className="bg-white rounded-lg px-8 py-6 drop-shadow-md">
          <div className="flex flex-col sm:grid grid-cols-2 gap-8">
            <div>
              <p className="font-semibold text-gray-600 mb-2">Orginal</p>
              {image && (
                <img
                  className="rounded-md border"
                  src={image ? URL.createObjectURL(image) : assets.image_w_bg}
                  alt=""
                />
              )}
            </div>
            {/*  */}
            <div className="flex flex-col">
              <p className="font-semibold text-gray-600 mb-2">
                Background Removed
              </p>
              <div className="rounded-md border border-gray-600 mb-2 p-0.5 h-full relative bg-layer overflow-hidden">
                {resultImage ? (
                  // <img src={assets.image_wo_bg} alt="" />
                  <img src={resultImage} alt="" />
                ) : (
                  <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
                    <div className="border-4 border-violet-600 rounded-full h-10 w-10 border-t-transparent animate-spin"></div>
                  </div>
                )}
                {/* <img src={assets.image_wo_bg} alt="" /> */}
                {/* <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
                  <div className="border-4 border-violet-600 rounded-full h-10 w-10 border-t-transparent animate-spin"></div>
                </div> */}
              </div>
            </div>
          </div>
          {/*  */}
          {resultImage && (
            <div className="flex justify-center items-center sm:justify-end flex-wrap gap-4 mt-6">
              <Link
                to={"/"}
                className="px-8 py-2.5 text-violet-600 text-sm border border-violet-600 rounded-full hover:scale-105 transition-all duration-700"
              >
                Try another image
              </Link>
              <a
                className="px-8 py-2.5 text-white bg-gradient-to-r from-violet-600 to-fuchsia-500  rounded-full hover:scale-105 transition-all duration-700"
                href={resultImage}
                download="bg-removed.png"
              >
                Download image
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Result;
