"use client";

//main components+helper function
import { extractDateWithDayFromDate } from "@/lib/utils";
import { NewTrip } from "@/components/Form/FormTypes";

//redux+next+react
import { useState } from "react";
import { useAddTripMutation } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch } from "@/lib/store/hooks";
import { setNewOrder } from "@/lib/store/slice/newOrderSlice";
import { useRouter } from "next/navigation";
import { Trip } from "@/lib/store/slice/tripSlice";

export const useReOrder = (tripData: Trip) => {
  const {
    trip_medium,
    payment_method,
    trip_cost,
    pickup_location,
    drop_off_location,
    additional_information,
    trip_area,
    trip_type,
    package_value,
    package_type,
    recipient_number,
    sender_number,
    pick_lat,
    pick_long,
    drop_lat,
    drop_long
  } = tripData ;

  const tripDetails: NewTrip = {
    trip_medium,
    payment_method,
    trip_cost,
    pickup_location,
    drop_off_location,
    additional_information,
    trip_area,
    trip_type,
    package_value,
    package_type,
    recipient_number,
    sender_number,
    drop_lat,
    drop_long,
    pick_lat,
    pick_long

  };

  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [addTrip, { data, isLoading, error }] = useAddTripMutation();
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
