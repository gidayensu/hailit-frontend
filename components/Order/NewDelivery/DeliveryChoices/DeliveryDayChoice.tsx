'use client'
import { workPeriod } from "@/lib/utils"
import { RiCalendarScheduleFill, RiTimer2Fill, RiTimerFlashFill } from "react-icons/ri"
import { useDeliveryChoice } from "../../hooks/useDeliveryChoice"
import { DeliveryChoices } from "./DeliveryChoice"

export default function   DeliveryDayChoice () {
    const {trip_type, trip_area, trip_medium, handleDeliveryChoice} = useDeliveryChoice()
    
    return (
      <>
        <DeliveryChoices
          handleDeliveryOption={handleDeliveryChoice}
          deliveryOption={trip_type}
          MainIcon={RiTimerFlashFill}
          choiceType={{
            choice: "Same Day",
            choiceCategory: "delivery_day",
          }}
          className="animate-in  zoom-in duration-50"
          disabled={trip_area === "Inter City" || trip_medium === "Truck" || !workPeriod()}
          
        >
          <p className="text-[12px] md:text-lg text-center">
            
            from <b>GHS 30</b>
          </p>
        </DeliveryChoices>

        <DeliveryChoices
          handleDeliveryOption={handleDeliveryChoice}
          deliveryOption={trip_type}
          MainIcon={RiTimer2Fill}
          choiceType={{
            choice: "Next Day",
            choiceCategory: "delivery_day",
          }}
          className="animate-in zoom-in duration-150"
          recommended = {(trip_area === "Accra" || trip_area === "Kumasi") && workPeriod()  }
          disabled = {!workPeriod()}
        >
          <p className="text-[12px] md:text-lg text-center">
            
            from <strong>GHS 20</strong>
          </p>
        </DeliveryChoices>

        <DeliveryChoices
          handleDeliveryOption={handleDeliveryChoice}
          deliveryOption={trip_type}
          MainIcon={RiCalendarScheduleFill}
          choiceType={{
            choice: "Scheduled",
            choiceCategory: "delivery_day",
          }}
          className="animate-in  zoom-in duration-300"
          recommended= {trip_area === "Inter City" || !workPeriod()}
        >
          <p className="text-[12px] md:text-lg text-center">
            
            from <strong>GHS 20</strong>
          </p>
        </DeliveryChoices>
      </>
    );
}