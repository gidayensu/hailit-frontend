'use client'
import { RiCalendarScheduleFill, RiTimer2Fill, RiTimerFlashFill } from "react-icons/ri"
import { DeliveryChoices } from "./DeliveryChoice"

import { useDeliveryChoice } from "../../hooks/useDeliveryChoice"

export default function   DeliveryDayChoice () {
    const {trip_type, trip_area, handleDeliveryChoice} = useDeliveryChoice()

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
          disabled={trip_area === "Inter City"}
          
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
          recommended = {trip_area === "Accra" || trip_area === "Kumasi" }
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
          recommended= {trip_area === "Inter City"}
        >
          <p className="text-[12px] md:text-lg text-center">
            
            from <strong>GHS 20</strong>
          </p>
        </DeliveryChoices>
      </>
    );
}