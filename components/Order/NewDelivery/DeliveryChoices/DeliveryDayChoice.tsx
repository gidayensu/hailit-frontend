'use client'
import { FiCheck } from "react-icons/fi"
import { RiCalendarScheduleFill, RiTimer2Fill, RiTimerFlashFill } from "react-icons/ri"
import { DeliveryChoices } from "./DeliveryChoice"

import { useDeliveryChoice } from "../../hooks/useDeliveryChoice"

export default function   DeliveryDayChoice () {
    const {trip_type, handleDeliveryChoice} = useDeliveryChoice("delivery_day")

    return(
        <>
        <DeliveryChoices
                handleDeliveryOption={handleDeliveryChoice}
                deliveryOption={trip_type}
                
                MainIcon={RiTimerFlashFill}
                elementOption="Same Day"
                className="animate-in  zoom-in duration-50"
              >
                <p className="text-[12px] md:text-lg text-center"> from <b>GHS 30</b></p>
              </DeliveryChoices>
                
              <DeliveryChoices
                handleDeliveryOption={handleDeliveryChoice}
                deliveryOption={trip_type}
                
                MainIcon={RiTimer2Fill}
                elementOption="Next Day"
                className="animate-in zoom-in duration-150"
              >
                <p className="text-[12px] md:text-lg text-center"> from <strong>GHS 20</strong>  </p>
              </DeliveryChoices>
                
                
              <DeliveryChoices
                handleDeliveryOption={handleDeliveryChoice}
                deliveryOption={trip_type}
                
                MainIcon={RiCalendarScheduleFill}
                elementOption="Scheduled"
                className="animate-in  zoom-in duration-300"
              >
                <p className="text-[12px] md:text-lg text-center">  from <strong>GHS 20</strong></p>
              </DeliveryChoices>
        </>
    )
}