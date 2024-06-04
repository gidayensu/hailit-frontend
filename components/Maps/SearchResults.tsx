import { Separator } from "../ui/separator";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import {
  setPickUpLocation,
  
  setSearchContainer,
} from "@/lib/store/slice/mapSlice";
import { Skeleton } from "../ui/skeleton";
import { UserLocation } from "./PickUpMap";
import { getSpecificName } from "@/lib/utils";
export default function SearchResults() {
  const dispatch = useAppDispatch();
  const { searchData, searchContainer } = useAppSelector((state) => state.map);

  const selectedSearchItemHandler = ({
    locationName,
    mapPoint,
  }: {
    locationName: string;
    mapPoint: UserLocation;
  }) => {
    dispatch(setPickUpLocation(mapPoint));
    dispatch(setSearchContainer(false));
  };


  return (
    <>
      {searchContainer && (
        <div className="md:w-96 h-auto border border-red-500 bg-white z-50 dark:bg-primary-dark text-black dark:text-slate-200 text-sm rounded-lg p-3">
          <span className="flex flex-col gap-2">
            {searchData && searchData.length > 0 &&
              searchData.map((data: any, index: number) => {
                if (data && index <= 3) {
                  return (
                    <span
                      key={index}
                      className="flex flex-col text-[11px] gap-2"
                    >
                      {!data.display_name ? (
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
                          {getSpecificName(data.display_name)}
                        </p>
                      )}

                      <Separator className="dark:bg-slate-300 bg-primary-dark opacity-60" />
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
