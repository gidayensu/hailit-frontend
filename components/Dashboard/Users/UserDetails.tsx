import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { MdArrowBack } from "react-icons/md";
import DashboardCard from "../DashboardCard";
import DashboardUserCard from "./DashboardUserCard";
import { useUserProfile } from "./hook/useUserProfile";
import UserTripsTable from "./UserTripsTable";
import { UserRole } from "@/lib/store/slice/userSlice";

export default  function UserDetails ({userRole}: {userRole?:UserRole}) {
const {userTrips, selectedUser, error, deleteError, handleTrackTrip, handleDeselect } = useUserProfile(userRole);
  const total_trip_count = userTrips?.total_trip_count
  const selectedUserId = selectedUser?.user_id
  
  const handleGoBack = ()=> {
    handleDeselect();
    
  }

    return (
        <>
        <Button onClick={handleGoBack} className="mb-4 w-16"><MdArrowBack /></Button>
      <main className="md:grid md:grid-cols-8 flex flex-col  gap-2 w-full">
        <div className="w-full col-span-2 flex flex-col gap-2">

          <DashboardUserCard selectedUser={selectedUser}/>
              </div>
              

        <div className="w-full col-span-6 space-y-3">
          {
            total_trip_count > 0 && 
          <section className="grid grid-cols-2 grid-rows-2 w-full md:flex   md:flex-row gap-2 items-center md:justify-between">
            <DashboardCard
              number={userTrips?.total_trip_count || 0  }
              title="Total Deliveries"
              subTitle="All deliveries made"
            />
            <DashboardCard
              number={userTrips?.delivered_trips || 0}
              title="Delivered"
              subTitle="Successful deliveries"
            />
            <DashboardCard
              number={userTrips?.current_trips || 0}
              title="Current"
              subTitle="Pending deliveries"
            />
            <DashboardCard
              number={userTrips?.cancelled_trips || 0}
              title="Cancelled"
              subTitle="Cancelled trips"
            />
          </section>
          }
          <section className="w-full flex flex-col gap-4">
            { total_trip_count > 0  && 

            <h2 className="font-bold text-md">
              {`All ${selectedUser?.first_name} ${selectedUser?.last_name} Trips` 
              }
              
              </h2>
            }

          <Container className="rounded-xl">
            <UserTripsTable />
          </Container>
          </section>
        </div>
      </main>
        </>
    );
}