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
    return (
      <div className=" flex flex-col items-center justify-center w-full md:h-64 h-44 bg-gradient-to-r from-primary-shade to-primary-color mt-10 text-white gap-1">
        <div>
        <p className="text-md font-semibold w-full h-7 ">
          Track your package
        </p>
          <div className="w-full rounded-xl flex items-center justify-end gap-2">
            <Input
              className="flex gap-2 items-center relative h-14 w-72 md:w-96  justify-center rounded-xl text-secondary-dark dark:text-white text-sm"
              placeholder="Enter trip ID"
              ref={inputRef}
            />
            <Button
              className="absolute border-none mr-1 p-1 h-10 w-20 md:w-28 md:h-10  text-white rounded-xl text-[13px] "
              onClick={handleTripTrack}
            >
              {isLoading ? <SmallLoader /> : "Track"}
            </Button>
          </div>
        </div>
      </div>
    );
}