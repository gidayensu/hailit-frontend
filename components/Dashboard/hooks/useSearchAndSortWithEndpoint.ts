'use client'
import { useRef, useState } from "react";
import { useSortTable } from "./useSortTables";
import { TableTypes } from "./useSortTables";

export type QueryEndpoint = "vehicles?" | "users?" | "riders?" | "drivers?" | "trips?";

export function useSearchAndSortWithEndpoint({endpoint, initialColumn, table, initialSortDirection}:{table:TableTypes,  endpoint:QueryEndpoint, initialColumn: string, initialSortDirection?:string}) {

  const searchRef = useRef<any>(null);
  const [isSearch, setIsSearch] = useState<boolean>(false);
   const [searchQuery, setSearchQuery] = useState<string>('');
  const { handleSort, sortDetails, setDataLoading, dataLoading, } = useSortTable({table: table, initialColumn: initialColumn, initialSortDirection:initialSortDirection});
  
  if (sortDetails.column && sortDetails.sortDirection) {
    endpoint+= `&sortColumn=${sortDetails.column}&sortDirection=${sortDetails.sortDirection}`
  }
  if(searchQuery) {
    endpoint+=`&search=${searchQuery}`
  }

  const handleSearch = ({reset}:{reset?:boolean})=> {
    if(reset) {
      if(searchRef.current) {
        searchRef.current.value = ''
      }
      setIsSearch(false)
    } else {
      setIsSearch(true)
    }
    setSearchQuery(searchRef?.current?.value || '')
  }

  return {
    handleSort, 
    sortDetails,
    dataLoading,
    handleSearch,
    searchRef,
    endpoint,
    searchQuery,
    setSearchQuery,
    setDataLoading,
    isSearch
  };
}

