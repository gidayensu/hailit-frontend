"use client";
import { redirect } from "next/navigation";
import ProfilePageDetails from "@/components/Profile/OtherComponents/ProfilePageDetail";
import { useGetDispatcher } from "@/components/Dispatcher/hook/useGetDispatcher";
export default function DispatcherProfile() {
  const {user_role} = useGetDispatcher();
  user_role === "customer" || user_role === "admin" ? redirect('/profile') : ''
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 mb-32">
      <ProfilePageDetails />
    </main>
  );
}
