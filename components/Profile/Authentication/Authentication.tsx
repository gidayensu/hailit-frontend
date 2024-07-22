'use client'
import { ThemeToggle } from "../../Theme/ThemeToggle";
//images
import logoDark from '../../../public/images/logo-dark.png';
import logo from '../../../public/images/logo.png';

//main components
import { useSetTheme } from "@/components/Dashboard/Nav/hooks/useSetTheme";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";

export default function Authentication () {
  const [signUp, setSignUp]  = useState<boolean>(false);
  
  const {theme, systemTheme} = useSetTheme();

  const handleSignUp = ()=> {
    setSignUp(()=>!signUp)
  }
  const image:StaticImageData = theme === "dark" || (theme==="system" && systemTheme === "dark") ? logoDark :logo ;
    
    return (
        <>

          <div className="flex flex-col items-center justify-center gap-2 md:mt-10">
              <Image src={image} alt="logo" height={120}/>
                
            
            <div className="flex justify-between items-center p-2 font-bold group hover:bg-primary-color hover:text-white rounded-md cursor-pointer mt-5 mb-5 md:hidden border border-black dark:border-white">
            <span className="flex items-center justify-center gap-2 relative">
              <ThemeToggle />

            </span>
          </div>
            {!signUp &&
            <>
            <span className="text-3xl font-bold">Sign in to your account </span>
            <span className="flex w-full ">
              
              <p className="dark:text-gray-200 text-[14px]">Don&apos;t have an account? </p>
              <p
                className="ml-2 font-semibold underline text-primary-color cursor-pointer hover:text-primary-shade"
                onClick={handleSignUp}
              >
                Register
              </p>
            </span>
            </>}
            {signUp &&
            <>
            <span className="text-3xl font-bold">Create a new account </span>
            <span className="flex w-full items-center">
              
              <p className="dark:text-gray-200 text-[14px]">Have an account? </p>
              <p
                className="ml-2 font-semibold underline text-primary-color cursor-pointer hover:text-primary-shade"
                onClick={handleSignUp}
              >
                Login
              </p>
            </span>
            </>}
            
          </div>
          <div className=" flex flex-col items-center justify-center max-w-[400px] w-full md:p-0">
{/* 

  LOGIN AS DIFFERENT USER TYPE
*/}
        {!signUp && 
          <Login  />
      }
        {signUp && 
            <SignUp />
      }
       
          </div>
          
        </>
    )
}