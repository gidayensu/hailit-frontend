"use client";
//next, redux, react, and supabase
import { useAppSelector } from "@/lib/store/hooks";
import { supabaseSession } from "@/lib/supabaseAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

//main components
import BigLoader from "@/components/Shared/BigLoader";

export const useAuthControl = () => {
  const router = useRouter();
  
  const { authenticated } = useAppSelector((state) => state.auth);
  const { onboard, user_role } = useAppSelector((state) => state.user);
  const [sessionActive, setSessionActive] = useState<boolean>(false);

  useEffect(() => {
    const checkSession = async () => {
      const session = await supabaseSession();

      if (authenticated && session) {
        setSessionActive(true);
        if (!onboard) {
          router.push("/onboarding");
        } else if (user_role === "Admin") {
          router.push("/dashboard");
        } else if (user_role === "Driver" || user_role === "Rider") {
          router.push("/dispatcher");
        }
        return (
          <div className="flex items-center justify-center w-full">
            <BigLoader />
          </div>
        );
      }
    };

    checkSession();
  }, [authenticated, onboard, user_role, router]);

return {authenticated, onboard, user_role, sessionActive}
}
