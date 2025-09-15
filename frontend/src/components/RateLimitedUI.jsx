import { ZapIcon } from "lucide-react";
import React from "react";

const RateLimitedUI = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 ">
      <div className=" bg-red-300/20 border border-red-500 rounded-lg shadow-md ">
        <div className=" flex flex-col md:flex-row items-center p-6 ">
          <div className=" flex-shrink-0 bg-primary/20 p-4 rounded-full mb-4 md:mb-0 md:mr-6 ">
            <ZapIcon size={16} className="text-primary" />
          </div>
          <div className=" flex-1 text-center md:text-left ">
            <h3 className=" text-xl font-bold mb-2 "> Rate Limit Reached </h3>
            <p>
              You've made too many requests in a short period. Please wait a
              moment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateLimitedUI;
