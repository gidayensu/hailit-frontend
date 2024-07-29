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
import OrderIsDeleted from "./OrderIsDeletedModal";
//helpers + next
import OrderDispatcherCard from "@/components/Dispatcher/OrderDispatcherCard";
import CustomerHelp from "@/components/Profile/Settings/CustomerHelp";
import { Modal } from "@/components/Shared/Modal";
import ModalCard from "@/components/Shared/ModalCard";
import Container from "@/components/ui/container";
import OrderSummary from "../OrderSummary";
import OrderUpdates from "../OrderUpdates";
import { ReOrder } from "../ReOrder";
import { useTrackOrderItem } from "./hooks/useTrackOrderItem";

export default function TrackOrderItem() {
  const {
    trip,
    tripOngoingStatus,
    tripRequestDate,
    isCustomer,
    handleTripUpdate,
    tripUdpateLoading,
    tripUdpateError,
    tripUpdateSuccess,
  } = useTrackOrderItem();

  
  return (
    <>
    <OrderIsDeleted tripId={trip?.trip_id} />
    <main className="flex min-h-screen flex-col items-center gap-10 mb-20">
      <TopSectionContainer className="flex flex-col items-start justify-center gap-2 w-full h-80 bg-slate-800  p-4 text-white ">
        <span className="text-5xl font-bold">#{trip?.trip_id ?? "Trip deleted"}</span>
        <p className="text-md ">
          <b>Package Type:</b> {trip?.package_type ?? "Trip deleted"}
        </p>
        <p className="text-md ">
          <b>Request Date:</b> {tripRequestDate ?? "Trip deleted"}
        </p>
        <p className="text-md ">
          <b>Trip Medium:</b> {trip?.trip_medium ?? "Trip deleted"}
        </p>
      </TopSectionContainer>

      <MiddleSectionContainer className="flex flex-col justify-start items-center space-y-2 p-5">
        <TrackOrderContainer headingText="Trip Status">
          <OrderUpdates/>
        </TrackOrderContainer>
        {
          tripOngoingStatus.includes(trip?.trip_status) &&
        <TrackOrderContainer headingText="Courier">
          <OrderDispatcherCard />
        </TrackOrderContainer>
        }

        <TrackOrderContainer headingText="Location and Timeline">
          <Container className="w-full flex flex-col gap-2  max-h-80 rounded-xl p-1 ">
            {/* prop drilling is used because OrderSummary is used by other components */}
            <OrderSummary trip={trip} /> 
          </Container>
          {trip?.drop_lat && isCustomer &&

            <TripMap />
}
        </TrackOrderContainer>


        <TrackOrderContainer headingText="Cost and Payment">
          <Container className=" w-full h-auto rounded-xl">
            <div className="grid grid-cols-3  p-3 ">
              <span className="text-sm">
                <p className=" font-bold">Amount</p>
                <p> {trip?.trip_cost ?? "Trip deleted"}</p>
              </span>
              <span className="text-sm">
                <p className=" font-bold">Status</p>
                <p className={`${trip?.payment_status ? 'text-green-500': 'text-red-500'} `}> {trip?.payment_status ? "Paid" : "Not Paid"}</p>
              </span>
              <span className="text-sm">
                <p className=" font-bold">Method</p>
                <p> {trip?.payment_method ?? "Trip deleted"}</p>
              </span>
            </div>
          </Container>
          <div className="flex flex-col gap-2 mt-4 w-full">
            {isCustomer && (
              <>
              
                <ReOrder/>

                {(trip?.trip_status === "Booked" ||
                  trip?.trip_status === "Picked Up" ||
                  trip?.trip_status === "In Transit") && (
                  <Modal
                    dialogTriggerElement="Cancel"
                    className="w-full  h-10 rounded-lg border border-red-500 hover:border-red-700 hover:text-red-700 bg-transparent text-red-500 dark:bg-transparent dark:text-red-500"
                  >
                    <ModalCard
                      modalType="destructive"
                      loading={tripUdpateLoading}
                      confirmFunc={() =>
                        handleTripUpdate({ trip_status: "Cancelled" })
                      }
                      error={tripUdpateError}
                      isSuccess={tripUpdateSuccess}
                    >
                      <div className="flex flex-col items-center justify-center">
                        {tripUdpateError && (
                          <>
                            <span className="mb-4 flex items-center justify-center h-9 w-9 rounded-full bg-red-200">
                              <MdOutlineError className="text-red-500 text-2xl" />
                            </span>
                            <h2 className="text-center text-lg mb-2 animate-in slide-in-from-bottom duration-100">
                              Error occurred cancelling trip?...
                            </h2>
                          </>
                        )}
                        {tripUpdateSuccess && (
                          <>
                            <span className="mb-4 flex items-center justify-center h-9 w-9 rounded-full bg-green-200">
                              <PiCheckCircleFill className="text-green-500 text-2xl" />
                            </span>
                            <h2 className="text-center text-lg mb-2 animate-in slide-in-from-bottom duration-100">
                              Trip cancelled
                            </h2>
                          </>
                        )}

                        {!tripUdpateError && !tripUpdateSuccess && (
                          <>
                            <span className="mb-4 flex items-center justify-center h-9 w-9 rounded-full bg-red-200">
                              <RxCross2 className="text-red-500 text-2xl" />
                            </span>
                            <h2 className="text-center text-md mb-2 animate-in slide-in-from-bottom duration-100">
                              You are attempting to <b>cancel trip  {trip?.trip_id}. </b> <br/>
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
    </>
  );
}
