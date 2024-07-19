"use client";
import { useGetDispatcher } from "@/components/Dispatcher/hook/useGetDispatcher";
import ProfilePageDetails from "@/components/Profile/OtherComponents/ProfilePageDetail";

import { redirect } from "next/navigation";
export default function DispatcherProfile() {
  const { user_role } = useGetDispatcher();
  user_role === "Customer" || user_role === "Admin"
    ? redirect("/authentication")
    : "";
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 mb-32">
      <ProfilePageDetails />
    </main>
  );
}
