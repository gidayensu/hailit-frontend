import { Trip } from "@/lib/store/slice/tripSlice";
import { useState } from "react";

export const useClientTripsPagination = ({trips, tripsPerPage}:{trips: Trip[] , tripsPerPage: number}) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
  
  const indexOfLastTrip = currentPage * tripsPerPage;
  const totalPages = trips?.length/tripsPerPage || 1;
  
  const indexOfFirstTrip = indexOfLastTrip - tripsPerPage;
  const currentTrips = trips?.slice(indexOfFirstTrip, indexOfLastTrip);

  const nextPage = () => {
    if (indexOfLastTrip < trips?.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
    

    
    
    return {nextPage, prevPage, totalPages, currentTrips, tripsPerPage, currentPage, setCurrentPage, indexOfFirstTrip, indexOfLastTrip }

}