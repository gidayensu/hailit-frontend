'use client'
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { SmallLoader } from "../Shared/Loader";
export default function TrackPackage () {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const inputRef = useRef<any>(null);
  const router = useRouter();
  
  const handleTripTrack = ()=> {
    setIsLoading(true)
    const tripId = inputRef.current?.value;
    router.push(`/track/${tripId}`)
  }
    return(
        
        <div className=" flex flex-col items-center justify-center w-5/6 h-36 md:h-44 bg-gradient-to-r from-primary-shade to-primary-color mt-10 rounded-lg text-white gap-1">
        <p className="text-[14px] w-44 h-7 text-center">
          Track your package
        </p>
        <div>

        <div className="w-full font-bold rounded-xl flex items-center justify-end gap-2">
            <Input className="flex gap-2 items-center relative h-9 w-60 md:w-96 md:h-12 justify-center rounded-full  text-[12px]" placeholder="Trip ID" ref={inputRef}/>
            <Button  className="absolute border-none mr-1 p-1 h-7 w-16 md:w-28 md:h-10  text-white rounded-full text-[13px]" onClick={handleTripTrack}>
              { isLoading ? <SmallLoader color="red"/> : "Track"
              }
              </Button>                  
          
            
          
        </div>
        </div>
      </div>
    )
}