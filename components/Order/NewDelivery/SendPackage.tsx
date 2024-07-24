'use client'
//ui
import Loader from "../../Shared/Loader";
import { Button } from "../../ui/button";
//main components
import SecondaryModal from "@/components/Shared/SecondaryModal";
import DeliveryDayChoice from "./DeliveryChoices/DeliveryDayChoice";
import DeliveryMediumChoice from "./DeliveryChoices/DeliveryMediumChoice";
import PackageDestinationChoice from "./DeliveryChoices/PackageDestinationChoice";
//redux + next + react + helper
import { scrollToSection } from "@/lib/utils";
import Link from "next/link";
import { Toaster } from 'react-hot-toast';
import { useSendPackage } from "./hooks/useSendPackage";

export default function SendPackage() {

  const {
    handleLoading,
    handleMissingChoice,
    isLoading,
    trip_medium,
    trip_area,
    trip_type,
    deliveryMediumRef,
    destinationAreaRef,
    deliveryDayRef,
    closeSendPackageModal,
    
    sendPackageModalRef,

    
  } = useSendPackage();
  
  

  return (
    <>
    <SecondaryModal closeModal={closeSendPackageModal} note={true} modalRef={sendPackageModalRef} info={
      <>
      <p>
          <b>Riders</b> and <b>Drivers</b> are not available at this time for pickup. <br/>
          
      </p>
      <p className="mt-2">
      Kindly <b className="dark:text-amber-300 ">schedule</b> your delivery and it will be picked up tomorrow. 
      </p>
      </>
    }/>
    
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
