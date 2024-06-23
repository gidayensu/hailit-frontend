"use client";
import { useState } from "react";
import Link from "next/link";
//ui + icons
import { Button } from "@/components/ui/button";
import { FiArrowLeft } from "react-icons/fi";
import Loader from "@/components/Shared/Loader";
import { useRouter } from "next/navigation";
import toast, {Toaster} from "react-hot-toast";
//redux
import { useAppSelector } from "@/lib/store/hooks";
//main components
import MiddleSectionContainer from "@/components/Shared/MiddleSectionContainer";
import TopSectionContainer from "@/components/Shared/TopSectionContainer";
import PackageDestinationChoice from "@/components/Order/NewDelivery/DeliveryChoices/PackageDestinationChoice";
import DeliveryChoicesBreadcrumb from "@/components/Order/NewDelivery/DeliveryChoices/DeliveryChoicesBreadcrumb";
import DeliveryMediumChoice from "@/components/Order/NewDelivery/DeliveryChoices/DeliveryMediumChoice";
import DeliveryDayChoice from "@/components/Order/NewDelivery/DeliveryChoices/DeliveryDayChoice";
import SendPackage from "@/components/Home/SendPackage";

interface DeliveryChoiceStage {
  destination: boolean;
  deliveryDay: boolean;
  deliveryMedium: boolean;
}
export default function NewOrder() {
  const router = useRouter();
  const [deliveryChoicesStage, setDeliveryChoicesStage] =
    useState<DeliveryChoiceStage>({
      destination: true,
      deliveryDay: false,
      deliveryMedium: false,
    });

    const {trip_area, trip_medium, trip_type} = useAppSelector(state=>state.deliveryChoices)
    const [isLoading, setIsLoading] = useState<boolean>(false);

    
    const handleMissingChoice = (toastMessage:string)=> {
      toast.error(
          <p className=" text-[13px]">
             Choose <b>{toastMessage} </b>
          </p>
          )
      
      
  
      
      
    }
  const handleDeliveryChoicesStage = (stage: number) => {
    switch (stage) {
      case(1): {
        setDeliveryChoicesStage({
          destination: true,
          deliveryDay: false,
          deliveryMedium: false,
        })
        break
      }
      case(2) : {
        if(!trip_area) {
          return handleMissingChoice("Destination Area")
        } else 
        setDeliveryChoicesStage({
          destination: true,
          deliveryDay: true,
          deliveryMedium: false,  
        })
        break
      }
      case(3) : {

        (trip_area && !trip_type) ? handleMissingChoice("Delivery Day") 
        : setDeliveryChoicesStage({
            destination: true,
            deliveryDay: true,
            deliveryMedium: true,
          })
          break
        }
      

      case(4): {
        if(trip_area && trip_type && !trip_medium){
          handleMissingChoice("Delivery Medium") }
          else {
            setIsLoading(true)
            router.push('/order/new')
          }
          break
      }
    }
    
  };
  return (
    <>
      <main className="flex min-h-screen flex-col items-center gap-10 ">
        <TopSectionContainer className="flex flex-col items-start justify-center gap-2 w-full h-80 bg-slate-800  p-4 text-white ">
          <span className="text-5xl font-bold ">Delivery Details</span>
          <p className="text-lg">Select city, day of delivery, and medium</p>
        </TopSectionContainer>

        <MiddleSectionContainer className="flex flex-col justify-start items-center mb-24">
          <SendPackage/>
        </MiddleSectionContainer>
      </main>
    </>
  );
}
