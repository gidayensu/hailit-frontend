import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useDashboardTripUpdate } from "./StatusSection/hooks/useDashboardTripUpdate";
import { useGetTrip } from "./StatusSection/hooks/useGetTrip";

export default function PaymentSection() {
  const {handleTripUpdate} = useDashboardTripUpdate();
  const {trip, } = useGetTrip()
  
  const discount = 0;
  const serviceFee = 0;

  return (
    <>
      <div className="flex justify-between">
        <div className="">
          <h3 className="font-bold">PAYMENT</h3>
          <h3 className="text-[12px] text-slate-400 -mt-1">Details</h3>
        </div>
        <Button
              variant={"empty"}
              className="space-x-1 bg-primary-color hover:bg-primary-medium text-white  hover:dark:bg-slate-100 dark:text-secondary-dark dark:bg-white"
              onClick={()=>handleTripUpdate('1', {payment_status: !trip?.payment_status})}
            >
              
              <p>{!trip?.payment_status ? 'Mark as Paid' : 'Mark as Unpaid'}</p>
            </Button>
      </div>
      <div className="w-full flex flex-col items-start justify-between h-3/5 rounded-md bg-[#f7f7f7] dark:bg-secondary-dark p-3">
        <div className="flex w-full items-start justify-between text-sm">
          <div className="spacey-y-2">
            <ul>Bill amount</ul>
            <ul>Discount(0%)</ul>
            <ul>Service Fee</ul>
          </div>
          <div className="spacey-y-2 text-right font-semibold">
            <ul>{trip?.trip_cost}</ul>
            <ul>{discount}</ul>
            <ul>{serviceFee}</ul>
          </div>
        </div>

        <Separator className="dark:bg-slate-50" />
        <div className="flex w-full items-start justify-between text-sm font-bold mt-1">
          <p>Total</p>
          <p>{(parseFloat(trip?.trip_cost) + serviceFee + discount).toFixed(2)}</p>
        </div>
      </div>
      <div className=" flex justify-between text-sm px-1 font-semibold">
        <p>Payment status</p>
        <p className={`${trip?.payment_status ? "text-green-500" : "text-red-500"}`}>
          {trip?.payment_status ? "Paid" : "Not Paid"}
        </p>
      </div>
    </>
  );
}
