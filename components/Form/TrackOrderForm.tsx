'use client'
import Loader from "@/components/Shared/Loader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTrckOrderForm } from "./hooks/useTrackOrderForm"


export default function TrackOrderForm () {
  const {isLoading, sameAsCurrent, handleSubmit, inputRef, trip_id} = useTrckOrderForm()
  

  
  
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