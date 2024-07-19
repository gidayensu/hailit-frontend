"use client";
import { useState } from "react";

export default function SearchLocation() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % 4);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + 4) % 4);
  };

  return (
    <main className="flex items-center justify-center p-4 text-red-500">
      <div className="relative h-96 w-96 border border-green-500 flex overflow-hidden items-center justify-center">
        <div
          className="flex transition-transform duration-500 w-44 h-44 border border-red-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        ></div>
        <div
          className="flex transition-transform duration-500 w-44 h-44 border border-red-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        ></div>
        <div
          className="flex transition-transform duration-500 w-44 h-44 border border-red-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        ></div>
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white px-2 py-1 border border-gray-500"
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white px-2 py-1 border border-gray-500"
        >
          Next
        </button>
      </div>
    </main>
  );
}
