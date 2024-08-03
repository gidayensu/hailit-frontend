"use client";
//next, redux, react, and supabase
import { useAuthControl } from "./hooks/useAuthControl";
//main components
import Authentication from "@/components/Profile/Authentication/Authentication";

export default function AuthControl() {
  const {authenticated,  sessionActive} = useAuthControl();
  
  return (
      <main className="flex min-h-screen flex-col md:justify-center  items-center gap-10 mb-32">
        {(!authenticated || !sessionActive) && <Authentication />}
      </main>
    
  );
}
