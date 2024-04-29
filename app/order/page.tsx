import { MdDeliveryDining } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { AiOutlineSchedule } from "react-icons/ai";
import Link from "next/link";


export default function Order () {

    return (
        <main className="flex min-h-screen flex-col items-center gap-10 ">
        <div className="flex flex-col items-start justify-center gap-2 w-full h-80 bg-slate-800  p-4 text-white ">
        <span className="text-5xl font-bold ">Hello!</span>
        <p className="text-3xl">Special Customer</p>
        
      </div>
           
           <div className="flex flex-col justify-center items-center gap-6 bg-white w-full -mt-20 rounded-tr-[50px]">
            <div className="flex gap-6">
               <Link href='/order/new'>
               <div className="flex flex-col justify-center items-center border border-slate-300 w-40 h-32 mt-10 rounded-xl bg-[#f7e7a1] hover:bg-[#f7e490] cursor-pointer">
                    <span className="text-4xl">
                        <MdDeliveryDining/>
                    </span>
                    <span className="text-center">
                        <p className="font-bold">
                            Same-day 
                        </p>
                        <p>
                            Within 24 hours
                        </p>
                    </span>
               </div>
               </Link>
               <Link href="/order/new">
               <div className="flex flex-col justify-center items-center border border-slate-300 w-40 h-32 mt-10 rounded-xl bg-blue-100 hover:bg-[#c6deff] cursor-pointer">
                    <span className="text-4xl">
                        <TbTruckDelivery/>
                    </span>
                    <span className="text-center">
                        <p className="font-bold">
                            Tomorrow
                        </p>
                        <p>
                            Within 48 hours
                        </p>
                    </span>
               </div>
               </Link>
            </div>
            <Link href="/order/custom-order">
            <div className="flex flex-col justify-center items-center border border-slate-300 w-[340px] h-32  rounded-xl bg-teal-100 hover:bg-[#baffed]">
                    <span className="text-4xl">
                        <AiOutlineSchedule/>
                    </span>
                    <span className="text-center">
                        <p className="font-bold">
                            Custom Order
                        </p>
                        <p>
                            Schedule delivery for later
                        </p>
                    </span>
               </div>
               </Link>
            </div> 
        </main>
    )
}