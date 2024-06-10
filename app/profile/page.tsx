"use client";
//next, redux, react, and supabase

import { useAppSelector } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
//main components
import Authentication from "@/components/Profile/Authentication/Authentication";
import ProfilePageDetails from "@/components/Profile/OtherComponents/ProfilePageDetail";
import { supabaseSession, supabase } from "@/lib/supabaseAuth";
import { access } from "fs";
export type CurrentTheme = string | undefined;

export default function Profile() {
  const router = useRouter();
  //getting data from redux store
  const { authenticationState } = useAppSelector((state) => state.auth);
  const { onboard, user_role } = useAppSelector((state) => state.user);

  // useEffect(()=> {

  //   const  handleSignInWithGoogle = async (provider_token:string)=> {
    
    
  //     const { data, error } = await supabase.auth.signInWithIdToken({
  //       provider: 'google',
  //       token: provider_token,
  //     })
  //     console.log({data})
    
  // }
  //   const checkSession = async () => {
  //     const user = await supabaseSession();
      
  //     console.log({user})
        
        
        
        
  //       return ''
        
  //   };

  //   checkSession();
  
    
  // }, [])


  if (authenticationState) {
    !onboard ? router.push("/onboarding") : user_role === "admin" ? router.push("/dashboard") : ''
  }



  return (
    <>
      <main className="flex min-h-screen flex-col items-center gap-10 mb-32">
        {!authenticationState && <Authentication />}
        {authenticationState && (
          
            <ProfilePageDetails />
          
        )}
      </main>
    </>
  );
}
