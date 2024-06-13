import { Modal } from "@/components/Shared/Modal";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { MdArrowBack } from "react-icons/md";
import { RiMapPinLine } from "react-icons/ri";
import DashboardCard from "../DashboardCard";
import DeleteModalCard from "../TrackOrder/DeleteModalCard";
import { useUserProfile } from "./hook/useUserProfile";
import UserTripsTable from "./UserTripsTable";

export default  function UserDetails ({showUser}: {showUser:  (show:boolean)=>void}) {
const {userTrips, selectedUser, handleDeleteTrip, error, deleteError, handleTrackTrip } = useUserProfile();
const selectedUserId = selectedUser?.user_id
console.log(selectedUserId)
    return (
        <>
        <Button onClick={()=>showUser(false)} className="mb-4 w-16"><MdArrowBack /></Button>
      <main className="md:grid md:grid-cols-8 flex flex-col  gap-2 w-full">
        <div className="w-full col-span-2 flex flex-col gap-2">

        <Container className="flex gap-2 h-96 w-full rounded-xl flex-col items-center justify-start">
          <div className=" flex font-bold text-xl items-center justify-center text-white dark:text-secondary-dark rounded-full h-24 w-24 bg-primary-color dark:bg-white mt-4">
            <p>
              {selectedUser?.first_name[0]}
              {selectedUser?.last_name[0]}
            </p>
          </div>
          <div
            className={`w-1/3 rounded-xl ${
              selectedUser?.onboard
                ? "bg-green-200 border border-green-500 text-green-700"
                : "bg-red-200 border-red-500 text-red-600"
            } h-6 flex items-center justify-center text-[13px]`}
          > {
            selectedUser?.onboard ?
                    <p>Onboard</p> : <p>Not onboard</p>
          }
          </div>
          <div className="flex flex-col items-center justify-center gap-2 w-full">
            <p className="font-semibold">
              {selectedUser?.first_name} {selectedUser?.last_name}
            </p>
            <div className="flex gap-1 items-center justify-center text-sm text-slate-500 -mt-1">
              <RiMapPinLine className="text-md" />
              <p>Bantama Ahenebronum</p>
            </div>
            
            <div className="flex w-full bg-secondary-dark h-14 gap-1 items-center justify-center text-sm text-white">
              
              <p>{selectedUser?.email}</p> | <p>{selectedUser?.phone_number}</p>
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <Button> Edit User</Button>
            <Modal
                dialogTriggerElement={
                    <Button
                    variant={"empty"}
                    className="text-red-500 border border-red-500 hover:text-white hover:bg-red-500"
                    
                  >
                    
                    Delete User
                  </Button>
                }
              >
               <DeleteModalCard itemId={`${selectedUser?.first_name} ${selectedUser?.last_name}`} item="User"/> 
              </Modal>
            
          </div>
          
        </Container>
        <div className="w-full h-10 rounded-lg flex items-center justify-center">
            
           
        </div>
        </div>

        <div className="w-full col-span-6 space-y-3">
          <section className="w-full flex flex-col md:flex-row gap-2 items-center md:justify-between justify-center">
            <DashboardCard
              number={0 || userTrips?.total_trip_count}
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
          <Container className="rounded-xl">
            <UserTripsTable />
          </Container>
        </div>
      </main>
        </>
    );
}