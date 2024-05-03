
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AccountAccess } from "@/components/common/account-access";
import { FcGoogle } from "react-icons/fc";
import { FaChevronDown } from "react-icons/fa6";
import OrderSummaryLessDetail from "@/components/order-components/order-summary-less-detail";

type UserRole = 'vendor' | 'admin' | 'client' | 'dispatcher'
export default function Home() {
  const userRole:UserRole = 'vendor';
  return (
    <main className="flex flex-col items-center gap-3 justify-center bg-slate-50 min-h-screen -mt-20">
      {
        userRole==='vendor' && 
        <>
          <div className="flex flex-col gap-2 items-center justify-center w-full p-10">
            <p className="text-sm">Pickup Location</p>
            <div className="h-8 w-full font-bold rounded-xl flex items-center justify-center gap-2">
                <div className="flex gap-2 items-center relative">
                <p>Atimatim Dwenase</p>
                <FaChevronDown/>
                </div>
                
            </div>
          </div>
          <div className="flex flex-col w-full p-10  gap-2">
          <OrderSummaryLessDetail deliveryStatus="Booked"/>
            <OrderSummaryLessDetail deliveryStatus="Picked up"/>
            <OrderSummaryLessDetail deliveryStatus="Delivering"/>
          </div>
        </>
      }

      {userRole!== 'vendor' &&
      <>
      <div className="flex flex-col items-center justify-center gap-2" >
        <span className="text-7xl font-bold">Hello!</span>
        <p className="text-3xl">Welcome to HailIt</p>
        <p className="text-center mt-8">
          Request for affordable <br/> but fast deliveries in Accra
        </p>
      </div>
      <div>
        
      </div>
      <div className="mt-16 flex flex-col gap-5">
      <Button variant='outline' className="border border-slate-300 h-14 w-60 flex gap-4"> <FcGoogle className="text-2xl"/> Continue with Google</Button>
      <Link href="/order"><Button variant='outline' className="border border-slate-300 h-14 w-60 flex gap-4">  Continue as Guest</Button></Link>
      
      

      <AccountAccess/>
      </div>
      </>}
      </main>
  );
}
