import { useDeleteTripMutation } from "@/lib/store/apiSlice/hailitApi";

export const useDeleteTrip = (tripId:string) => {
    
    const [deleteTrip, {isLoading, error, isSuccess}] = useDeleteTripMutation();

    const handleDeleteTrip = ()=> {
        deleteTrip(tripId)
    }

    
    
    return {isSuccess, error, isLoading, handleDeleteTrip}

}