'use client'
import DispatcherDetail from "@/components/Dispatcher/DispatcherDetail"
import { redirect } from "next/navigation";


import { useGetDispatcher } from "@/components/Dispatcher/hook/useGetDispatcher";
export default function Dispatcher () {
    const {user_role} = useGetDispatcher();
    if (user_role === "customer" || user_role === "admin" || !user_role) {
        redirect('/profile') 
    }
    return (
        <main className="flex flex-col gap-3 p-4 items-center w-full justify-center">
            <DispatcherDetail/>
        </main>
    )
}