"use client";

//main components+helper function
import { extractDateWithDayFromDate } from "@/lib/utils";
import { NewTrip } from "@/components/Form/FormTypes";

//redux+next+react
import { useState } from "react";
import { useLazyAddTripQuery } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch } from "@/lib/store/hooks";
import { setNewOrder } from "@/lib/store/slice/newOrderSlice";
import { useRouter } from "next/navigation";

export const useReOrder = (tripData: any) => {
  const tripDetails: NewTrip = {
    trip_medium: tripData.trip_medium,
    package_type: tripData.package_type,
    pickup_location: tripData.pickup_location,
    drop_off_location: tripData.drop_off_location,
    additional_information: tripData.additional_information,
    trip_type: tripData.trip_type,
    package_value: tripData.package_value,
    sender_number: tripData.sender_number,
    recipient_number: tripData.recipient_number,
  };
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [addTrip, { data, isLoading, error }] = useLazyAddTripQuery();
  const handleSubmit = () => {
    setLoading(true);
    addTrip(tripDetails);
  };

  if (data && !isLoading && !error) {
    const { trip } = data;
    dispatch(
      setNewOrder({
        order_success: true,
        trip_id: trip.trip_id,
        scheduled: false,
      })
    );
    router.push("/order/new/success");
  }

  if (error) {
    router.push("/order/new/failed");
  }

  const date = new Date();
  const tripRequestDate = extractDateWithDayFromDate(date);

  return { tripRequestDate, handleSubmit, loading };
};
