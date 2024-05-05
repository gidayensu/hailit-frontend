
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AccountAccess } from "@/components/common/account-access";
import { FcGoogle } from "react-icons/fc";
import { FaChevronDown } from "react-icons/fa6";
import OrderSummaryLessDetail from "@/components/order-components/order-summary-less-detail";
import { RiTimerFlashFill, RiTimer2Fill, RiCalendarScheduleFill } from "react-icons/ri";


import Image from "next/image";

type UserRole = 'vendor' | 'admin' | 'client' | 'dispatcher'
export default function Home() {
  const userRole:UserRole = 'vendor';
  return (
    <main className="flex flex-col items-center gap-3 justify-center bg-slate-50 dark:bg-[#121212] relative mb-20">
      {
        userRole==='vendor' && 
        <>
        
        
          <div className=" flex flex-col items-center w-full  p-2 z-10">
            <p className="flex items-center justify-center text-sm font-bold w-44 h-7 text-center">Pickup Location</p>
            <div className="w-full font-bold rounded-xl flex items-center justify-center gap-2">
              
                <div className="flex gap-2 items-center relative h-12 p-1 w-44 justify-center rounded-b-lg text-[14px]">
                <p>Kejetia Station</p>
                <FaChevronDown/>
                </div>
                
            </div>
          </div>
          
          <div className="flex flex-col w-full items-center justify-center  rounded-2xl gap-2">
            
  
              
            <Link href="/order/new">
            <div className="flex justify-start items-center gap-3 border border-slate-300 w-[340px] h-32  rounded-xl bg-white hover:bg-[#baffed] dark:border-slate-100 dark:border-opacity-20 dark:bg-[rgb(30,30,30)] dark:hover:border-[#baffed] dark:text-slate-100  cursor-pointer">
                    <Image
                      src='https://i.ibb.co/0rQk9tY/parcel-Image.png'
                      width={120}
                      height={120}
                      alt="parcel image"
                      />    
                    <span className="flex flex-col justify-center">
                      

                      
                        <p className="font-bold">
                            Send a Package
                        </p>
                        <p className="text-sm">
                            Secure, Fast, and Express
                        </p>
                    </span>
                    
               </div>
               </Link>
          </div>
          <div className="flex items-center justify-center gap-1 w-full">
              <div className="flex flex-col justify-center items-center gap-2 bg-white">
              <div className="flex flex-col items-center justify-center w-[113px] h-[90px] border rounded-lg p-3">
                <RiTimerFlashFill className="text-xl mb-2"/>
                <p className="font-bold text-[11px]">Deliver Today</p>
                <p className="text-[14px]">from <strong>GHS 30</strong></p>
                </div>
                
              </div>
              <div className="flex flex-col justify-center items-center gap-2 bg-white">
              <div className="flex flex-col items-center justify-center w-[113px] h-[90px] border rounded-lg p-3">
                <RiTimer2Fill className="text-xl mb-2"/>
                <p className="font-bold text-[11px]">Deliver Morro'</p>
                <p className="text-[14px]">from <strong>GHS 20</strong></p>
                </div>
                
              </div>
              <div className="flex flex-col justify-center items-center gap-2 bg-white">
              <div className="flex flex-col items-center justify-center w-[113px] h-[90px] border rounded-lg p-3">
                <RiCalendarScheduleFill className="text-xl mb-2"/>
                <p className="font-bold text-[11px]">Schedule</p>
                <p className="text-[14px]">from <strong>GHS 20</strong></p>
                </div>
                
              </div>
              
            </div>
          
          <div className="flex flex-col w-full p-5 rounded-2xl gap-2">
            <p className="font-bold"> Today</p>
          <OrderSummaryLessDetail deliveryStatus="Booked"/>
            <OrderSummaryLessDetail deliveryStatus="Picked up"/>
            <p className="font-bold mt-2"> Last Week</p>
            <OrderSummaryLessDetail deliveryStatus="Delivering"/>
            <p className="font-bold mt-2"> More than 30 days ago</p>
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
