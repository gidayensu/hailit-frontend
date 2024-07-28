import { useGetTrip } from "@/components/Dashboard/TrackOrder/StatusSection/hooks/useGetTrip";
import { useParams } from "next/navigation";
import { useState } from "react";

export const useTrckOrderForm = ()=> {
    const {
    
        inputRef,
        
        handleTrackTrip,
        
      } = useGetTrip();
      const [isLoading, setIsLoading] = useState<boolean>(false);
      const [sameAsCurrent, setSameAsCurrent] = useState<boolean>(false);
      const params = useParams();
      const {trip_id} = params;
      
      const handleSubmit = ()=> {
        setIsLoading(true);
        if(inputRef.current?.value === trip_id) {
          setSameAsCurrent(true)
          setIsLoading(false);
          
          setTimeout(()=> {
            setSameAsCurrent(false)
          }, 3000)
        } else {
          handleTrackTrip()
        }
        
      }
    
      
      
    return {isLoading, sameAsCurrent, handleSubmit, inputRef, trip_id}
}