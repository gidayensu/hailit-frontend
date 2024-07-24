'use client'
import { useAppSelector } from "@/lib/store/hooks";
import { scrollToSection } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { workPeriod } from "@/lib/utils"

export const useSendPackage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
  const deliveryMediumRef = useRef<any> (null);
  const destinationAreaRef = useRef<any> (null);
  const deliveryDayRef = useRef<any> (null);

  const {trip_medium, trip_area, trip_type} = useAppSelector(state=>state.deliveryChoices);

  const sendPackageModalRef = useRef<any>(null);
  const sendPackageModal = sendPackageModalRef.current;
  const closeSendPackageModal = ()=> {
    sendPackageModalRef.current?.close();
  }
  const openSendPackageModal = ()=> {
    sendPackageModalRef.current?.showModal();
  }
  const isEvening = true;

  
  useEffect(() => {
    if (!workPeriod()) {
      
      if (sendPackageModalRef.current) {
        
        openSendPackageModal();
      }
    }
  }, [isEvening, sendPackageModalRef]);

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
  

    return {
      handleLoading,
      handleMissingChoice,
      sendPackageModal,
      isLoading,
      closeSendPackageModal,
      trip_medium,
      trip_area,
      trip_type,
      deliveryMediumRef,
      destinationAreaRef,
      sendPackageModalRef,
      deliveryDayRef,
      isEvening
    };
    
}
