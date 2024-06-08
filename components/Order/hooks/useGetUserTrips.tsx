"use client";
import { useGetUserTripsQuery } from "@/lib/store/apiSlice/hailitApi";
import { useAppSelector } from "@/lib/store/hooks";
import { PackageType, DeliveryStatus } from "../OrderSummaryMin";

export type Deliveries = boolean;
interface Trip {
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

export const useGetUserTrips = () => {
  const { user_id } = useAppSelector((state) => state.user);
  const { data, isLoading, error } = useGetUserTripsQuery(user_id);

  const currentTrips = data?.trips?.filter(
    (trip: Trip) => trip.trip_status !== "Delivered" && trip.trip_status !== "Cancelled"
  ) || [];
  
  const previousTrips = data?.trips?.filter(
    (trip: Trip) => trip.trip_status === "Delivered" || trip.trip_status === "Cancelled"
  ) || [];
  let noDelivery = false;
  currentTrips.length < 1 && previousTrips.length < 1 ? noDelivery = true : ''
  return { currentTrips, previousTrips, isLoading, error, noDelivery };
};

