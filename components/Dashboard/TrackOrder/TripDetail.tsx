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
import { extractShortDate } from "@/lib/utils";
export default function TripDetail ({trip}: {trip:any}) {
    const dispatch = useAppDispatch();
    const dispatcher = trip?.dispatcher;
    const handleEditTrip = ()=> {
    
     dispatch(setEditingOrder(true));
     dispatch(setTrackingOrder(false))
}
    return (
        <div className="space-y-3 md:mb-0 mb-24">
          <article className="flex flex-col gap-4">
            <section className="flex flex-col md:flex-row gap-2 text-xl mb-2">
              <span className="flex gap-2">

              <h1> Order:</h1>
              <h2 className="font-bold">{trip.trip_id}</h2> 
                <span className="hidden md:block">|     </span>
              </span>

              <span className="flex gap-2">
              <h1> Package Type:</h1>
              <h2 className="font-bold">{trip.package_type}</h2>
              <span className="hidden md:block">|     </span>
              </span>
              <span className="flex gap-2">
              <h1> Request Date:</h1>
              <h2 className="font-bold">{extractShortDate(trip.trip_request_date)}</h2>
              </span>
              
              
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
                <StatusSection tripStage={trip?.trip_stage} tripStatus={trip?.trip_status} />
              </Container>
              <Container className=" w-full h-60 rounded-lg p-6">
                <PackageSection/>
              </Container>
            </div>

            <div className="w-full lg:w-2/6 space-y-5">
              <Container className="flex flex-col  w-full   h-52 rounded-lg p-3 gap-2">
                <PaymentSection/>
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