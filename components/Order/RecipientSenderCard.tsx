import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "../ui/button";
import Container from "../ui/container";

export default function RecipientSenderCard({
  location,
  identity,
  phoneNumber,
}: {
  location: string;
  identity: "Sender" | "Recipient";
  phoneNumber: string;
}) {
  return (
    <Container className="w-full rounded-xl border   max-h-32  p-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>
          <p className="font-semibold text-sm w-34 ">{location}</p>
        </span>
      </div>
      <div className="flex justify-center items-center gap-2">
      <Link href={ `tel:${phoneNumber}`} className="w-full">
        <Button className=" bg-primary-medium h-8 w-32 rounded-md flex items-center justify-center text-slate-50 dark:text-secondary-dark text-[12px]">
          <p className=" "> Call {identity} </p>
        </Button>
        </Link>
        
        
        <Link href={`https://wa.me/${phoneNumber}`} className="w-full">
        <div className=" bg-primary-medium dark:bg-slate-50 h-8 w-8 rounded-md flex items-center justify-center text-[16px] text-slate-50 dark:text-secondary-dark cursor-pointer">
          <FaWhatsapp />
        </div>
        </Link>
      </div>
    </Container>
  );
}
