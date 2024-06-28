'use client'
import { ThemeToggle } from "../../Theme/ThemeToggle";
//ui + icons
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { checkTimeOfDay } from "@/lib/utils";

//main components
import Login from "./Login";
import SignUp from "./SignUp";

export type CurrentTheme = string | undefined;

export default function Authentication () {
  const timeOfDay = checkTimeOfDay();
    
    return (
        <>

          <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex justify-between items-center p-2 font-bold group hover:bg-primary-color hover:text-white rounded-md cursor-pointer mt-2 md:hidden  gap-2">
            <span className="flex items-center justify-center gap-2 relative border rounded-md w-8 h-8 border-black dark:border-white">
              <ThemeToggle />
            </span>
              
          </div>
            <span className="text-xl font-semibold">Good {`${timeOfDay}`}! </span>
            
          </div>
          <div className="">

          <Tabs defaultValue="login" className="w-80 sm:w-[400px]">
      <TabsList className="grid w-full grid-cols-2 rounded-2xl h-14">
        <TabsTrigger value="login" className="rounded-2xl h-12">Login</TabsTrigger>
        <TabsTrigger value="signup" className="rounded-2xl h-12">Sign Up</TabsTrigger>
      </TabsList>
      {/* LOGIN TAB */}
          <Login/>
          {/* SIGN UP TAB */}
          
            <SignUp/>
      </Tabs>
          </div>
          
        </>
    )
}