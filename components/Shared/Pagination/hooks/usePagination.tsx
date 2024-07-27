
import Loader from "../../Loader";
import { useState, useEffect } from "react";


export type HandlePagination = (options: number)=> void;

export const usePagination = ({
    totalPages,
    setPage,
    storageKey,
    isSearch
  }: {
    totalPages: number;
    setPage: HandlePagination;
    storageKey: string;
    isSearch?:boolean
  })=> {
    
    const getInitialCurrentPage = () => {
        const savedCurrentPage = localStorage.getItem(storageKey);
        return savedCurrentPage ? JSON.parse(savedCurrentPage) : 1;
      };
      const [currentPage, setCurrentPage] = useState<number>(getInitialCurrentPage);

      useEffect(()=>{

        if(isSearch) {
          setCurrentPage(1)
          setPage(1)
        }
      }, [isSearch, setPage, setCurrentPage])
    
      //store current page in localstorage. StorageKey associated with the table using the pagination
      //component
      useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(currentPage));
        setPage(currentPage);
      }, [currentPage, setPage, storageKey]);
    
      const getPaginationButtons = () => {
        const pages = [];
        const maxDisplayedPages = 5;
    
        if (totalPages <= maxDisplayedPages) {
          return [...Array(totalPages).keys()].map((page) => page + 1);
        }
    
        if (!totalPages) {
          pages.push(
            ...[Array(maxDisplayedPages).keys()].map((_, index) => (
              <Loader color="text-primary-color" key={index} />
            ))
          );
        } else if (currentPage <= 3) {
          pages.push(...[1, 2, 3, 4, 5, "...", totalPages]);
        } else if (currentPage >= totalPages - 2) {
          pages.push(
            ...[
              1,
              "...",
              totalPages - 4,
              totalPages - 3,
              totalPages - 2,
              totalPages - 1,
              totalPages,
            ]
          );
        } else {
          pages.push(
            ...[
              1,
              "...",
              currentPage - 1,
              currentPage,
              currentPage + 1,
              "...",
              totalPages,
            ]
          );
        }
    
        return pages;
      };
    
      const handlePrevious = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
          setPage(currentPage - 1);
        }
      };
    
      const handleNext = () => {
        if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1);
          setPage(currentPage + 1);
        }
      };
    
      const handlePageClick = (page: number | string | React.ReactNode) => {
        if (typeof page === "number") {
          setCurrentPage(page);
          setPage(page);
        }
      };

      return {currentPage, handlePageClick, handleNext, handlePrevious, getPaginationButtons, }
    
}