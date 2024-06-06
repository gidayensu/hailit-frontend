import OrderSummary from "@/components/Order/OrderSummary";
export default function PackageSection ({trip}: {trip:any}) {
    
    return (
      <div className="flex flex-col  w-full   h-52 rounded-lg  gap-2 ">
        <h3 className="font-bold">Package</h3>
        <h3 className="text-[12px] text-slate-400 -mt-3">Details</h3>
        <div className=" w-full  items-center gap-1.5">
          <OrderSummary trip={trip} />
        </div>
      </div>
    );
}