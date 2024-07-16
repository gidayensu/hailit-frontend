"use client";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";
import { MdArrowBack } from "react-icons/md";
import DashboardCard from "../../DashboardCard";
import DispatcherCard from "./DispatcherCard";
import EditDispatcher from "./EditDispatcher";
import { useDispatcherProfile } from "./hooks/useDispatcherProfile";
import SkeletonTable from "../../SkeletonTable";
import { useState } from "react";
import DispatcherTripsTable from "./DispatcherTripsTable";

//DispatcherDetails accepts userRole (rider/driver) to show details based on the userRole

export default function DispatcherDetails() {
  const [editDispatcher, setEditDispatcher] = useState<boolean>(false);

  const {
    dispatcherTrips,
    dispatcherError,
    selectedDispatcher,
    handleDeselect,
    
    dispatcherLoading,
    total_trip_count
  } = useDispatcherProfile();

  

  

  const handleEditDispatcher = () => {
    setEditDispatcher(() => !editDispatcher);
  };
  const handleGoBack = () => {
    if (editDispatcher) {
      handleEditDispatcher();
    } else {
      handleDeselect();
    }
  };

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
                  dispatcher={selectedDispatcher}
                  editDispatcher={handleEditDispatcher}
                />
              </div>

              <div className="w-full col-span-6 space-y-3">
                {total_trip_count > 0 && (
                  <section className="flex flex-col  md:flex-row gap-2 items-center md:justify-between">
                    <DashboardCard
                      number={dispatcherTrips?.total_earnings || 0}
                      title="Total Earnings"
                      subTitle="All deliveries made"
                    />
                    <div className="grid grid-cols-2 grid-rows-2 w-full md:flex   md:flex-row gap-2 items-center md:justify-between">
                      <DashboardCard
                        number={dispatcherTrips?.total_trip_count || 0}
                        title="Assigned Orders"
                        subTitle="All deliveries made"
                      />
                      <DashboardCard
                        number={dispatcherTrips?.delivered_trips || 0}
                        title="Delivered"
                        subTitle="Successful deliveries"
                      />
                      <DashboardCard
                        number={dispatcherTrips?.current_trips || 0}
                        title="Current"
                        subTitle="Pending deliveries"
                      />
                      <DashboardCard
                        number={dispatcherTrips?.cancelled_trips || 0}
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

                  <Container className="rounded-xl flex justify-center items-center">
                    <DispatcherTripsTable  />
                  </Container>
                </section>
              </div>
            </main>
          )}
        </>
      )}

      {editDispatcher && (
        <EditDispatcher
          dispatcher={selectedDispatcher}
          handleGoBack={handleGoBack}
        />
      )}
    </>
  );
}
