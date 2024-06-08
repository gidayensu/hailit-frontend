//ui + icons
import { Textarea } from "@/components/ui/textarea";
import { FaMapMarkerAlt } from "react-icons/fa";
import Loader from "../Shared/Loader";
import { Button } from "../ui/button";

//react hook form
import { FormProvider } from 'react-hook-form';
import FormField from "./FormField";
//main components
import DeliveryChoicesBreadcrumb from "../Order/NewDelivery/DeliveryChoices/DeliveryChoicesBreadcrumb";
import PackageTypes from "../Order/NewDelivery/PackageTypes/PackageTypes";

//redux + next + react + helper
import Link from "next/link";

import { useNewOrderSubmit } from "./hooks/useNewOrderSubmit";

export default function NewOrderForm() {
  const {formMethods, handleSubmit, onDeliveryFormSubmit, scheduled, packageTypeRef, package_type, pickUpLocationName, dropOffLocationName, loading, register, } = useNewOrderSubmit();
  
    
    
  return (
    <FormProvider {...formMethods}>
      <form
        className="flex flex-col gap-4 md:justify-center md:items-center"
        onSubmit={handleSubmit(onDeliveryFormSubmit)}
      >
        <div className=" grid w-full max-w-sm items-center gap-1.5 ">
          <span className="flex items-start justify-start">
            <h3 className=" text-[14px] font-bold ">
              Delivery Area and Medium
            </h3>
          </span>
          <DeliveryChoicesBreadcrumb />
        </div>
        <div className=" grid w-full max-w-sm items-center gap-1.5 " ref={packageTypeRef}>
          <span className="flex items-start justify-start">
            <h3 className=" text-[14px] font-bold ">Package Type</h3>
          </span>
          <div className=" flex gap-[8px] -mb-5 flex-wrap">
            <PackageTypes />
          </div>
        </div>
        <span className="mt-2 -mb-3" >

          {!package_type && (
            <span className="text-red-500 text-[13px] text-left flex items-start justify-start ">
              <p>Package type not selected</p>
            </span>
          )}
        </span>
            {
              scheduled &&
              <div className="grid w-full max-w-sm items-center gap-1.5">
          <h3 className=" text-[14px] font-bold">Choose Delivery Date</h3>
          <FormField
            type="text"
            placeholder="Enter number of sender"
            className="h-14"
            name="calendar_schedule"
            calendar = {true}
          />
        </div>
            }
        <div className="mt-4 grid w-full max-w-sm items-center gap-1.5">
          <h3 className=" text-[14px] font-bold">Pickup Location</h3>
          <div className="w-full grid grid-cols-8 items-start justify-center gap-1">
            <div className="space-y-1 w-full col-span-6 ">

            <FormField
              type="text"
              placeholder="Enter location for pickup"
              className="h-14"
              name="pickup_location"
              defaultValue={pickUpLocationName}
            />
            </div>
            <span className="flex items-center justify-center mt-4 text-center col-span-1 text-[13px]">OR</span>
            <Link className="col-span-1" href={"/pickup-map"}>
            <Button variant = {'outline'} className=" h-14">
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
              defaultValue={dropOffLocationName}
            />
            </div>
            <span className="flex items-center justify-center mt-4 text-center col-span-1 text-[13px]">OR</span>
            <Link className="col-span-1" href={"/drop-off-map"}>
              <Button variant = {'outline'} className=" h-14">
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
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <h3 className=" text-[14px] font-bold">Recipient Number</h3>
          <FormField
            type="text"
            placeholder="Enter number of recipient"
            className="h-14"
            name="recipient_number"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <h3 className=" text-[14px] font-bold">Package value (GHS)</h3>
          <FormField
            type="number"
            placeholder="Enter package value"
            className="h-14"
            name="package_value"
            valueAsNumber={true}
          />
        </div>
        {/* <div className="grid w-full max-w-sm items-center gap-1.5">
        <h3 className=" text-[14px] font-bold">
          Upload Product Image (optional)
        </h3>
        <FormField id="picture" type="file" />
      </div> */}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <h3 className=" text-[14px] font-bold">Additional Information</h3>
          <Textarea className="h-32" {...register("additional_information")} />
          
          
            <Button type="submit" className="w-full h-14" disabled = {loading}>
              {!loading ? 'Book' : <Loader color="red"/>} 
            </Button>
          
{/* 
          {loading && (
            <Button
              type="submit"
              className="w-full h-14 cursor-not-allowed"
              disabled
            >
              <Loader color="red" />
            </Button>
          )} */}
        </div>
      </form>
    </FormProvider>
  );
}

