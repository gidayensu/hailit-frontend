"use client";
import Loader from "@/components/Shared/Loader";
import { IoMdCheckmark } from "react-icons/io";
import { useLazyUpdateTripQuery } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setTripStatus, TripStatus } from "@/lib/store/slice/dashboardSlice";
import { useState } from "react";

export default function StatusUpdate() {
  const [packageStatus, setPackageStatus] = useState<TripStatus>({
    tripStage: 0,
    tripStatus: "",
  });

  const [loading, setIsLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const { selectedTripId, tripStatus, tripStage } = useAppSelector(
    (state) => state.dashboard
  );

  const [
    updateTrip,
    { data: updateData, isLoading: updateLoading, error: updateError },
  ] = useLazyUpdateTripQuery();

  const handleUpdateTrip = async (statusDetails: TripStatus) => {
    setPackageStatus({
      tripStatus: statusDetails.tripStatus,
      tripStage: statusDetails.tripStage,
    });

    setIsLoading(true);
    await updateTrip({
      tripId: selectedTripId,
      tripDetails: {
        trip_status: statusDetails.tripStatus,
        trip_stage: statusDetails.tripStage,
      },
    });
  };

  if (
    updateData &&
    updateData.trip &&
    tripStatus !== packageStatus.tripStatus
  ) {
    dispatch(
      setTripStatus({
        tripStage: packageStatus.tripStage,
        tripStatus: packageStatus.tripStatus,
      })
    );
    setIsLoading(false);
  }

  return (
    <div className="w-44">
      <div className="flex flex-col gap-2 p-5 ">
        <div
          className={`${
            tripStage === 1 ? "font-bold" : ""
          } flex items-center justify-between h-10`}
          onClick={() =>
            handleUpdateTrip({
              tripStage: 1,
              tripStatus: "New",
            })
          }
        >
          <p>New</p>
          <span>
            {tripStatus === "New" ? <IoMdCheckmark /> : ""}
            {loading && packageStatus.tripStage === 1 ? (
              <Loader color="grey" />
            ) : (
              ""
            )}
          </span>
        </div>
        <div
          className={`${
            tripStage === 2 ? "font-bold" : ""
          } flex items-center justify-between h-10`}
          onClick={() =>
            handleUpdateTrip({
              tripStage: 2,
              tripStatus: "Picked Up",
            })
          }
        >
          <p>Picked Up</p>
          <span>
            {tripStatus === "Picked Up" ? <IoMdCheckmark /> : ""}
            {loading && packageStatus.tripStage == 2 ? (
              <Loader color="grey" />
            ) : (
              ""
            )}
          </span>
        </div>
        <div
          className={`${
            tripStage === 3 ? "font-bold" : ""
          } flex items-center justify-between h-10`}
          onClick={() =>
            handleUpdateTrip({
              tripStage: 3,
              tripStatus: "In Transit",
            })
          }
        >
          <p>In Transit</p>
          <span>
            {tripStatus === "In Transit" ? <IoMdCheckmark /> : ""}
            {loading && packageStatus.tripStage == 3 ? (
              <Loader color="grey" />
            ) : (
              ""
            )}
          </span>
        </div>
        <div
          className={`${
            tripStage === 4 ? "font-bold" : ""
          } flex items-center justify-between h-10`}
          onClick={() =>
            handleUpdateTrip({
              tripStage: 4,
              tripStatus: "Delivered",
            })
          }
        >
          <p>Delivered</p>
          <span>
            {tripStatus === "Delivered" ? <IoMdCheckmark /> : ""}
            {loading && packageStatus.tripStage == 4 ? (
              <Loader color="grey" />
            ) : (
              ""
            )}
          </span>
        </div>
        {tripStatus !== "Delivered" && (
          <div
            className={`${
              tripStatus === "Cancelled" ? "font-bold" : ""
            } flex items-center justify-between h-10`}
            onClick={() =>
              handleUpdateTrip({
                tripStage: tripStage,
                tripStatus: "Cancelled",
              })
            }
          >
            <p>Cancelled</p>
            <span>
              {tripStatus === "Cancelled" ? <IoMdCheckmark /> : ""}
              {loading && packageStatus.tripStatus === "Cancelled" ? (
                <Loader color="grey" />
              ) : (
                ""
              )}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
