import OrderSummary from "@/components/Order/OrderSummary";
import { useGetTrip } from "./StatusSection/hook/useGetTrip";
import Loader from "@/components/Shared/Loader";
export default function PackageSection () {
    const {trip, isLoading} = useGetTrip();
    return (
      <div className="flex flex-col  w-full   h-52 rounded-lg  gap-2 ">
        <h3 className="font-bold">PACKAGE</h3>
        <h3 className="text-[12px] text-slate-400 -mt-3">Details</h3>
        {isLoading &&
          <div className=" w-full  items-center gap-1.5">
          <Loader color="text-primary-color"/>
          </div>  
        }
        <div className=" w-full   items-center gap-1.5">
          <OrderSummary trip={trip} />
        </div>
      </div>
    );
}