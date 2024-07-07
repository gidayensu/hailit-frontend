"use client";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { MdArrowBack } from "react-icons/md";
import DashboardCard from "../../DashboardCard";

import DispatcherCard from "./DispatcherCard";
import EditDispatcher from "./EditDispatcher";
import { useDispatcherProfile } from "./hooks/useDispatcherProfile";

import Loader from "@/components/Shared/Loader";
import { useState } from "react";
import DispatcherTripsTable from "./DispatcherTripsTable";

//DispatcherDetails accepts userRole (rider/driver) to show details based on the userRole

export default function DispatcherDetails({
  userRole,
}: {
  userRole: "Driver" | "Rider";
}) {
  const [editDispatcher, setEditDispatcher] = useState<boolean>(false);

  const {
    dispatcherTrips,
    error,
    dispatcherError,
    selectedDispatcher,
    handleDeselect,
    handleDeleteDispatcher,
    dispatcherLoading,
  } = useDispatcherProfile(userRole);

  

  const total_trip_count = dispatcherTrips?.total_trip_count;

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
      <Button variant={"outline"} onClick={handleGoBack} className="mb-4 w-16">
        <MdArrowBack />
      </Button>
      {!editDispatcher && dispatcherError && (
        <div>
          <p>Error Occurred</p>
        </div>
      )}
      {!editDispatcher && !dispatcherError && (
        <>
          {dispatcherLoading && (
            <div className="w-full h-full items-center justify-center">
              <Loader color="text-primary-color" />
            </div>
          )}

          {!dispatcherLoading && (
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
                    <DispatcherTripsTable userRole={userRole} />
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
