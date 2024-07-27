'use client'
import { useRef, useState } from "react";
import { useSortTable } from "./useSortTables";
import { TableTypes } from "./useSortTables";

 type EndPoint = "vehicles?" | "users?" | "riders?" | "drivers?" | "trips?";

export function useSearchAndSort({endpoint, columns, table}:{table:TableTypes,  endpoint:EndPoint, columns: any}) {

  const searchRef = useRef<any>(null);
  const [isSearch, setIsSearch] = useState<boolean>(false);
   const [searchQuery, setSearchQuery] = useState<string>('');
  const { handleSort, sortDetails, setDataLoading, dataLoading, } = useSortTable({table: table, columns: columns});
  
  if (sortDetails.column && sortDetails.sortDirection) {
    endpoint+= `&sortColumn=${sortDetails.column}&sortDirection=${sortDetails.sortDirection}`
  }
  if(searchQuery) {
    endpoint+=`&search=${searchQuery}`
  }

  const handleSearch = ({reset}:{reset?:boolean})=> {
    if(reset) {
      searchRef.current.value = ''
      setIsSearch(false)
    } else {
      setIsSearch(true)
    }
    setSearchQuery(searchRef?.current?.value)
  }

  return {
    handleSort, 
    sortDetails,
    dataLoading,
    handleSearch,
    searchRef,
    endpoint,
    setDataLoading,
    isSearch
  };
}

