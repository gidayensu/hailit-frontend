'use client'
//ui
import { Button } from "../ui/button";
import Loader from "../Shared/Loader";
//main components
import PackageDestinationChoice from "../Order/NewDelivery/PackageDestinationChoice";
import DeliveryDayChoice from "../Order/NewDelivery/DeliveryDayChoice";
import DeliveryMediumChoice from "../Order/NewDelivery/DeliveryMediumChoice";

//redux + next + react
import Link from "next/link";
import { useAppSelector } from "@/lib/store/hooks";
import toast, { Toaster } from 'react-hot-toast';
import { useState } from "react";

export default function SendPackage() {

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {trip_medium, destination_area, trip_type} = useAppSelector(state=>state.deliveryChoices);

  const scrollToSection = (sectionId:string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  let missingChoice = '';
  !destination_area ? missingChoice = 'destination area' :  !trip_type ? missingChoice = 'delivery day' : !trip_medium ? missingChoice = 'trip medium' : '';
  
  const handleLoading = ()=> {
    setIsLoading(true)
  }
  const handleMissingChoice = ()=> {
    let toastMessage = ''
    if(missingChoice === 'trip medium') {
      toastMessage = "Destination Medium Not Selected"
      scrollToSection("delivery-medium")
    }

    if(missingChoice === 'destination area') {
      toastMessage = "Destination Area Not Selected"
      scrollToSection("destination-area")
    }

    if(missingChoice === 'delivery day') {
      toastMessage = "Delivery Day Not Selected"
      scrollToSection("delivery-day")
    }
    
    toast.error(
        <p className=" text-[13px]">
          {toastMessage}
        </p>
      
        )
  }
  return (
    <>
      <article
        id="destination-area"
        className="mt-5 flex flex-col items-center justify-center md:4/6 w-5/6 rounded-2xl gap-3"
        onClick={() => scrollToSection("delivery-day")}
      >
        <h2 className="font-bold text-xl text-center mb-2">
          SELECT PACKAGE DESTINATION
        </h2>
        <section className="flex flex-col md:flex-row md:w-4/6 w-full items-center justify-center gap-2 md:items-start">
          <PackageDestinationChoice />
        </section>
      </article>

      <article
        id="delivery-day"
        className="mt-5 flex flex-col items-center justify-center md:4/6 w-5/6 rounded-2xl gap-3"
        onClick={() => scrollToSection("delivery-medium")}
      >
        <h2 className="font-bold text-xl text-center my-2">SELECT DELIVERY DAY</h2>
        <section className="flex w-full md:flex-row md:w-4/6 items-center justify-center gap-2 md:items-start">
          <DeliveryDayChoice />
        </section>
      </article>

      <article
        id="delivery-medium"
        className="mt-5 flex flex-col items-center justify-center md:4/6 w-5/6 rounded-2xl gap-3"
        // onClick={()=>scrollToSection("continue")}
      >
        <h2 className="font-bold text-xl text-center my-2">
          SELECT DELIVERY MEDIUM
        </h2>
        <section className="flex w-full md:flex-row md:w-4/6 items-center justify-center gap-2 md:items-start">
          <DeliveryMediumChoice />
        </section>
      </article>
      <article className="flex items-center justify-center flex-col md:4/6 w-5/6" >
        {
          (!trip_medium || !destination_area || !trip_type ) &&
          <>
          <Button onClick={handleMissingChoice} className="md:w-4/6 w-full" >
            Continue
          </Button>
          <Toaster/>
          </>
        }

{
          (trip_medium && destination_area && trip_type ) &&
          <Link href={'/order/new'} className="w-full flex items-center justify-center" onClick={handleLoading}>
          <Button className="md:w-4/6 w-full">
            {isLoading ? <Loader color="red"/> : 'Continue'}
          </Button>
          
          </Link>
        }
      </article>
    </>
  );
}
