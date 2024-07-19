'use client'
import Loader from "@/components/Shared/Loader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useParams } from "next/navigation";
export default function TrackOrderForm ({inputRef, onClickFunc}: {inputRef: any, onClickFunc: ()=>void,}) {
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
      onClickFunc()
    }
    
  }

  
  
    return (
        <div className="flex flex-col w-full max-w-xl items-center space-x-2 justify-center mt-10 gap-3 ">
          {
            sameAsCurrent && <p className="text-red-500">
                You have entered same ID!
            </p>
          }
        <Input
          type="text"
          placeholder="Trip ID"
          defaultValue={trip_id}
          className={`${sameAsCurrent ? 'border-red-500 text-red-500' : 'border-slate-400'} w-full border-2 ml-1 h-12 `}
          
          ref={inputRef }
          />
        <Button type="submit" className="w-full h-12" onClick={handleSubmit} disabled={isLoading }>
          {isLoading ? <Loader /> : 'Submit'}
        </Button>
        
        
      </div>
        
    )
}