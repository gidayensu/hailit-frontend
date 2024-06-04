'use client'
import Loader from "@/components/Shared/Loader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function TrackOrderForm ({inputRef, onClickFunc}: {inputRef: any, onClickFunc: ()=>void}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
 
  const handleSubmit = ()=> {
    setIsLoading(true);
    onClickFunc()
  }
  
    return (
        <>
        <div className="flex flex-col w-full max-w-xl items-center space-x-2 justify-center mt-10 gap-3 ">
        <Input
          type="text"
          placeholder="Trip ID"
          className="w-full border-2 ml-1 h-12 border-slate-400"
          ref={inputRef }
          />
        {!isLoading && 
        
        <Button type="submit" className="w-full h-12" onClick={handleSubmit}>
          Submit
        </Button>
        }
        {isLoading && <Button type="submit" className="w-full" disabled>
          <Loader color="red"/>
        </Button>}
      </div>
           </>
    )
}