"use client";
import { useGetTripQuery } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  setActiveSection,
  setAssignedDispatcher,
  setSelectedTripId,
  setTrackingOrder,
  setTripStatus,
} from "@/lib/store/slice/dashboardSlice";

import { useRef, useCallback, useEffect } from "react";

export type OrderStatus =
  | "Booked"
  | "Picked Up"
  | "In Transit"
  | "Delivered"
  | "Cancelled";

import { Vehicle } from "@/components/Dashboard/Vehicles/hook/useGetVehicles";

export const useGetTrip = () => {
  const inputRef = useRef<any>(null);

  const {
    previousSelectedTripId,
    selectedTripId,
    trackingOrder,
    editingOrder,
    assignedDispatcherId,
    tripStage,
    tripStatus,
  } = useAppSelector((state) => state.dashboard);
  const { data, isLoading, error } = useGetTripQuery(`${selectedTripId}`);
  const dispatch = useAppDispatch();

  const trip = data?.trip;
  const dispatcher = trip?.dispatcher;

  const updateTripData = useCallback(() => {
    if (trip && (previousSelectedTripId !== selectedTripId || !previousSelectedTripId)) {
      dispatch(
        setAssignedDispatcher({
          assignedDispatcherId: trip.dispatcher_id,
          assignedDispatcherName: `${dispatcher.first_name} ${dispatcher.last_name}`,
          assignedDispatcherPlate: dispatcher.vehicle?.plate_number,
          assignedDispatcherVehicle: dispatcher.vehicle?.vehicle_name,
          assignedDispatcherPhone: dispatcher.phone_number,
        })
      );
      dispatch(
        setTripStatus({
          tripStage: trip.trip_stage,
          tripStatus: trip.trip_status,
          tripCommencementDate: trip.trip_commencement_date,
          tripCompletionDate: trip.trip_completion_date
        })
      );
    }
  }, [dispatch, trip, dispatcher, previousSelectedTripId, selectedTripId]);

  useEffect(() => {
    updateTripData();
  }, [updateTripData]);

  const handleTrackTrip = () => {
    const tripId = inputRef.current?.value;
    dispatch(setTrackingOrder(true));
    dispatch(setSelectedTripId(tripId));
  };

  const handleUsersOrTripsNav = (section: string) => {
    dispatch(setActiveSection(section));
  };

  return {
    tripStage,
    tripStatus,
    trip,
    trackingOrder,
    dispatcher,
    inputRef,
    isLoading,
    handleTrackTrip,
    handleUsersOrTripsNav,
    editingOrder,
  };
};

export interface TripDispatcher {
  rider_rating_count: number;
  cumulative_rider_rating: string;
  user_id: string;
  rider_id: string;
  license_number: string;
  rider_availability: string;
  vehicle_id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  vehicle: Vehicle;
}
export interface Trip {
  trip_stage: string;
  trip_request_date: string;
  trip_commencement_date: null | string;
  trip_completion_date: null | string;
  trip_cost: number;
  payment_status: boolean;
  dispatcher_rating: null | number;
  rated: boolean;
  package_value: string;
  rating_comment: string;
  recipient_number: string;
  trip_type: string;
  trip_id: string;
  payment_method: string;
  promo_code: string;
  dispatcher_id: string;
  customer_id: string;
  trip_medium: string;
  trip_status: string;
  package_type: string;
  pickup_location: string;
  drop_off_location: string;
  additional_information: string;
  sender_number: string;
  trip_area: string;
  dispatcher: TripDispatcher;
}
