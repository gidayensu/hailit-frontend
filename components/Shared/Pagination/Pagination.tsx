"use client";
import { Button } from "@/components/ui/button";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { usePagination } from "./hooks/usePagination";

type HandlePagination = (options: number)=> void;

export default function Pagination({
  totalPages,
  setPage,
  storageKey,
  isSearch
}: {
  totalPages: number;
  setPage: HandlePagination;
  storageKey: string;
  isSearch?: boolean
}) {

  const {handlePageClick, handleNext, handlePrevious, getPaginationButtons, currentPage } = usePagination({totalPages, setPage, storageKey, isSearch})
  
  
  const activeClass =
    "bg-primary-shade  hover:bg-primary-medium focus:bg-primary-shade cursor-pointer text-white";
  const inActiveClass =
    "dark:text-white hover:dark:bg-[#3333] bg-gray-100 hover:bg-primary-color hover:text-white dark:bg-secondary-dark";
  const generalClass =
    "cursor-pointer flex items-center justify-center text-center text-[13px] w-12 h-8 rounded-md text-black";

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        variant={"empty"}
        onClick={handlePrevious}
        className={`${generalClass} dark:text-white`}
      >
        <GrFormPrevious />
      </Button>
      {}
      {getPaginationButtons().map((page, index) => (
        <Button
          variant={"empty"}
          key={index * Math.random()}
          onClick={() => handlePageClick(page)}
          className={`${generalClass} ${
            currentPage === page ? activeClass : inActiveClass
          }`}
          disabled={page === "..."}
        >
          {page}
        </Button>
      ))}
      <Button
        variant={"empty"}
        onClick={handleNext}
        className={`${generalClass} dark:text-white`}
      >
        <GrFormNext />
      </Button>
    </div>
  );
};

