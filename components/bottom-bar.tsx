"use client"


import { LuHome, LuUser, LuPlus } from "react-icons/lu";
import { Button } from "@/components/ui/button"



export function BottomBar() {


  return (
    <div className="flex justify-center items-center p-4 bottom-0 h-20 border-2 border-slate-500 gap-10">
    
        <div className="flex flex-col justify-center items-center">
        <Button variant='outline'  className="border-none bg-none  hover:bg-none">
          <LuHome className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 " />
          <LuHome className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 " />
        </Button>
        <p className="text-sm font-bold">
          Home
        </p>
        </div>
     
        <div className="flex flex-col justify-center items-center">
        <Button variant="outline" size="icon"  className="border-none">
          <LuPlus className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <LuPlus className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
        <p className="text-sm font-bold">
          New Delivery
        </p>
        </div>
        <div className="flex flex-col justify-center items-center">
        <Button variant="outline" size="icon"  className="border-none">
          <LuUser className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <LuUser className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
        <p className="text-sm font-bold">
          Account
        </p>
        </div>
        
    </div>
  )
}
