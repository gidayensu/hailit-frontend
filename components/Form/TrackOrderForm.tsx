'use client'
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import Container from "@/components/ui/container"
import { Input } from "@/components/ui/input"
import { FaPhone, FaWhatsapp } from "react-icons/fa"
import Loader from "@/components/Shared/Loader"
import { useRouter } from "next/navigation"
export default function TrackOrderForm ({inputRef, onClickFunc}: {inputRef: any, onClickFunc: ()=>void}) {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  
  const handleSubmit = ()=> {
    setIsLoading(true);
    onClickFunc()
  }
  
    return (
        <>
        <div className="flex w-full max-w-xl items-center space-x-2 justify-center mt-10 ">
        <Input
          type="text"
          placeholder="Trip ID"
          className="w-full border-2 border-slate-400"
          ref={inputRef }
          />
        {!isLoading && 
        
        <Button type="submit" className="w-full" onClick={handleSubmit}>
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