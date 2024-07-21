import { IoMdCheckmark } from "react-icons/io";
import { useDashboardTripUpdate } from "./hooks/useDashboardTripUpdate";
import { useGetTrip } from "./hooks/useGetTrip";

export default function StatusUpdate() {
  const {handleTripUpdate} = useDashboardTripUpdate();
  const {trip,} = useGetTrip();

  return (
    <div className="w-44">
      <div className="flex flex-col gap-2 p-5 ">
        <div
          className={`${
            trip?.trip_stage === 1 ? "font-bold" : ""
          } flex items-center justify-between h-10`}
          onClick={() =>
            handleTripUpdate('1',{
              trip_stage: 1,
              trip_status: "Booked",
              trip_commencement_date: trip?.trip_commencement_date,
              trip_completion_date: trip?.trip_completion_date,
            })
          }
        >
          <p>Booked</p>
          <span>
            {trip?.trip_status === "Booked" ? <IoMdCheckmark /> : ""}
            
          </span>
        </div>
        <div
          className={`${
            trip?.trip_status === "Picked Up" ? "font-bold" : ""
          } flex items-center justify-between h-10`}
          onClick={() =>
            handleTripUpdate('2',{
              trip_stage: 2,
              trip_status: "Picked Up",
              trip_commencement_date: new Date(),
              trip_completion_date: trip?.trip_completion_date,
            })
          }
        >
          <p>Picked Up</p>
          <span>
            {trip?.trip_status === "Picked Up" ? <IoMdCheckmark /> : ""}
            
          </span>
        </div>
        <div
          className={`${
            trip?.trip_stage === 3 ? "font-bold" : ""
          } flex items-center justify-between h-10`}
          onClick={() =>
            handleTripUpdate( '3',{
              trip_stage: 3,
              trip_status: "In Transit",
              trip_commencement_date: trip?.trip_commencement_date,
              trip_completion_date: trip?.trip_completion_date,
            })
          }
        >
          <p>In Transit</p>
          <span>
            {trip?.trip_status === "In Transit" ? <IoMdCheckmark /> : ""}
            
          </span>
        </div>
        <div
          className={`${
            trip?.trip_status === "Delivered" ? "font-bold" : ""
          } flex items-center justify-between h-10`}
          onClick={() =>
            handleTripUpdate( '4',{
              trip_stage: 4,
              trip_status: "Delivered",
              trip_commencement_date: trip?.trip_commencement_date,
              trip_completion_date: new Date(),
            })
          }
        >
          <p>Delivered</p>
          <span>
            {trip?.trip_status === "Delivered" ? <IoMdCheckmark /> : ""}
           
          </span>
        </div>
        {trip?.trip_status !== "Delivered" && (
          <div
            className={`${
              trip?.trip_status === "Cancelled" ? "font-bold" : ""
            } flex items-center justify-between h-10`}
            onClick={() =>
              handleTripUpdate('5',{
                trip_stage: trip?.trip_stage,
                trip_status: "Cancelled",
                trip_commencement_date: trip?.trip_commencement_date,
                trip_completion_date: trip?.trip_completion_date,
              })
            }
          >
            <p>Cancelled</p>
            <span>
              {trip?.trip_status === "Cancelled" ? <IoMdCheckmark /> : ""}
              
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
