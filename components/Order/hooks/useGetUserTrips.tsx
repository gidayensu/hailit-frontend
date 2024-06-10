"use client";
import { useGetUserTripsQuery } from "@/lib/store/apiSlice/hailitApi";
import { useAppSelector } from "@/lib/store/hooks";
import { PackageType, DeliveryStatus } from "../OrderSummaryMin";



export const useGetUserTrips = () => {
  const { user_id, user_role } = useAppSelector((state) => state.user);
  const { data, isLoading, error } = useGetUserTripsQuery(user_id);

  let previousTrips = [];
  let currentTrips = [];
  const trips = data?.trips;
  if (user_role === "driver" || user_role === "rider") {
    currentTrips =
      data?.trips?.dispatcher_trips.filter(
        (trip: DispatcherTrip) =>
          trip.trip_status !== "Delivered" && trip.trip_status !== "Cancelled"
      ) || [];
    previousTrips =
      data?.trips?.dispatcher_trips.filter(
        (trip: DispatcherTrip) =>
          trip.trip_status === "Delivered" || trip.trip_status === "Cancelled"
      ) || [];
  } else {
    currentTrips =
      data?.trips?.filter(
        (trip: Trip) =>
          trip.trip_status !== "Delivered" && trip.trip_status !== "Cancelled"
      ) || [];
    previousTrips =
      data?.trips?.filter(
        (trip: Trip) =>
          trip.trip_status === "Delivered" || trip.trip_status === "Cancelled"
      ) || [];
  }

  let noDelivery = false;
  currentTrips.length < 1 && previousTrips.length < 1
    ? (noDelivery = true)
    : "";
  return {trips, currentTrips, previousTrips, isLoading, error, noDelivery };
};
export type Deliveries = boolean;
export interface Trip {
  trip_id: string;
  dispatcher_id: string;
  trip_medium: string;
  additional_information?: string;
  drop_off_location: string;
  package_type: PackageType;
  payment_method: string;
  payment_status: boolean;
  pickup_location: string;
  trip_cost: string;
  trip_request_date: string;
  trip_status: DeliveryStatus;
}

export interface DispatcherTrip {
  trip_id: string;
  trip_medium: string;
  trip_status: string;
  trip_type: string;
  pickup_location: string;
  drop_off_location: string;
  package_type: string;
  trip_commencement_date: Date | null; 
  trip_completion_date: Date | null; 
  trip_cost: number;
  trip_request_date: Date;
}
