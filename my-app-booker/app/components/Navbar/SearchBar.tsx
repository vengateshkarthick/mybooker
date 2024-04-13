"use client";

import { BiSearch } from "react-icons/bi";

export default function SearchBar() {
  return (
    <div className="border-b w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
      <div className="flex flex-row justify-between items-center">
        <div className="text-sm font-semibold px-6">Search..</div>
        <div className="hidden sm:block text-sm font-semibold border-x flex-1 px-6 text-center">
          Any week
        </div>
        <div className="text-sm pl-6 pr-2 font-semibold flex-1 text-gray-100 flex flex-row items-center gap-3 w-auto">
          <div className="hidden sm:block text-black text-sm">guests</div>
          <div className="p-2 bg-rose-500 rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}
