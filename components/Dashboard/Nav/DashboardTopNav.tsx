"use client";

import { ThemeToggle } from "@/components/Theme/ThemeToggle";
import { useAppSelector } from "@/lib/store/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchCard from "./SearchCard";

import { useGetSearchResults } from "./hooks/useGetSearchResults";

import { useSetTheme } from "./hooks/useSetTheme";

export default function DashboardTopNav() {
  const {
    inputRef,
    debouncedSearch,
    searchContainerRef,
    trips,
    isLoading,
    error,
    openSearchContainer,
    handleSearchItemTrack,
  } = useGetSearchResults();
  const { handleThemeChange } = useSetTheme();

  const { last_name, first_name } = useAppSelector((state) => state.user);

  const path = usePathname();

  const iconsAndTextDivClass =
    "flex justify-between items-center p-2 font-bold group hover:bg-primary-color hover:text-white rounded-md";
  const iconsAndTextSpanClass =
    "flex items-center justify-center gap-2 relative";

  return (
    <nav
      className={`flex  w-6/6 left-0 right-0 top-auto z-40 ${
        path.startsWith("/dashboard") ? "justify-between" : "justify-center"
      }  items-center p-4 md:h-20 h-16 shadow-md gap-10 w-full bg-white dark:bg-primary-dark font-bold`}
    >
      <section className="hidden md:block w-full text-2xl ml-10 cursor-pointer">
        <Link href={"/dashboard"}>
          <p>Hailit</p>
        </Link>
      </section>

      <section className="ml-8 md:ml-0  w-full relative">
        <input
          ref={inputRef}
          onChange={debouncedSearch}
          className="flex items-center justify-center border-2 border-opacity-40  dark:border-opacity-20  border-black dark:border-slate-50 rounded-full md:w-full w-[250px] text-[12px]  dark:bg-primary-dark md:h-12 h-10 font-light p-3"
          placeholder="Enter Trip ID to search "
        />
        {openSearchContainer && (
          <SearchCard
            trips={trips}
            isLoading={isLoading}
            error={error}
            handleSelectedTrip={handleSearchItemTrack}
            ref={searchContainerRef}
          />
        )}
      </section>

      <section className="flex gap-2 justify-end items-center w-full ">
        <div className="hidden md:flex items-center  w-full  justify-end rounded-full h-12 gap-2">
          <div className="flex items-center justify-center border-none bg-black dark:bg-white dark:text-secondary-dark text-white rounded-full  md:h-12 md:w-12 sm:h-8 sm:w-8 -ml-1">
            <p>{first_name[0]}</p>
          </div>
          <div className="flex flex-col items-start justify-center">
            <p className="font-bold text-md">
              {first_name} {last_name}
            </p>
            <p className="font-bold text-[12px] opacity-50">Administrator</p>
          </div>
        </div>

        <div className={`#{iconsAndTextDivClass} hidden md:block`}>
          <span className={iconsAndTextSpanClass}>
            {/* <RiNotification3Line className="text-2xl"/> */}
          </span>
        </div>
        <div
          className={`-ml-4 md:-ml-0 ${iconsAndTextDivClass}`}
          onClick={handleThemeChange}
        >
          <span className={iconsAndTextSpanClass}>
            <ThemeToggle />
          </span>
        </div>
      </section>
    </nav>
  );
}
