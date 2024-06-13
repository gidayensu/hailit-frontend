//ui + icons
import { Modal } from "@/components/Shared/Modal";
import { Button } from "../../ui/button";
import Container from "../../ui/container";
import DeleteModalCard from "./DeleteModalCard";

//main components
import CustomerSection from "./CustomerSection";
import DispatcherSection from "./Dispatcher/DispatcherSection";
import PackageSection from "./PackageSection";
import PaymentSection from "./PaymentSection";
import StatusSection from "./StatusSection/StatusSection";
import UserOtherTrips from "./UserOtherTripsSection";
import { useAppDispatch } from "@/lib/store/hooks";
import { setEditingOrder, setTrackingOrder,  } from "@/lib/store/slice/dashboardSlice";
export default function TripDetail ({trip, tripStage, tripStatus}: {trip:any, tripStage: number, tripStatus: string}) {
    const dispatch = useAppDispatch();
    const dispatcher = trip?.dispatcher;
    const handleEditTrip = ()=> {
    
     dispatch(setEditingOrder(true));
     dispatch(setTrackingOrder(false))
}
    return (
        <div className="space-y-3 mb-24">
          <article className="flex flex-col gap-4">
            <section className="flex gap-2 text-2xl mb-2">
              <h2> Order:</h2>
              <h1 className="font-bold">{trip.trip_id}</h1>
            </section>
            <section className="flex gap-3">
              


              {/* EDIT */}
              <Button
                className="flex items-center justify-center gap-2"
                variant={"outline"}
                onClick={handleEditTrip}
              >
                <p>Edit Trip</p>
              </Button>
              
                  {/* <EditTrip/> */}
              

              {/* DELETE  */}
              <Modal
                dialogTriggerElement={
                  <Button
                    className="flex items-center justify-center gap-2"
                    variant={"destructive"}
                    
                  >
                    <p>Delete Trip</p>
                  </Button>
                }
              >
               <DeleteModalCard itemId={trip.trip_id} item="Trip"/> 
              </Modal>
            </section>
          </article>

          <article className="flex flex-col lg:flex-row w-full gap-4">
            <div className="w-full lg:w-3/6 space-y-5">
              <Container className="flex flex-col  w-full h-52 rounded-lg p-3 gap-2">
                <StatusSection tripStage={tripStage} tripStatus={tripStatus} />
              </Container>
              <Container className=" w-full h-60 rounded-lg p-6">
                <PackageSection trip={trip} />
              </Container>
            </div>

            <div className="w-full lg:w-2/6 space-y-5">
              <Container className="flex flex-col  w-full   h-52 rounded-lg p-3 gap-2">
                <PaymentSection
                  cost={trip.trip_cost}
                  paymentStatus={trip.payment_status}
                />
              </Container>
              <Container className="flex flex-col  w-full h-60 rounded-lg p-3 gap-2">
                <CustomerSection customerId={trip.customer_id} />
              </Container>
            </div>
            <div className="w-full lg:w-2/6 space-y-5">
              <Container className="flex flex-col  w-full   h-52 rounded-lg p-3 gap-2">
                <DispatcherSection
                  dispatcher={dispatcher}
                  tripMedium={trip.trip_medium}
                />
              </Container>
              <Container className="flex flex-col  w-full   h-60 rounded-lg p-3 gap-2">
                <UserOtherTrips
                  userId={trip.customer_id}
                  tripId={trip.trip_id}
                />
              </Container>
            </div>
          </article>
        </div>

    )
}