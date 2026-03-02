import React from "react";
import { assets } from "../assets/assets";
const Steps = () => {
  return (
    <>
      <div className="mx-4 lg:mx-20 py-20 xl:py-40">
        <h1 className="text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent">
          Steps to remove background <br className="max-md:hidden" /> image in
          seconds
        </h1>

        <div className="grid lg:grid-cols-3  items-center  gap-6 mt-16 xl:mt-24 justify-center">
          {/* Step 1 */}
          <div className="flex items-start gap-2 bg-white border shadow-md p-7 pb-10 rounded-lg hover:scale-105 transition-all duration-500 max-w-sm">
            <img className="w-10" src={assets.upload_icon} alt="Upload Icon" />
            <div>
              <p className="text-xl font-medium">Upload Image</p>
              <p className="text-sm text-neutral-500">
                Upload your image from your device in just one click.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-4 bg-white border shadow-md p-7 pb-10 rounded-lg hover:scale-105 transition-all duration-500 max-w-sm">
            <img
              className="w-10"
              src={assets.remove_bg_icon}
              alt="Remove Background Icon"
            />
            <div>
              <p className="text-xl font-medium">Remove Background</p>
              <p className="text-sm text-neutral-500">
                Our AI automatically detects and removes the background.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-4 bg-white border shadow-md p-7 pb-10 rounded-lg hover:scale-105 transition-all duration-500 max-w-sm">
            <img
              className="w-10"
              src={assets.download_icon}
              alt="Download Icon"
            />
            <div>
              <p className="text-xl font-medium">Download Image</p>
              <p className="text-sm text-neutral-500">
                Download your high-quality transparent image in seconds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Steps;
