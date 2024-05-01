"use client";

import Link from "next/link";
import { TbCurrentLocation } from "react-icons/tb";
import { MdOutlineLocationOn } from "react-icons/md";


import { Separator } from "@/components/ui/separator";


export default function OrderSummaryCard () {
    return(
    <Link href='/track/s' className="w-full">
        <div className="flex flex-col gap-3 bg-gradient-to-tl from-[#9da9ac25] from-1% via-white via-50% to-white border border-slate-300 h-56 rounded-2xl p-4">
        <div className="flex justify-between">
          <h3 className="font-bold text-2xl">#ASD-593</h3>
          <span className="flex justify-center items-center font-bold bg-slate-800 h-8 w-1/3 rounded-full text-white">
            <p>Picked up</p>
          </span>
        </div>

        <div className="flex flex-col items-start h-full gap-1">
          <span className="flex items-center  gap-2 -ml-2">
            <TbCurrentLocation className="text-xl" />
            <p>Adriganor High Street</p>
          </span>

          <Separator
            orientation="vertical"
            className="bg-slate-800 h-1/6"
          />
          <span className="flex items-center gap-2 -ml-3">
            <MdOutlineLocationOn className="text-2xl" />
            <p className="font-bold">Pickup Location</p>
          </span>
        </div>

        <div className="flex flex-col w-full  border-2 border-slate-300 text-slate-800 rounded-2xl text-[15px]">
          {/* <Separator  className="bg-slate-800 w-full opacity-65"/> */}
          <div className="flex justify-between items-center gap-1 p-2 h-12">
            <p className="ml-3">
              <strong>Type</strong>: Same day
            </p>

            <Separator orientation="vertical" className="bg-slate-800 h-full" />
            <p className="mr-3">
              <strong>Charge</strong>: GHS 50
            </p>
          </div>
        </div>
      </div>
      </Link>
    )
}