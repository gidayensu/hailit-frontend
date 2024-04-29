import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { UserAvatar } from "@/components/common/user-avatar";
import { PiPackageThin } from "react-icons/pi";
import { CiDeliveryTruck } from "react-icons/ci";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { RiMessage3Line } from "react-icons/ri";
import { LuPhone } from "react-icons/lu";

export default function TrackDelivery() {
    const status = 'delivered'
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 ">
      <div className="flex flex-col items-start justify-center gap-2 w-full h-80 bg-slate-800  p-4 text-white ">
        <span className="text-5xl font-bold ">Package</span>
        <p className="text-3xl">#235-ASF5</p>
      </div>

      <div className="flex flex-col items-center gap-10 bg-white w-full -mt-20 rounded-tr-[50px]">
        <div className="flex text-sm w-[300px] items-center justify-center gap-2 mt-10">
          <div className="flex flex-col gap-2 w-full ">
            <p>Pickup</p>
            <div className="flex items-center gap-3">
              <Progress
                value={100}
                className="w-16 h-2 border border-slate-800"
              />
              <div className="bg-slate-800 h-8 w-8 rounded-full flex items-center justify-center">
                <PiPackageThin className="text-[20px] text-slate-50" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full animate-pulse">
            <p>Delivering</p>
            <div className="flex items-center gap-3">
              <Progress
                value={0}
                className="w-16 h-2 border border-slate-800"
              />
              <div className="border border-slate-800 h-8 w-8 rounded-full flex items-center justify-center">
                <CiDeliveryTruck className="text-[20px] text-slate-800 " />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full animate-pulse">
            <p>Delivered</p>
            <div className="flex items-center gap-3">
              <Progress
                value={0}
                className="w-16 h-2 border border-slate-800"
              />
              <div className="border border-slate-800 h-8 w-8 rounded-full flex items-center justify-center">
                <IoCheckmarkDoneSharp className="text-[20px] text-slate-800" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
        <h3 className="font-bold">Courier Details</h3>
        <div className="w-[330px] rounded-xl border-2 border-slate-300 h-24 dark:border-none dark:bg-[#2c2c29] p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span>
              <UserAvatar />
            </span>

            <span>
              <p className="font-bold text-sm">Samson Ayeni</p>
              <p className="font-bold text-[10px]">Your Courier</p>
            </span>
          </div>
          <div className="flex justify-center items-center gap-2">
            <span className=" bg-slate-800 h-8 w-8 rounded-full flex items-center justify-center">
              <RiMessage3Line className="text-[20px] text-slate-50" />
            </span>
            <span className=" bg-slate-800 h-8 w-8 rounded-full flex items-center justify-center">
              <LuPhone className="text-[20px] text-slate-50" />
            </span>
          </div>
        </div>
        </div>
        <div className="flex flex-col gap-2">
            <h3 className="font-bold">Trip Details</h3>
        <div className=" flex flex-col items-center justify-center w-[330px] rounded-xl border-2 border-slate-300 h-auto dark:border-none dark:bg-[#2c2c29] p-4 gap-2">
        <div className={`grid grid-cols-10 w-[300px] text-sm items-center justify-center ${status === 'delivered' ? 'bg-green-800' : status==='failed' ? 'bg-red-800': 'bg-slate-800'} h-12 text-slate-50 rounded-xl`}>
            <p className="ml-2 font-bold col-span-3 ">Status </p>
            <span className="flex justify-center items-center col-span-4 ">
              <Separator className="bg-slate-50 w-16 col-span-4 " />
            </span>
            <p className="col-span-3">{status}</p>
          </div>
        <div className="grid grid-cols-10 w-[300px] text-sm items-center justify-center">
            <p className="ml-2 font-bold col-span-3">Type </p>
            <span className="flex justify-center items-center col-span-4 ">
              <Separator className="bg-slate-800 w-16 col-span-4 " />
            </span>
            <p className="col-span-3">Same day</p>
          </div>
          <div className="grid grid-cols-10 w-[300px] text-sm">
            <p className="ml-2 font-bold col-span-3 ">Start Date </p>
            <span className="flex justify-center items-center col-span-4 ">
              <Separator className="bg-slate-800 w-16 col-span-4 " />
            </span>
            <p className="col-span-3 ">04/04/2024</p>
          </div>
          <div className="grid grid-cols-10 w-[300px] text-sm">
            <p className="ml-2 font-bold col-span-3 ">End Date </p>
            <span className="flex justify-center items-center col-span-4 ">
              <Separator className="bg-slate-800 w-16 col-span-4 " />
            </span>
            <p className="col-span-3 ">04/04/2024</p>
          </div>
          
          <div className="grid grid-cols-10 w-[300px] text-sm items-center justify-center">
            <p className="ml-2 font-bold col-span-3 ">Pickup  </p>
            <span className="flex justify-center items-center col-span-4 ">
              <Separator className="bg-slate-800 w-16 col-span-4 " />
            </span>
            <p className="col-span-3">Manso Atwr3de</p>
          </div>
          <div className="grid grid-cols-10 w-[300px] text-sm items-center justify-center">
            <p className="ml-2 font-bold col-span-3 ">Type </p>
            <span className="flex justify-center items-center col-span-4 ">
              <Separator className="bg-slate-800 w-16 col-span-4 " />
            </span>
            <p className="col-span-3">Same day</p>
          </div>
          <div className="grid grid-cols-10 w-[300px] text-sm items-center justify-center">
            <p className="ml-2 font-bold col-span-3 ">Destination </p>
            <span className="flex justify-center items-center col-span-4 ">
              <Separator className="bg-slate-800 w-16 col-span-4 " />
            </span>
            <p className="col-span-3">Ajriganor </p>
          </div>
        </div>
        </div>
      </div>
    </main>
  );
}
