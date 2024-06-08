import { Separator } from "../ui/separator";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import {
  setPickUpLocation,
  setDropOffLocation,
  setSearchContainer,
} from "@/lib/store/slice/mapSlice";
import { Skeleton } from "../ui/skeleton";
import { UserLocation } from "./MainMap";
import { getSpecificName } from "@/lib/utils";

import SearchItem from "./SearchItem";
import { LocationType } from "./hook/useMap";


export default function SearchResults({locationType}: {locationType:LocationType}) {
  const dispatch = useAppDispatch();
  const { searchData,  searchContainer } = useAppSelector((state) => state.map);
  
    
    const selectedSearchItemHandler = ({
    locationName,
    mapPoint,
  }: {
    locationName: string;
    mapPoint: UserLocation;
  }) => {
    locationType === "pickup" 
    ? dispatch(setPickUpLocation(mapPoint))
    : locationType === "drop off"
    ? dispatch(setDropOffLocation(mapPoint))
    : ''
    dispatch(setSearchContainer(false));
  };

  
  return (
    <>
      {searchContainer && (
        <div className="md:w-96 h-auto shadow-md  bg-white z-50 dark:bg-primary-dark text-black dark:text-slate-200 text-sm rounded-lg ">
          <span className="flex flex-col gap-2">
            {searchData && searchData.length > 0 &&
              searchData.map((data: any, index: number) => {
                
                if (data && index <= 3) {
                  return (
                    <span
                      key={index}
                      className="flex flex-col gap-2 cursor-pointer hover:bg-gray-50"
                    >
                      {!data.display_name? (
                        <Skeleton className="h-4 w-full" />
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
