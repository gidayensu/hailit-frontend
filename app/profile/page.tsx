"use client";
//next, redux, react, and supabase
import { useEffect } from "react";
import { useAppSelector } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
//main components
import Authentication from "@/components/Profile/Authentication/Authentication";
import ProfilePageDetails from "@/components/Profile/OtherComponents/ProfilePageDetail";
export type CurrentTheme = string | undefined;

export default function Profile() {
  const router = useRouter();
  //getting data from redux store
  const { authenticationState } = useAppSelector((state) => state.auth);
  const { onboard, user_role } = useAppSelector((state) => state.user);


  useEffect(() => {
    if (authenticationState) {
      if (!onboard) {
        router.push("/onboarding");
      } else if (user_role === "admin") {
        router.push("/dashboard");
      } else if (user_role === "driver" || user_role === "rider") {
        router.push('/dispatcher');
      }
    }
  }, [authenticationState, onboard, user_role, router]);


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
