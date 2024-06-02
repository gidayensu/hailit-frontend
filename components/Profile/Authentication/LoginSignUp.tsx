'use client'
//ui + icons
import { Tabs,  TabsList, TabsTrigger } from "@/components/ui/tabs";


//main components
import Login from "./Login";
import SignUp from "./SignUp";


export default function LoginSignUp() {
  
  
  return (
    <Tabs defaultValue="login" className="w-80 sm:w-[400px] mt-0 sm:mt-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      {/* LOGIN TAB */}
          <Login/>
          {/* SIGN UP TAB */}
          
            <SignUp/>
      </Tabs>
  );
}
