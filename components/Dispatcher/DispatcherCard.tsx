import Container from "../ui/container";
import { LuPhone } from "react-icons/lu";
import { UserAvatar } from "@/components/Shared/user-avatar";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
export default function DispatcherCard({firstName, lastName, vehicleName, vehicleNumber, phoneNumber}: {firstName: string, lastName: string, vehicleName: string, vehicleNumber:string, phoneNumber: string}) {
  if (!vehicleNumber || !firstName) {
    return (
      <Container className="w-full rounded-xl border  h-24  p-4 flex justify-between items-center">
      <div className="flex items-center gap-2">

        <span>
          <p className="font-bold text-sm">Courier will be assigned soon</p>
          
        </span>
      </div>
      
    </Container>  
    )
  }
  return (
    <Container className="w-full rounded-xl border  h-24  p-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>
          <UserAvatar />
        </span>

        <span>
          <p className="font-bold text-sm">{`${firstName} ${lastName}`}</p>
          <p className="font-bold text-[12px]">
            {vehicleName} <br /> {vehicleNumber}</p>
        </span>
      </div>
      <div className="flex justify-center items-center gap-2">
      <Link href={`https://wa.me/${phoneNumber}`} className="w-full">
      
        <span className=" bg-primary-color h-10 w-10 rounded-full flex items-center justify-center">
          <FaWhatsapp className="text-[20px] text-slate-50" />
        </span>
      </Link>
      <Link href={`tel:${phoneNumber}`} className="w-full">
      
        <span className=" bg-primary-color h-10 w-10 rounded-full flex items-center justify-center">
          <LuPhone className="text-[20px] text-slate-50" />
        </span>
      </Link>
      </div>

    </Container>
  );
}
