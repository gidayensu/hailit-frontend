'use client'
//ui
import { Button } from "../ui/button";
import Loader from "../Shared/Loader";
import { useRef } from "react";
//main components
import PackageDestinationChoice from "../Order/NewDelivery/DeliveryChoices/PackageDestinationChoice";
import DeliveryDayChoice from "../Order/NewDelivery/DeliveryChoices/DeliveryDayChoice";
import DeliveryMediumChoice from "../Order/NewDelivery/DeliveryChoices/DeliveryMediumChoice";

//redux + next + react + helper
import Link from "next/link";
import { useAppSelector } from "@/lib/store/hooks";
import toast, { Toaster } from 'react-hot-toast';
import { useState } from "react";
import { scrollToSection } from "@/lib/utils";

export default function SendPackage() {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const deliveryMediumRef = useRef<any> (null);
  const destinationAreaRef = useRef<any> (null);
  const deliveryDayRef = useRef<any> (null);

  const {trip_medium, trip_area, trip_type} = useAppSelector(state=>state.deliveryChoices);

  
  
  let missingChoice = '';
  !trip_area ? missingChoice = 'trip area' :  !trip_type ? missingChoice = 'delivery day' : !trip_medium ? missingChoice = 'delivery medium' : '';
  
  const handleLoading = ()=> {
    setIsLoading(true)
  }
  const handleMissingChoice = ()=> {
    let toastMessage = ''
    if(missingChoice === 'delivery medium') {
      toastMessage = "Delivery Medium"
      scrollToSection(deliveryMediumRef)
    }

    if(missingChoice === 'trip area') {
      toastMessage = "Destination Area"
      scrollToSection(destinationAreaRef)
    }

    if(missingChoice === 'delivery day') {
      toastMessage = "Delivery Day"
      scrollToSection(deliveryDayRef)
    }
    
    toast.error(
        <p className=" text-[13px]">
          <b>{toastMessage} </b> Not Selected
        </p>
      
        )
  }
  return (
    <>
      <article
        ref={destinationAreaRef}
        
        className="mt-5 flex flex-col items-center justify-center md:4/6 w-5/6 rounded-2xl gap-3"
        onClick={() => scrollToSection(deliveryDayRef)}
      >
        <h2 className="font-bold text-xl  mb-2">
          Select destination area
        </h2>
        <section className="flex flex-col md:flex-row md:w-4/6 w-full items-center justify-center gap-2 md:items-center">
          <PackageDestinationChoice />
        </section>
      </article>

      <article
        ref={deliveryDayRef}
        className="mt-5 flex flex-col items-center justify-center md:4/6 w-5/6 rounded-2xl gap-3"
        onClick={() => scrollToSection(deliveryMediumRef)}
      >
        <h2 className="font-bold text-xl my-2">Select delivery day</h2>
        <section className="flex w-full md:flex-row md:w-4/6 items-center justify-center gap-2 md:items-center">
          <DeliveryDayChoice />
        </section>
      </article>

      <article
        ref={deliveryMediumRef}
        className="mt-5 flex flex-col items-center justify-center md:4/6 w-5/6 rounded-2xl gap-3"
        // onClick={()=>scrollToSection("continue")}
      >
        <h2 className="font-bold text-xl  my-2">
          Select delivery medium
        </h2>
        <section className="flex w-full md:flex-row md:w-4/6 items-center justify-center gap-2 md:items-center">
          <DeliveryMediumChoice />
        </section>
      </article>
      <article className="flex items-center justify-center flex-col md:4/6 w-5/6" >
        {
          (!trip_medium || !trip_area || !trip_type ) &&
          <>
          <Button onClick={handleMissingChoice} className="md:w-4/6 w-full" >
            Continue
          </Button>
          <Toaster/>
          </>
        }

{
          (trip_medium && trip_area && trip_type ) &&
          <Link href={'/order/new'} className="w-full flex items-center justify-center" onClick={handleLoading}>
          <Button className="md:w-4/6 w-full">
            {isLoading ? <Loader /> : 'Continue'}
          </Button>
          
          </Link>
        }
      </article>
    </>
  );
}
