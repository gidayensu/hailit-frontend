import Container from "../ui/container";
import { LuPhone } from "react-icons/lu";
import { UserAvatar } from "@/components/Shared/user-avatar";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link"; 
import { useTrackOrderItem } from "../Order/TrackOrder/hooks/useTrackOrderItem";

export default function OrderDispatcherCard() {

  const { dispatcher } = useTrackOrderItem();
  
  if (!dispatcher?.vehicle?.vehicle_name || !dispatcher?.first_name) {
    return (
      <Container className="w-full rounded-xl border  h-24  p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span>
            <p className="font-bold text-sm">Courier will be assigned soon</p>
          </span>
        </div>
      </Container>
    );
  }
  return (
    <Container className="w-full rounded-xl border  h-24  p-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>
          <UserAvatar />
        </span>

        <span>
          <p className="font-bold text-sm">{`${dispatcher?.first_name} ${dispatcher?.last_name}`}</p>
          <p className="font-bold text-[12px]">
            {dispatcher?.vehicle?.vehicle_name} <br /> {dispatcher?.vehicle?.plate_number}
          </p>
        </span>
      </div>
      <div className="flex justify-center items-center gap-2">
        <Link href={`https://wa.me/${dispatcher?.phone_number}`} className="w-full">
          <span className=" bg-primary-color h-10 w-10 rounded-full flex items-center justify-center">
            <FaWhatsapp className="text-[20px] text-slate-50" />
          </span>
        </Link>
        <Link href={`tel:${dispatcher?.phone_number}`} className="w-full">
          <span className=" bg-primary-color h-10 w-10 rounded-full flex items-center justify-center">
            <LuPhone className="text-[20px] text-slate-50" />
          </span>
        </Link>
      </div>
    </Container>
  );
}
