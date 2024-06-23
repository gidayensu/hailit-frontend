import TopSectionContainer from "@/components/Shared/TopSectionContainer"
import MiddleSectionContainer from "@/components/Shared/MiddleSectionContainer"
import { extractDateWithDayFromDate } from "@/lib/utils";
import TrackOrderContainer from "./TrackOrderContainer";
import DispatcherCard from "@/components/Dispatcher/DispatcherCard";
import OrderSummary from "../OrderSummary";
import OrderUpdates from "../OrderUpdates";
import Container from "@/components/ui/container";
import CustomerHelp from "@/components/Profile/Settings/CustomerHelp";
import { ReOrder } from "../ReOrder";
import { Button  } from "@/components/ui/button";
import { Modal } from "@/components/Shared/Modal";

export default function TrackOrderItem({trip, userId}: {trip:any, userId:string  }) {
    const dispatcher = trip?.dispatcher;
    const {customer_id} = trip
    console.log({userId, customer_id})
    const tripRequestDate = extractDateWithDayFromDate(trip?.trip_request_date);
    return (
        <main className="flex min-h-screen flex-col items-center gap-10 mb-20">
      <TopSectionContainer className="flex flex-col items-start justify-center gap-2 w-full h-80 bg-slate-800  p-4 text-white ">
        <span className="text-5xl font-bold">#{trip.trip_id}</span>
        <p className="text-md ">
          <b>Package Type:</b> {trip.package_type}
        </p>
        <p className="text-md ">
          <b>Request Date:</b> {tripRequestDate}
        </p>
        <p className="text-md ">
          <b>Trip Medium:</b> {trip.trip_medium}
        </p>
      </TopSectionContainer>

      <MiddleSectionContainer className="flex flex-col justify-start items-center space-y-2 p-5">
        <TrackOrderContainer headingText="TRIP STATUS">
          <OrderUpdates
            currentOrderStage={trip.trip_stage}
            currentOrderStatus={trip.trip_status}
          />
        </TrackOrderContainer>

        <TrackOrderContainer headingText="COURIER">
          <DispatcherCard
            firstName={dispatcher.first_name}
            lastName={dispatcher.last_name}
            phoneNumber={dispatcher.phone_number}
            vehicleName={dispatcher.vehicle?.vehicle_name}
            vehicleNumber={dispatcher.vehicle?.plate_number}
          />
        </TrackOrderContainer>

        <TrackOrderContainer headingText="LOCATION AND TIMELINE">
        <Container className="w-full flex flex-col gap-2 md:h-52 max-h-64 rounded-xl p-4 "> 
          <OrderSummary
            trip = {trip}
          />
        </Container>
        </TrackOrderContainer>

        <TrackOrderContainer headingText="COST AND PAYMENT">
          <Container className=" w-full h-auto rounded-xl">
            <div className="grid grid-cols-3  p-3 ">
              <span className="text-sm">
                <p className=" font-bold">Amount</p>
                <p> {trip.trip_cost}</p>
              </span>
              <span className="text-sm">
                <p className=" font-bold">Status</p>
                <p> {trip.payment_status ? "Paid" : "Not Paid"}</p>
              </span>
              <span className="text-sm">
                <p className=" font-bold">Method</p>
                <p> {trip.payment_method}</p>
              </span>
            </div>
          </Container>
          <div className="flex flex-col gap-2 mt-4 w-full">
            <ReOrder tripData={trip} />
            
            {
              userId === trip.customer_id && ( (trip.trip_status === 'Booked' || trip.trip_status === 'Picked Up')) && 
            <Button variant={'empty'} className="border border-red-500 hover:border-red-700 hover:text-red-700 bg-transparent text-red-500 dark:bg-transparent dark:text-red-500">
                Cancel
            </Button>
            }
            <Modal
              dialogTriggerElement="Need Help?"
              className="w-full  h-10 rounded-lg font-bold"
            >
              <CustomerHelp />
            </Modal>
          </div>
        </TrackOrderContainer>
      </MiddleSectionContainer>
    </main>

    )
}