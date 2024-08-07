'use client'
import SmallScreenTopNav from "@/components/Nav/SmallScreenTopNav";
import { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";

export default function Authentication () {
  const [signUp, setSignUp]  = useState<boolean>(false);
  
  

  const handleSignUp = ()=> {
    setSignUp(()=>!signUp)
  }
  
    
    return (
        <>

          <SmallScreenTopNav/>
          <div className="flex flex-col items-center justify-center gap-2 md:mt-10">
            
            {!signUp &&
            <>
            <span className="text-3xl font-bold">Log in to your account </span>
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
          <div className=" flex flex-col items-center justify-center max-w-[400px] w-5/6 md:p-0">
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