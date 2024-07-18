'use client'
//icons + ui
import { MdOutlineError } from "react-icons/md";
import { PiCheckCircleFill } from "react-icons/pi";

import { RxCross2 } from "react-icons/rx";
import TrackOrderContainer from "./TrackOrderContainer";
//main components
import MiddleSectionContainer from "@/components/Shared/MiddleSectionContainer";
import TopSectionContainer from "@/components/Shared/TopSectionContainer";
import TripMap from "../../Maps/TripMap";
//helpers + next
import DispatcherCard from "@/components/Dispatcher/DispatcherCard";
import CustomerHelp from "@/components/Profile/Settings/CustomerHelp";
import { Modal } from "@/components/Shared/Modal";
import ModalCard from "@/components/Shared/ModalCard";
import Container from "@/components/ui/container";
import { Trip } from "@/lib/store/slice/tripSlice";
import { extractDateWithDayFromDate } from "@/lib/utils";
import OrderSummary from "../OrderSummary";
import OrderUpdates from "../OrderUpdates";
import { ReOrder } from "../ReOrder";
import { useUpdateUserTrip } from "../hooks/useUpdateUserTrip";
import { calculateDistanceAndCost } from "@/lib/calculateDistanceAndCost";


type LocationType = [number, number]
export default function TrackOrderItem({
  trip,
  userId,
}: {
  trip: Trip;
  userId: string;
}) {
  const dispatcher = trip?.dispatcher;
  const isCustomer = userId === trip.customer_id;
  const tripRequestDate = extractDateWithDayFromDate(trip?.trip_request_date);
  const { handleTripUpdate, isLoading, isSuccess, error } = useUpdateUserTrip();
  
  const dropOffLocation: LocationType = [+trip?.drop_lat, +trip?.drop_long]
  const pickUpLocation: LocationType = [+trip?.pick_lat, +trip?.pick_long]

  const distanceAndCost =
    
    calculateDistanceAndCost({
      lat1: +trip?.pick_lat,
      lon1: +trip?.pick_long,
      lat2: +trip?.drop_lat, 
      lon2: +trip?.drop_long,
    });

    const distance = distanceAndCost?.distance ?? 0;
    const tripOngoingStatus = ["Booked","Picked Up", "In Transit"]

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
        <TrackOrderContainer headingText="Trip Status">
          <OrderUpdates
            currentOrderStage={trip.trip_stage}
            currentOrderStatus={trip.trip_status}
          />
        </TrackOrderContainer>
        {
          tripOngoingStatus.includes(trip.trip_status) &&
        <TrackOrderContainer headingText="Courier">
          <DispatcherCard
            firstName={dispatcher.first_name}
            lastName={dispatcher.last_name}
            phoneNumber={dispatcher.phone_number}
            vehicleName={dispatcher.vehicle?.vehicle_name}
            vehicleNumber={dispatcher.vehicle?.plate_number}
          />
        </TrackOrderContainer>
        }

        <TrackOrderContainer headingText="Location and Timeline">
          <Container className="w-full flex flex-col gap-2  max-h-80 rounded-xl p-1 ">
            <OrderSummary trip={trip} />
          </Container>
          {trip?.drop_lat && isCustomer &&

<TripMap dropOffLocation={dropOffLocation} pickUpLocation={pickUpLocation} distance={distance}/>
}
        </TrackOrderContainer>


        <TrackOrderContainer headingText="Cost and Payment">
          <Container className=" w-full h-auto rounded-xl">
            <div className="grid grid-cols-3  p-3 ">
              <span className="text-sm">
                <p className=" font-bold">Amount</p>
                <p> {trip.trip_cost}</p>
              </span>
              <span className="text-sm">
                <p className=" font-bold">Status</p>
                <p className={`${trip.payment_status ? 'text-green-500': 'text-red-500'} `}> {trip.payment_status ? "Paid" : "Not Paid"}</p>
              </span>
              <span className="text-sm">
                <p className=" font-bold">Method</p>
                <p> {trip.payment_method}</p>
              </span>
            </div>
          </Container>
          <div className="flex flex-col gap-2 mt-4 w-full">
            {isCustomer && (
              <>
              
                <ReOrder tripData={trip} />

                {(trip.trip_status === "Booked" ||
                  trip.trip_status === "Picked Up" ||
                  trip.trip_status === "In Transit") && (
                  <Modal
                    dialogTriggerElement="Cancel"
                    className="w-full  h-10 rounded-lg border border-red-500 hover:border-red-700 hover:text-red-700 bg-transparent text-red-500 dark:bg-transparent dark:text-red-500"
                  >
                    <ModalCard
                      modalType="destructive"
                      loading={isLoading}
                      confirmFunc={() =>
                        handleTripUpdate({ trip_status: "Cancelled" })
                      }
                      error={error}
                      isSuccess={isSuccess}
                    >
                      <div className="flex flex-col items-center justify-center">
                        {error && (
                          <>
                            <span className="mb-4 flex items-center justify-center h-9 w-9 rounded-full bg-red-200">
                              <MdOutlineError className="text-red-500 text-2xl" />
                            </span>
                            <h2 className="text-center text-lg mb-2 animate-in slide-in-from-bottom duration-100">
                              Error occurred cancelling trip...
                            </h2>
                          </>
                        )}
                        {isSuccess && (
                          <>
                            <span className="mb-4 flex items-center justify-center h-9 w-9 rounded-full bg-green-200">
                              <PiCheckCircleFill className="text-green-500 text-2xl" />
                            </span>
                            <h2 className="text-center text-lg mb-2 animate-in slide-in-from-bottom duration-100">
                              Trip cancelled
                            </h2>
                          </>
                        )}

                        {!error && !isSuccess && (
                          <>
                            <span className="mb-4 flex items-center justify-center h-9 w-9 rounded-full bg-red-200">
                              <RxCross2 className="text-red-500 text-2xl" />
                            </span>
                            <h2 className="text-center text-md mb-2 animate-in slide-in-from-bottom duration-100">
                              You are attempting to <b>cancel trip  {trip.trip_id}. </b> <br/>
                              If your item has been picked up, it will be returned.
                            </h2>
                            <h3>
                              
                            </h3>
                            <h3 className="text-center text-[16px] font-bold  text-red-500 animate-in slide-in-from-bottom duration-150">
                              Cancelling is irreversible!
                            </h3>
                          </>
                        )}
                      </div>
                    </ModalCard>
                  </Modal>
                )}
              </>
            )}

            <Modal
              dialogTriggerElement="Need Help?"
              className="w-full  h-10 rounded-lg font-bold"
            >
              <CustomerHelp />
            </Modal>
          </div>
        
        
        </TrackOrderContainer>
        <div className="max-w-sm">

        </div>
      </MiddleSectionContainer>
    </main>
  );
}
