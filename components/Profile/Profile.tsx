"use client";

import { useProfile } from "@/components/Profile/hooks/useProfile";
import ProfilePageDetails from "@/components/Profile/OtherComponents/ProfilePageDetail";

export default function Profile() {
  const { authenticated, user_role } = useProfile();

  return (
      <main className="flex min-h-screen flex-col md:justify-center  items-center gap-10 mb-32">
        {authenticated && user_role === "Customer" && <ProfilePageDetails />}
      </main>
    
  );
}
