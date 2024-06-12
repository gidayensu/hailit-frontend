"use client";
//ui + icons
import Loader from "@/components/Shared/Loader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FaMapMarkerAlt } from "react-icons/fa";
//react hook form
import FormField from "@/components/Form/FormField";
import { FormProvider } from "react-hook-form";
//main components
import PackageTypes from "@/components/Order/NewDelivery/PackageTypes/PackageTypes";
import TripAreaMediumAndType from "./TripAreaMediumAndType";

//redux + next + react + helper
import { CalendarField } from "@/components/Form/FormField";
import {
  setTripMedium,
  setTripArea,
  setPackageType,
  setScheduled,
} from "@/lib/store/slice/deliveryChoicesSlice";
import { extractDateWithDayFromDate } from "@/lib/utils";
import Link from "next/link";
import { useEffect } from "react";
import { Trip } from "../StatusSection/hook/useGetTrip";
import { useUpdateTrip } from "./hook/useUpdateTrip";

export default function EditTrip({ trip }: { trip: Trip }) {
  const {
    formMethods,
    dispatch,
    handleCancel,
    handleSubmit,
    onDeliveryFormSubmit,
    packageTypeRef,
    trip_medium,
    trip_type,
    trip_area,
    package_type,
    updateLoading,
    register,
  } = useUpdateTrip(trip)

  useEffect(() => {
    dispatch(setPackageType(trip?.package_type));
    dispatch(setTripMedium(trip?.trip_medium));
    dispatch(setTripArea(trip?.trip_area));
    if (trip?.trip_type === "scheduled") {
      dispatch(setScheduled(true));
    }
  }, [trip?.package_type, trip?.trip_type]);
  return (
    <main className=" bg-white dark:bg-secondary-dark p-6 rounded-xl flex flex-col">
      <h1 className="mb-2 text-2xl">
        Editing Trip: <b>{trip?.trip_id}</b>
      </h1>
      <h1 className="text-sm mb-5">
        Requested On: <b>{extractDateWithDayFromDate(trip?.trip_request_date)}</b>
      </h1>
      <FormProvider {...formMethods}>
        <form
          id="edit order"
          className="flex flex-col md:flex-row  gap-4 w-full"
          onSubmit={handleSubmit(onDeliveryFormSubmit)}
        >
          <div
            className="flex flex-col w-full max-w-sm  gap-1.5 "
            ref={packageTypeRef}
          >
            <TripAreaMediumAndType/>
            <span className="text-left">
              <h3 className=" text-[14px] font-bold ">Package Type</h3>
            </span>
            <div className=" flex flex-col gap-[8px] -mb-5 ">
              <div className="flex flex-row flex-wrap gap-2">
                {/* TRIP TYPE */}

                <PackageTypes />
                <h3 className=" text-[14px] font-bold">
                  Additional Information
                </h3>
                <Textarea
                  className="h-32"
                  {...register("additional_information")}
                  defaultValue={trip?.additional_information}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <h3 className=" text-[14px] font-bold">Pickup Date</h3>
    
      {/* <Controller
        name="pickup_date"
        control={control}
        render={({ field }) => (
          <SelectDate schedule={false} select = {field.value} onSelect = {field.onChange} />
        )}
      /> */}
      <CalendarField name="pickup_date" datePurpose = "pickup"/>
    
                
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <h3 className=" text-[14px] font-bold">Delivery Date</h3>
                
      <CalendarField name="delivery_date" datePurpose= "delivery"/>
          
              </div>
            </div>

            <span className="mt-2 -mb-3">
              {!package_type && (
                <span className="text-red-500 text-[13px] text-left flex items-start justify-start ">
                  <p>Package type not selected</p>
                </span>
              )}
            </span>
          </div>

          <div className="flex flex-col w-full gap-2">
            <div className="mt-4 grid w-full max-w-sm items-center gap-1.5">
              <h3 className=" text-[14px] font-bold">Pickup Location</h3>
              <div className="w-full grid grid-cols-8 items-start justify-center gap-1">
                <div className="space-y-1 w-full col-span-6 ">
                  <FormField
                    type="text"
                    placeholder="Enter location for pickup"
                    className="h-14"
                    name="pickup_location"
                    defaultValue={trip?.pickup_location}
                  />
                </div>
                <span className="flex items-center justify-center mt-4 text-center col-span-1 text-[13px]">
                  OR
                </span>
                <Link className="col-span-1" href={"/pickup-map"}>
                  <Button variant={"outline"} className=" h-14">
                    <FaMapMarkerAlt className="text-lg" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="grid w-full max-w-sm items-start gap-1.5">
              <h3 className=" text-[14px] font-bold">Destination / Drop off</h3>
              <div className="w-full grid grid-cols-8 items-start justify-center gap-1">
                <div className=" w-full col-span-6 ">
                  <FormField
                    type="text"
                    placeholder="Enter drop off location"
                    className="h-14"
                    name="drop_off_location"
                    defaultValue={trip?.drop_off_location}
                  />
                </div>
                <span className="flex items-center justify-center mt-4 text-center col-span-1 text-[13px]">
                  OR
                </span>
                <Link className="col-span-1" href={"/drop-off-map"}>
                  <Button variant={"outline"} className=" h-14">
                    <FaMapMarkerAlt className="text-lg" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <h3 className=" text-[14px] font-bold">Sender Number</h3>
              <FormField
                type="text"
                placeholder="Enter number of sender"
                className="h-14"
                name="sender_number"
                defaultValue={trip?.sender_number}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <h3 className=" text-[14px] font-bold">Recipient Number</h3>
              <FormField
                type="text"
                placeholder="Enter number of recipient"
                className="h-14"
                name="recipient_number"
                defaultValue={trip?.recipient_number}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <h3 className=" text-[14px] font-bold">Package value (GHS)</h3>
              <FormField
                type="text"
                placeholder="Enter package value"
                className="h-14"
                name="package_value"
                valueAsNumber={true}
                defaultValue={trip?.package_value}
              />
            </div>
          </div>
          <div className="w-full">
            {/* <div className="grid w-full max-w-sm items-center gap-1.5">
        <h3 className=" text-[14px] font-bold">
          Upload Product Image (optional)
        </h3>
        <FormField id="picture" type="file" />
      </div> */}
          </div>
        </form>
      </FormProvider>
      <div className="flex flex-col md:flex-row md:gap-4 gap-2 w-full items-center mt-8 ">
        <Button
          type="submit"
          form="edit order"
          className="md:w-[180px] w-full h-14"
          disabled={updateLoading}
        >
          {!updateLoading ? "Save" : <Loader />}
        </Button>
        <Button
          type="submit"
          variant={"outline"}
          form="edit order"
          className="md:w-[180px] w-full h-14"
          disabled={updateLoading}
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </div>
    </main>
  );
}
