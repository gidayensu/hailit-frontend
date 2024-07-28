"use client";
import DashboardCard from "../DashboardCard";
import DashboardUserCard from "./DashboardUserCard";
import EditUser from "./EditUser";
import { useUserProfile } from "./hooks/useUserProfile";
import NonDispatcherTripsTable from "./NonDispatcherTripsTable";



export default function UserDetails() {
  
  const { userTrips, selectedUser, editUser } = useUserProfile();
  const total_trip_count = userTrips?.total_trip_count;


  return (
    <>
      {!editUser && (
        <>
          <main className="md:grid md:grid-cols-8 flex flex-col  gap-2 w-full">
            <div className="w-full col-span-2 flex flex-col gap-2">
              <DashboardUserCard                
              />
            </div>

            <div className="w-full col-span-6 space-y-3">
              {total_trip_count > 0 && (
                <section className="grid grid-cols-2 grid-rows-2 w-full md:flex   md:flex-row gap-2 items-center md:justify-between">
                  <DashboardCard
                    totalNumber={userTrips?.total_trip_count || 0}
                    title="Orders"
                    subTitle="All deliveries made"
                  />
                  <DashboardCard
                    totalNumber={userTrips?.delivered_trips || 0}
                    title="Delivered"
                    subTitle="Successful orders"
                  />
                  <DashboardCard
                    totalNumber={userTrips?.current_trips || 0}
                    title="Current"
                    subTitle="Pending deliveries"
                  />
                  <DashboardCard
                    totalNumber={userTrips?.cancelled_trips || 0}
                    title="Cancelled"
                    subTitle="Cancelled trips"
                  />
                </section>
              )}
              <section className="w-full flex flex-col gap-4">
                {total_trip_count > 0 && (
                  <h2 className="font-bold text-md">
                    {`All ${selectedUser?.first_name} ${selectedUser?.last_name} Trips`}
                  </h2>
                )}

                  <NonDispatcherTripsTable />
                
              </section>
            </div>
          </main>
        </>
      )}

      {editUser && (
        <EditUser />
      )}
    </>
  );
}
