import { getSpecificName } from "@/lib/utils";
import { Separator } from "../ui/separator";

import Loader from "../Shared/Loader";
import SearchItem from "./SearchItem";
import { useLocationSearch } from "./hook/useLocationSearch";
import { LocationType } from "./hook/useMap";

export default function SearchResults({locationType}: {locationType:LocationType}) {
  
  const {isLoading, searchData,  searchContainer, selectedSearchItemHandler} = useLocationSearch(locationType)
  
  return (
    <>
      {searchContainer && (
        <div className="md:w-96 h-auto shadow-md w-80  bg-white z-50  text-secondary-dark  text-sm rounded-lg ">
          <span className="flex flex-col gap-2">
            {isLoading && <Loader color="text-primary-color" />}
            {!isLoading && searchData && searchData.length > 0 &&
              searchData.map((data: any, index: number) => {
                
                if (data && index <= 3) {
                  return (
                    <span
                      key={index}
                      className="flex flex-col gap-2 cursor-pointer hover:bg-gray-50"
                    >
                      {!data.display_name? (
                        <Loader color="text-primary-color" />
                      ) : (
                        <p
                          onClick={() => {
                            selectedSearchItemHandler({
                              locationName: getSpecificName(data.display_name),
                              mapPoint: [data.lat, data.lon],
                            });
                          }}
                        >
                          <SearchItem item={getSpecificName(data.display_name)}/>
                          
                        </p>
                      )}
                      {index !==3 &&
                      <Separator className="dark:bg-slate-300 bg-primary-dark opacity-20" />
                      }
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
