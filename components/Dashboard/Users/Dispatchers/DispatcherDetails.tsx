"use client";
import Container from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardCard from "../../DashboardCard";
import SkeletonTable from "../../SkeletonTable";
import DispatcherCard from "./DispatcherCard";
import DispatcherTripsTable from "./DispatcherTripsTable";
import EditDispatcher from "./EditDispatcher";
import { useDispatcherProfile } from "./hooks/useDispatcherProfile";

//DispatcherDetails accepts userRole (rider/driver) to show details based on the userRole

export default function DispatcherDetails() {
  
  const {
    dispatcherTrips,
    dispatcherError,
    selectedDispatcher,
    editDispatcher,
    dispatcherLoading,
    total_trip_count,
    handleEditDispatcher
  } = useDispatcherProfile();
  
  

  return (
    <>
      
      {dispatcherError && (
        <div>
          <p>Error Occurred</p>
        </div>
      )}
      {!dispatcherError && (
        <>
          {dispatcherLoading && (
            <div className="flex gap-2 w-full flex-col md:flex-row">
            <Container className="flex  gap-2 max-h-96 w-full rounded-xl flex-col items-center justify-start p-5">
            
            
                <Skeleton className="w-32 rounded-full h-32 mt-2"/>
                <Skeleton className="w-32 rounded-full h-6"/>
                <Skeleton className="w-32 rounded-full h-6"/>
            </Container>
            <Container className="flex gap-2 max-h-96 w-full rounded-xl flex-col items-center justify-start p-5">

            <SkeletonTable rows={4} cells={5} />
            </Container>
            </div>
            
          )}

          {!dispatcherLoading && !editDispatcher && (
            <main className="md:grid md:grid-cols-8 flex flex-col  gap-2 w-full">
              <div className="w-full col-span-2 flex flex-col gap-2">
                <DispatcherCard
                  handleEditDispatcher={handleEditDispatcher}
                />
              </div>

              <div className="w-full col-span-6 space-y-3">
                {total_trip_count > 0 && (
                  <section className="flex flex-col  md:flex-row gap-2 items-center md:justify-between">
                    <DashboardCard
                      totalNumber={dispatcherTrips?.total_earnings || 0}
                      title="Total Earnings"
                      subTitle="All deliveries made"
                    />
                    <div className="grid grid-cols-2 grid-rows-2 w-full md:flex   md:flex-row gap-2 items-center md:justify-between">
                      <DashboardCard
                        totalNumber={dispatcherTrips?.total_trip_count || 0}
                        title="All Orders"
                        subTitle="All deliveries made"
                      />
                      <DashboardCard
                        totalNumber={dispatcherTrips?.delivered_trips || 0}
                        title="Delivered"
                        subTitle="Successful orders"
                      />
                      <DashboardCard
                        totalNumber={dispatcherTrips?.current_trips || 0}
                        title="Current"
                        subTitle="Pending deliveries"
                      />
                      <DashboardCard
                        totalNumber={dispatcherTrips?.cancelled_trips || 0}
                        title="Cancelled"
                        subTitle="Cancelled trips"
                      />
                    </div>
                  </section>
                )}
                <section className="w-full flex flex-col gap-4">
                  {total_trip_count > 0 && (
                    <h2 className="font-bold text-md">
                      {`All ${selectedDispatcher?.first_name} ${selectedDispatcher?.last_name} Trips`}
                    </h2>
                  )}

                    <DispatcherTripsTable  />
                  
                </section>
              </div>
            </main>
          )}
        </>
      )}

      {editDispatcher && (
        <EditDispatcher cancelEdit = {handleEditDispatcher} />
      )}
    </>
  );
}
