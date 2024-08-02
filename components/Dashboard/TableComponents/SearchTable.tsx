'use client'
import Loader from "@/components/Shared/Loader";
import { Button } from "@/components/ui/button";

import { forwardRef, useEffect, useState } from "react";
import { GrSearch } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";
interface SearchTableProps {
  status: string,
  handleSearch: ({reset}:{reset?:boolean})=>void;
  
}
const SearchTable = forwardRef<HTMLInputElement, SearchTableProps>(({status, handleSearch, }, ref) => {
  
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [showClear, setShowClear] = useState<boolean>(false);
  const [typing, setTyping] = useState<boolean>(false);
  
  const handleEnterToSubmit = (event:any) => {
    
    if (event.key === 'Enter') {
      event.preventDefault(); 
      searchClick();
    }
  };
  useEffect(()=> {
    console.log({status})
    if(status === "fulfilled") {
      setSearchLoading(false)  
    }
  }, [status, setSearchLoading])

  const handleClear = (event:any)=> {
    setTyping(true)
    setShowClear(true)
    if(!event) {
        setTyping(false)
       searchClick("reset")
      }
  }
  
  
  const searchClick = (reset?: "reset")=> {
    setSearchLoading(true)
    if(reset) {
      handleSearch({reset: true})
      setShowClear(false)
      setSearchLoading(false)
    }
    if(!reset) {

      setShowClear(true)
      
      handleSearch({reset: false})
    }
    
    setTimeout(()=>{
      setSearchLoading(false)
    }, 2000)
  }
  

  
  return (
    <div className="flex items-end md:w-1/2 w-full justify-end gap-2">
      <div className="w-full flex gap-2 justify-end items-center relative">
        <input
          ref={ref}
          onKeyDown={handleEnterToSubmit}
          onChange={(e) => handleClear(e.target.value)}
          placeholder="Search"
          className="flex h-10 w-full rounded-xl border border-slate-500 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-amber-00 dark:border-opacity-30 dark:bg-primary-dark dark:ring-offset-slate-950 dark:placeholder:text-slate-100 dark:placeholder:text-opacity-20 dark:focus-visible:ring-slate-300 "
        />
        {showClear && (
          <div
            className="absolute border-none mr-2 px-2 h-8 max-w-44 gap-3 md:h-8 rounded-lg text-[13px] flex items-center justify-between border  bg-red-500 hover:bg-red-600 text-white cursor-pointer"
            onClick={() => handleClear("")}
          >
            Clear
            <RxCross2 />
          </div>
        )}
      </div>

      <Button variant={'empty'}
        
        className={`h-10 w-10 flex items-center justify-center  rounded-md text-white dark:text-secondary-dark bg-primary-color hover:bg-primary-shade dark:bg-white cursor-pointer  `}
        onClick={() => searchClick()}
        disabled={status === "pending" || !typing}
      >
        {searchLoading ? <Loader /> : <GrSearch className="text-2xl" />}
      </Button>
    </div>
  );
});

SearchTable.displayName = "SearchTable";
export default SearchTable;
