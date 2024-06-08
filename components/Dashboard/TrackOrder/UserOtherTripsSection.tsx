import OrderSummaryMin from "@/components/Order/OrderSummaryMin";
import Loader from "@/components/Shared/Loader";
import NoData from "@/components/Shared/NoData";
import { extractDateWithDayFromDate } from "@/lib/utils";
import { useGetUserTrips } from "../hooks/useGetUserTrips";

export default function UserOtherTrips({
  userId,
  tripId,
}: {
  userId: string;
  tripId: string;
}) {
  const { data, isLoading, trips, handleTrackTrip } = useGetUserTrips(userId);
  const otherTrips = trips?.filter((trip: any) => trip.trip_id !== tripId);

  return (
    <div className="flex flex-col gap-2">
          <h3 className="font-bold">USER OTHER RECENT TRIPS</h3>
      <div className="flex justify-between">
        
        <>

            <div className="flex flex-col gap-2 w-full">
              {isLoading && (
                <div className="flex items-center justify-center">
                  <Loader color="red" />
                </div>
              )}
              {trips && (
                <>
                  {otherTrips.map((trip: any, index: number) => (
                    <>
                      {index <= 1 && (
                        <div onClick={() => handleTrackTrip(trip.trip_id)}>
                          <OrderSummaryMin
                            key={trip.trip_id}
                            cost={trip.trip_cost}
                            deliveryStatus={trip.trip_status}
                            packageType={trip.package_type}
                            tripId={trip.trip_id}
                            tripRequestDate={extractDateWithDayFromDate(
                              trip.trip_request_date
                            )}
                          />
                        </div>
                      )}
                    </>
                  ))}
                </>
              )}
              {!data && !isLoading && (
                <NoData
                  noDataText="User has made no other orders"
                  textClassName="font-semibold text-center"
                />
              )}
            </div>

        </>
      </div>
    </div>
  );
}
