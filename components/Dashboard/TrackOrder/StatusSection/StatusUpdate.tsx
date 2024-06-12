import Loader from "@/components/Shared/Loader";
import { IoMdCheckmark } from "react-icons/io";
import { useStatusUpdate } from "../../../Order/hooks/useStatusUpdate";

export default function StatusUpdate() {
  const {
    handleUpdateDashboardTrip,
    loading,
    localTripStatus,
    tripStatus,
    tripStage,
    trip
  } = useStatusUpdate();

  return (
    <div className="w-44">
      <div className="flex flex-col gap-2 p-5 ">
        <div
          className={`${
            tripStage === 1 ? "font-bold" : ""
          } flex items-center justify-between h-10`}
          onClick={() =>
            handleUpdateDashboardTrip({
              tripStage: 1,
              tripStatus: "Booked",
              tripCommencementDate: trip?.trip_commencement_date,
              tripCompletionDate: trip?.trip_completion_date,
            })
          }
        >
          <p>Booked</p>
          <span>
            {tripStatus === "Booked" && !loading ? <IoMdCheckmark /> : ""}
            {loading && localTripStatus.tripStatus === "Booked" ? (
              <Loader />
            ) : (
              ""
            )}
          </span>
        </div>
        <div
          className={`${
            tripStatus === "Picked Up" ? "font-bold" : ""
          } flex items-center justify-between h-10`}
          onClick={() =>
            handleUpdateDashboardTrip({
              tripStage: 2,
              tripStatus: "Picked Up",
              tripCommencementDate: new Date(),
              tripCompletionDate: trip?.trip_completion_date,
            })
          }
        >
          <p>Picked Up</p>
          <span>
            {tripStatus === "Picked Up" && !loading ? <IoMdCheckmark /> : ""}
            {loading && localTripStatus.tripStatus === "Picked Up" ? (
              <Loader />
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
            handleUpdateDashboardTrip({
              tripStage: 3,
              tripStatus: "In Transit",
              tripCommencementDate: trip?.trip_commencement_date,
              tripCompletionDate: trip?.trip_completion_date,
            })
          }
        >
          <p>In Transit</p>
          <span>
            {tripStatus === "In Transit" && !loading ? <IoMdCheckmark /> : ""}
            {loading && localTripStatus.tripStatus === "In Transit" ? (
              <Loader />
            ) : (
              ""
            )}
          </span>
        </div>
        <div
          className={`${
            tripStatus === "Delivered" ? "font-bold" : ""
          } flex items-center justify-between h-10`}
          onClick={() =>
            handleUpdateDashboardTrip({
              tripStage: 4,
              tripStatus: "Delivered",
              tripCommencementDate: trip?.trip_commencement_date,
              tripCompletionDate: new Date(),
            })
          }
        >
          <p>Delivered</p>
          <span>
            {tripStatus === "Delivered" && !loading ? <IoMdCheckmark /> : ""}
            {loading && localTripStatus.tripStatus === "Delivered" ? (
              <Loader />
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
              handleUpdateDashboardTrip({
                tripStage: tripStage,
                tripStatus: "Cancelled",
                tripCommencementDate: trip?.trip_commencement_date,
                tripCompletionDate: trip?.trip_completion_date,
              })
            }
          >
            <p>Cancelled</p>
            <span>
              {tripStatus === "Cancelled" && !loading ? <IoMdCheckmark /> : ""}
              {loading && localTripStatus.tripStatus === "Cancelled" ? (
                <Loader />
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
