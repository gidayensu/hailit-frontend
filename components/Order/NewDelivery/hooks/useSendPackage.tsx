'use client'
import { useAppSelector } from "@/lib/store/hooks";
import { scrollToSection } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { workPeriod } from "@/lib/utils"
import { useRouter } from "next/navigation";
import { supabaseSession } from "@/lib/supabaseAuth";

export const useSendPackage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const sendPackageModalRef = useRef<any>(null);
  const deliveryMediumRef = useRef<any> (null);
  const destinationAreaRef = useRef<any> (null);
  const deliveryDayRef = useRef<any> (null);

  const {trip_medium, trip_area, trip_type} = useAppSelector(state=>state.deliveryChoices);
  const router = useRouter();

  const sendPackageModal = sendPackageModalRef.current;
  const closeSendPackageModal = ()=> {
    sendPackageModalRef.current?.close();
  }
  const openSendPackageModal = ()=> {
    sendPackageModalRef.current?.showModal();
  }
  
  const { authenticated } = useAppSelector((state) => state.auth);
  const { onboard, user_role } = useAppSelector((state) => state.user);

  useEffect(() => {
    const checkSession = async () => {
      const session = await supabaseSession();

      if (authenticated && session) {
        if (!onboard) {
          router.push("/onboarding");
        } else if (user_role === "Admin") {
          router.push("/dashboard");
        } else if (user_role === "Driver" || user_role === "Rider") {
          router.push("/dispatcher");
        }
      }
    };

    checkSession();
  }, [authenticated, onboard, user_role, router]);


  
  useEffect(() => {
    if (!workPeriod()) {
      
      if (sendPackageModalRef.current) {
        
        openSendPackageModal();
      }
    }
  }, [sendPackageModalRef]);

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
      
    };
    
}
