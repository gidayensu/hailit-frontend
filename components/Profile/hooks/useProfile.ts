"use client";
//next, redux, react, and supabase
import { useAppSelector } from "@/lib/store/hooks";
import { supabaseSession } from "@/lib/supabaseAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export const useProfile = () => {
  const router = useRouter();
  
  const { authenticated } = useAppSelector((state) => state.auth);
  const { onboard, user_role } = useAppSelector((state) => state.user);

  useEffect(() => {
    const checkSession = async () => {
      const session = await supabaseSession();

      if (!authenticated || !session) {
        router.push("/authentication");
      }

      if (authenticated && session) {
        if (!onboard) {
          router.push("/onboarding");
        } else if (user_role === "Admin") {
          router.push("/dashboard");
        } else if (user_role === "Driver" || user_role === "Rider") {
          router.push("/dispatcher");
        }
      }
    };

    checkSession();
  }, [authenticated, onboard, user_role, router]);

  return {authenticated, user_role};
}
