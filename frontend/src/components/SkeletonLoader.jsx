// src/components/SkeletonLoader.jsx
import React from "react";

const SkeletonCard = () => (
  <div className="bg-white/80 backdrop-blur-xl border border-purple-100/50 rounded-2xl shadow-xl p-6 w-full animate-pulse">
    {/* Avatar Placeholder with gradient */}
    <div className="relative -mt-14 mb-4 mx-auto w-28 h-28">
      <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-200 to-pink-200 p-1">
        <div className="w-full h-full rounded-full bg-gray-200" />
      </div>
    </div>

    {/* Name Placeholder */}
    <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-2/3 mx-auto mb-2" />

    {/* Speciality Placeholder */}
    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-1/2 mx-auto mb-3" />

    {/* Experience Badge Placeholder */}
    <div className="h-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full w-3/4 mx-auto mb-4" />

    {/* Address Placeholder */}
    <div className="p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl mb-4">
      <div className="h-3 bg-gray-200 rounded w-1/4 mb-2" />
      <div className="h-3 bg-gray-200 rounded w-full mb-1" />
      <div className="h-3 bg-gray-200 rounded w-5/6" />
    </div>

    {/* Buttons Placeholder */}
    <div className="flex gap-2">
      <div className="flex-1 h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl" />
      <div className="flex-1 h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl" />
    </div>
  </div>
);

const SkeletonLoader = () => {
  return (
    <div className="grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-12">
      {Array.from({ length: 8 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};

export default SkeletonLoader;
