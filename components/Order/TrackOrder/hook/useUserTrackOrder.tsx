import { useRouter } from "next/navigation";
import { useRef } from "react";

export const useUserTrackOrder = () => {
    const inputRef = useRef<any>(null);
    const router = useRouter();
  
    const handleTrackTrip = ()=> {
    const tripId = inputRef.current?.value;
      router.push(`/track/${tripId}`)
    }
  
    
    return {handleTrackTrip, inputRef}
    
}