
import NoData from "@/components/Shared/NoData";
import Link from "next/link";
import { Button } from "@/components/ui/button";


export default function  NoOrderHistory  ({ noDeliveryMessage, isDispatcher }: { noDeliveryMessage: string, isDispatcher?: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center w-full md:w-3/6">
      <NoData noDataText={noDeliveryMessage} textClassName="font-semibold text-md mb-4" />
      {
        !isDispatcher &&
      <Link href="/order">
        <Button variant="outline">Send a Package</Button>
      </Link>
      }
    </div>
  );  
} 