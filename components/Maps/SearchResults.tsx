import { getSpecificName } from "@/lib/utils";
import { Separator } from "../ui/separator";

import Loader from "../Shared/Loader";
import SearchItem from "./SearchItem";
import { useLocationSearch } from "./hooks/useLocationSearch";

export default function SearchResults() {
  const { isLoading, searchData, searchContainer, handleSelectedLocation } =
    useLocationSearch();
  const searchResults = searchData.features;
  return (
    <>
      {searchContainer && (
        <div className="md:w-96 h-auto shadow-md w-80  bg-white z-50  text-secondary-dark  text-sm rounded-lg ">
          <span className="flex flex-col gap-2">
            {isLoading && <Loader color="text-primary-color" />}

            {!isLoading &&
              searchResults &&
              searchResults.length > 0 &&
              searchResults.map((data: any, index: number) => {
                if (data && index <= 3) {
                  return (
                    <span
                      key={data.center}
                      className="flex flex-col gap-2 cursor-pointer hover:bg-gray-100 hover:rounded-xl"
                    >
                      {!data.place_name ? (
                        <Loader color="text-primary-color" />
                      ) : (
                        <p
                          onClick={() => {
                            handleSelectedLocation({
                              mapPoint: [data.center[1], data.center[0]], //lat, long
                            });
                          }}
                        >
                          <SearchItem item={getSpecificName(data.place_name)} />
                        </p>
                      )}
                      {index !== 3 && (
                        <Separator className="dark:bg-slate-300 bg-primary-dark opacity-20" />
                      )}
                    </span>
                  );
                }
              })}
          </span>
        </div>
      )}
    </>
  );
}

