'use client'
import { ThemeToggle } from "../../Theme/ThemeToggle";
//ui + icons
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { checkTimeOfDay } from "@/lib/utils";

//main components
import Login from "./Login";
import SignUp from "./SignUp";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLogin } from "./hooks/useLogin";
export type CurrentTheme = string | undefined;

export default function Authentication () {
  const [signUp, setSignUp]  = useState<boolean>(true);
  
  const timeOfDay = checkTimeOfDay();

  const handleSignUp = ()=> {
    setSignUp(()=>!signUp)
  }

    
    return (
        <>

          <div className="flex flex-col items-center justify-center gap-2 md:mt-10">
                
            
            <div className="flex justify-between items-center p-2 font-bold group hover:bg-primary-color hover:text-white rounded-md cursor-pointer mt-5 mb-5 md:hidden border border-black dark:border-white">
            <span className="flex items-center justify-center gap-2 relative">
              <ThemeToggle />

            </span>
          </div>
            
            <span className="text-xl font-semibold">Hello, Good {`${timeOfDay}`}! </span>
            {/* <p className="text-center mt-8">
              Login or Sign Up to Request for affordable <br /> and fast deliveries in Accra and Kumasi
            </p> */}
          </div>
          <div className=" flex flex-col items-center justify-center max-w-[400px] w-full md:p-0 p-6">
{/* 

  LOGIN AS DIFFERENT USER TYPE
*/}
        {!signUp && 
          <Login setSignUp={handleSignUp} />
      }
        {signUp && 
            <SignUp setSignUp={handleSignUp}/>
      }
       
          </div>
          
        </>
    )
}