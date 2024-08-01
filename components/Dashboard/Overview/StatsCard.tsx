import Container from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";
import { IoTrendingDown, IoTrendingUp } from "react-icons/io5";
export default function StatsCard({
  title,
  subtitle,
  loading,
  mainCount,
  percentageDifference,
  
  reversed,
}: {
  title: string;
  subtitle?: string;
  loading: boolean;
  mainCount: number;
  percentageDifference: number;
  reversed?: boolean;
  
}) {
  return (
    <Container className="flex flex-col gap-2 w-full lg:w-1/4 h-32 rounded-xl p-4 justify-between items-start ">
      <div className="flex justify-between w-full">
        <div className="w-full">
          <span className="w-full flex justify-between items-center">
            <h3 className="font-bold text-md "> {title}</h3>
          </span>
          <h3 className="text-[12px] text-slate-400 -mt-1">
            {subtitle}
          </h3>
        </div>
      </div>
      <div className="flex flex-col">
        {loading ? (
          <div className="space-y-1">
            <Skeleton className="w-32 h-10" />
            <Skeleton className="w-24 h-4" />
          </div>
        ) : (
          <>
            <h2 className={`text-3xl font-bold `}>{mainCount}</h2>
            <div
              className={`flex gap-1 ${
                percentageDifference > 1 ? "text-green-500" : "text-red-500"
              }   w-full`}
            >
              <p className="md:text-[12px] text-[10px] font-medium">
                {reversed && percentageDifference > 1 ? "-" : ""}
                {reversed ?  percentageDifference: percentageDifference }% (last month)
              </p>
              {percentageDifference > 1 ? (
                <IoTrendingUp className="text-lg" />
              ) : (
                <IoTrendingDown className="text-lg" />
              )}
            </div>
          </>
        )}
      </div>
    </Container>
  );
}
