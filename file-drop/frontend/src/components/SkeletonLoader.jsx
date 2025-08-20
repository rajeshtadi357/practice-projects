import React from "react";

const SkeletonLoader = ({ type = "square", size = "h-40 w-40" }) => {
  let shapeClass = "";

  if (type === "circle") {
    shapeClass = "rounded-full";
  } else if (type === "rounded") {
    shapeClass = "rounded-xl";
  }

  return (
    <div className="flex flex-col gap-3 p-4 items-center w-full max-w-xs">
      {/* Main skeleton block */}
      <div
        className={`skeleton ${size} ${shapeClass} bg-gray-200 dark:bg-gray-700 shadow-md`}
      ></div>

      {/* Optional text placeholders */}
      <div className="skeleton h-4 w-3/4 bg-gray-200 dark:bg-gray-700 shadow"></div>
      <div className="skeleton h-4 w-1/2 bg-gray-200 dark:bg-gray-700 shadow"></div>
    </div>
  );
};

export default SkeletonLoader;


