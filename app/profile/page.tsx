"use client";
//next, redux, react, and supabase
import { useEffect } from "react";
import { useAppSelector } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
import { supabaseSession } from "@/lib/supabaseAuth";
//main components
import Authentication from "@/components/Profile/Authentication/Authentication";
import ProfilePageDetails from "@/components/Profile/OtherComponents/ProfilePageDetail";


export default function Profile() {
  const router = useRouter();
  //getting data from redux store
  const { authenticated } = useAppSelector((state) => state.auth);
  const { onboard, user_role } = useAppSelector((state) => state.user);


  useEffect(() => {
    
    const checkSession = async () => {
      const session = await supabaseSession();

      if(!authenticated || !session) {
        router.push('/authentication')
      }
    
      if (authenticated && session) {
        if (!onboard) {
          router.push("/onboarding");
        } else if (user_role === "Admin") {
          router.push("/dashboard");
        } else if (user_role === "Driver" || user_role === "Rider") {
          router.push('/dispatcher');
        }
      }
      
    };
    
    checkSession();

  }, [authenticated, onboard, user_role, router]);


  return (
    <>
      <main className="flex min-h-screen flex-col md:justify-center  items-center gap-10 mb-32">
        
        {authenticated && user_role === "Customer" && (
          
            <ProfilePageDetails />
          
        )}
      </main>
    </>
  );
}
