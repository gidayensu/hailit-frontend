'use client'
//ui + icons
import { Textarea } from "@/components/ui/textarea";
import { FaMapMarkerAlt } from "react-icons/fa";
import Loader from "../Shared/Loader";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
//react hook form
import { FormProvider } from 'react-hook-form';
import FormField from "./FormField";
//main components
import DeliveryChoicesBreadcrumb from "../Order/NewDelivery/DeliveryChoices/DeliveryChoicesBreadcrumb";
import PackageTypes from "../Order/NewDelivery/PackageTypes/PackageTypes";
import PaymentMethods from "../Order/PaymentMethods";
//redux + next + react + helper
import Link from "next/link";
import { useState } from "react";
import { useNewOrderSubmit } from "./hooks/useNewOrderSubmit";
import { usePathname } from "next/navigation";

export default function NewOrderForm() {

  const {
    formMethods,
    handleSubmit,
    onDeliveryFormSubmit,
    scheduled,
    packageTypeRef,
    package_type,
    pickUpLocationName,
    dropOffLocationName,
    loading,
    register,
    distanceAndCost
  } = useNewOrderSubmit();
  const [pickUpLoading, setPickUpLoading] = useState<boolean>(false)
  const [dropOffLoading, setDropOffLoading] = useState<boolean>(false)

  
  const path = usePathname();
  return (
    <FormProvider {...formMethods}>
      <form
        className="flex flex-col gap-4 md:justify-center md:items-center"
        onSubmit={handleSubmit(onDeliveryFormSubmit)}
      >
        {
          !path.startsWith('/dashboard') &&

        <div className=" grid w-full max-w-sm items-center gap-1.5 ">
          <span className="flex items-start justify-start">
            <h3 className=" text-[14px] font-bold ">
              Delivery Area and Medium
            </h3>
          </span>
          <DeliveryChoicesBreadcrumb />
        </div>
        }
        <div className=" grid w-full max-w-sm items-center gap-1.5 " ref={packageTypeRef}>
          <span className="flex items-start justify-start">
            <h3 className=" text-[14px] font-bold ">Package Type</h3>
          </span>
          <div className=" flex gap-[8px] -mb-5 flex-wrap">
            <PackageTypes />
          </div>
        </div>
        <span className="mt-2 -mb-3 w-full max-w-sm" >

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
            schedule = {true }
          />
        </div>
            }
        <div className="mt-4 grid w-full max-w-sm items-center gap-1.5">
          <h3 className=" text-[14px] font-bold">Pickup Location</h3>
          <div className="w-full flex flex-col gap-2">
            <div className="space-y-1 w-full  ">
            {
              pickUpLocationName && 
            <FormField
              type="text"
              placeholder="Enter location for pickup"
              className="h-14"
              name="pickup_location"
              defaultValue={pickUpLocationName}
              readOnly
            />
            }
            </div>
            
            <Link className="w-full max-w-sm" href={"/pickup-map"} onClick={()=> setPickUpLoading(true)}>
            <Button variant = {'outline'} className="w-full hover:none dark:hover:none h-14">
                {pickUpLoading ? <Loader color="text-primary-color"/> : pickUpLocationName ?'Change pickup location':'Choose pickup location'}
              </Button>
            </Link>
            {!pickUpLocationName && (
            <span className="text-red-500 text-[13px] text-left flex items-start justify-start ">
              <p>Pickup location not selected</p>
            </span>
          )}
          </div>
          {/* <div className="w-full grid grid-cols-8 items-start justify-center gap-1 ">
            <div className="space-y-1 w-full col-span-6 ">
            {
              pickUpLocationName && 
            <FormField
              type="text"
              placeholder="Enter location for pickup"
              className="h-14"
              name="pickup_location"
              value={pickUpLocationName}
            />
            }
            </div>
            <span className="flex items-center justify-center mt-4 text-center col-span-1 text-[13px]">OR</span>
            <Link className="col-span-1" href={"/pickup-map"} onClick={()=> setPickUpLoading(true)}>
            <Button variant = {'outline'} className="hover:none dark:hover:none h-14">
                {pickUpLoading ? <Loader color="text-primary-color"/> : <FaMapMarkerAlt className="text-lg" />}
              </Button>
            </Link>
          </div> */}
        </div>
        <div className="grid w-full max-w-sm items-start gap-1.5">
          <h3 className=" text-[14px] font-bold">Destination / Drop off</h3>
          <div className="w-full flex flex-col gap-2">
            <div className="space-y-1 w-full  ">
            {
              dropOffLocationName && 
            <FormField
              type="text"
              placeholder="Enter location for dropoff"
              className="h-14"
              name="drop_off_location"
              defaultValue={dropOffLocationName}
              readOnly
            />
            }
            </div>
            
            <Link className="w-full max-w-sm" href={"/drop-off-map"} onClick={()=> setDropOffLoading(true)}>
            <Button variant = {'outline'} className="w-full hover:none dark:hover:none h-14">
                {dropOffLoading ? <Loader color="text-primary-color"/> : dropOffLocationName ?'Change dropoff location':'Choose dropoff location'}
              </Button>
            </Link>
            {!dropOffLocationName && (
            <span className="text-red-500 text-[13px] text-left flex items-start justify-start ">
              <p>Dropoff location not selected</p>
            </span>
          )}
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
          {
          distanceAndCost && 
          <>
          <div className=" grid w-full max-w-sm items-center gap-1.5 " >
          <span className="flex items-start justify-start">
            <h3 className=" text-[14px] font-bold ">Payment Method</h3>
          </span>
          <div className=" flex gap-[8px]  flex-wrap">
          <PaymentMethods/>
          </div>
        </div>
          
          
        
        <div className="w-full flex flex-col items-start justify-between h-[120px] rounded-md bg-[#c7ddf7] dark:bg-secondary-dark p-3 my-3">
        <div className="flex w-full items-start justify-between text-sm ">
          <div className="space-y-1">
            <ul>Distance (km)</ul>
            <ul>Trip Cost</ul>
            <ul>Service Fee</ul>
          </div>
          <div className="space-y-1 text-right font-semibold">
            <ul>~{distanceAndCost.distanceInKm}</ul>
            <ul>GHS {distanceAndCost.cost}</ul>
            <ul>{0}</ul>
          </div>
        </div>

        <Separator className="dark:bg-slate-50 bg-secondary-dark" />
        <div className="flex w-full items-start justify-between text-sm font-bold mt-1">
          <p>Total</p>
          <p>GHS{distanceAndCost.cost}</p>
        </div>
      </div>
          </>
        }
          
            <Button type="submit" className="w-full h-14" disabled = {loading}>
              {!loading ? 'Book' : <Loader />} 
            </Button>
          
{/* 
          {loading && (
            <Button
              type="submit"
              className="w-full h-14 cursor-not-allowed"
              disabled
            >
              <Loader />
            </Button>
          )} */}
        </div>
        
      </form>
    </FormProvider>
  );
}

