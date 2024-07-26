'use client'
import Loader from "@/components/Shared/Loader";

import { forwardRef, useEffect, useState, } from "react";
import { GrSearch } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";
interface SearchTableProps {
  isSuccess: boolean,
  handleSearch: ({reset}:{reset?:boolean})=>void;
  
}
const SearchTable = forwardRef<HTMLInputElement, SearchTableProps>(({isSuccess, handleSearch, }, ref) => {
  
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [showClear, setShowClear] = useState<boolean>(false);
  
  const handleClear = (e:any)=> {
    setShowClear(true)
      
      if(!e) {
       searchClick("reset")
      }
  }

  
  const searchClick = (reset?: "reset")=> {
    if(reset) {
      handleSearch({reset: true})
      setShowClear(false)
      setSearchLoading(false)
    }
    if(!reset) {

      setShowClear(true)
      setSearchLoading(true)
      handleSearch({reset: false})
    }

  }
  
  useEffect(()=> {

    if(isSuccess) {
      setSearchLoading(false)  
    }
  }, [isSuccess, setSearchLoading])

  
  return (
    <div className="flex items-end md:w-1/2 w-full justify-end gap-2">
      <div className="w-full flex gap-2 justify-end items-center relative">
        <input
          ref={ref}
          onChange={(e) => handleClear(e.target.value)}
          placeholder="Search"
          className="flex h-10 w-full rounded-xl border border-slate-500 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-amber-00 dark:border-opacity-30 dark:bg-primary-dark dark:ring-offset-slate-950 dark:placeholder:text-slate-100 dark:placeholder:text-opacity-20 dark:focus-visible:ring-slate-300 "
        />
        {showClear && (
          <div
            className="absolute border-none mr-2 px-2 h-8 max-w-44 gap-3 md:h-8 rounded-lg text-[13px] flex items-center justify-between border  bg-red-500 hover:bg-red-600 text-white cursor-pointer"
            onClick={() => searchClick("reset")}
          >
            Clear
            <RxCross2 />
          </div>
        )}
      </div>

      <div
        className={`h-10 w-10 flex items-center justify-center  rounded-md text-white dark:text-secondary-dark bg-primary-color hover:bg-primary-shade dark:bg-white cursor-pointer  `}
        onClick={() => searchClick()}
      >
        {searchLoading && !isSuccess ? <Loader /> : <GrSearch />}
      </div>
    </div>
  );
});

SearchTable.displayName = "SearchTable";
export default SearchTable;
