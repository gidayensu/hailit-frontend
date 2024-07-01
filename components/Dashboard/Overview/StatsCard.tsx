import Container from "@/components/ui/container";
import Loader from "@/components/Shared/Loader";
import { IoTrendingDown, IoTrendingUp } from "react-icons/io5";

export default function StatsCard({
  title,
  subtitle,
  loading,
  mainCount,
  percentageDifference,
  currency,
  reversed
}: {
  title: string;
  subtitle: string;
  loading: boolean;
  mainCount: number;
  percentageDifference: number;
  reversed?: boolean
  currency?: boolean
}) {
    
    
    

  return (
    <Container className="flex flex-col gap-2 w-full lg:w-1/4 h-40 rounded-xl p-4 justify-between items-start ">
      <div className="flex justify-between">
        <div className="">
          <h3 className="font-bold text-md"> {title}</h3>
          <h3 className="text-[12px] text-slate-400 -mt-1">
            {subtitle}
          </h3>
        </div>
      </div>
      <div className="flex flex-col">
        {loading ? (
          <Loader color="primary" />
        ) : (
          <>
            <h2 className={`text-4xl font-bold `}>
            {mainCount}
            </h2>
            <div className={`flex gap-1 ${percentageDifference > 1 ? 'text-green-500' : 'text-red-500'}   w-full`}>
              <p className="md:text-[12px] text-[10px] font-medium">
              {reversed && percentageDifference >1 ? '-' : ''}{percentageDifference}% (last
                month)
              </p>
              {percentageDifference>1 ? <IoTrendingUp className="text-lg" />: <IoTrendingDown className="text-lg"/> }
              
            </div>
          </>
        )}
      </div>
    </Container>
  );
}