"use client";
import { useLocationSearch } from "./hooks/useLocationSearch";

export default function LocationSearch() {
  const {mapDataHandler, inputRef} = useLocationSearch();
  return (
    <div className="flex items-center justify-center">
      <textarea
        ref={inputRef}
        className="flex items-center justify-center resize-none border-none text-slate-400 p-2 h-10 sm:h-12 w-60 md:w-96 text-center bg-white z-50 mt-5 shadow-lg rounded-full text-[13px]"
        placeholder="Search your location"
        onChange={mapDataHandler}
      />
    </div>
  );
}
