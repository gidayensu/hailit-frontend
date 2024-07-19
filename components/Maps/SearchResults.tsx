import { getSpecificName } from "@/lib/utils";
import { Separator } from "../ui/separator";

import Loader from "../Shared/Loader";
import SearchItem from "./SearchItem";
import { useLocationSearch } from "./hooks/useLocationSearch";
import { LocationType } from "./hooks/useMap";

export default function SearchResults() {
  
  const {isLoading, searchData,  searchContainer, handleSelectedLocation} = useLocationSearch()
  const searchResults = searchData.features;
  return (
    <>
      {searchContainer && (
        <div className="md:w-96 h-auto shadow-md w-80  bg-white z-50  text-secondary-dark  text-sm rounded-lg ">
          <span className="flex flex-col gap-2">
            {isLoading && <Loader color="text-primary-color" />}

            {!isLoading && searchResults && searchResults.length > 0 &&
              searchResults.map((data: any, index: number) => {
                
                if (data && index <= 3) {
                  return (
                    <span
                      key={index}
                      className="flex flex-col gap-2 cursor-pointer hover:bg-gray-100 hover:rounded-xl"
                    >
                      {!data.place_name? (
                        <Loader color="text-primary-color" />
                      ) : (
                        <p
                          onClick={() => {
                            handleSelectedLocation({
                              
                              mapPoint: [data.center[1], data.center[0]], //lat, long
                            });
                          }}
                        >
                          <SearchItem item={getSpecificName(data.place_name)}/>
                          
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

// import { getSpecificName } from "@/lib/utils";
// import { Separator } from "../ui/separator";

// import Loader from "../Shared/Loader";
// import SearchItem from "./SearchItem";
// import { useLocationSearch } from "./hooks/useLocationSearch";
// import { LocationType } from "./hooks/useMap";

// export default function SearchResults() {
  
//   const {isLoading, searchData,  searchContainer, handleSelectedLocation} = useLocationSearch()
  
//   return (
//     <>
//       {searchContainer && (
//         <div className="md:w-96 h-auto shadow-md w-80  bg-white z-50  text-secondary-dark  text-sm rounded-lg ">
//           <span className="flex flex-col gap-2">
//             {isLoading && <Loader color="text-primary-color" />}
//             {!isLoading && searchData && searchData.length > 0 &&
//               searchData.map((data: any, index: number) => {
                
//                 if (data && index <= 3) {
//                   return (
//                     <span
//                       key={index}
//                       className="flex flex-col gap-2 cursor-pointer hover:bg-gray-50"
//                     >
//                       {data && !data?.features[0]?.place_name? (
//                         <Loader color="text-primary-color" />
//                       ) : (
//                         <p
//                           onClick={() => {
//                             handleSelectedLocation({
                              
//                               mapPoint: [data?.features[0]?.center[1], data?.features[0].center[0]], //lat, long
//                             });
//                           }}
//                         >
//                           <SearchItem item={getSpecificName(data?.features[0].place_name)}/>
                          
//                         </p>
//                       )}
//                       {index !==3 &&
//                       <Separator className="dark:bg-slate-300 bg-primary-dark opacity-20" />
//                       }
//                     </span>
//                   );
//                 }
//               })}
//           </span>
//         </div>
//       )}
//     </>
//   );
// }
