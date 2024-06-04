'use client'

import { AiFillCar } from "react-icons/ai"
import { FaMotorcycle } from "react-icons/fa"
import { FiCheck } from "react-icons/fi"
import { RiCaravanFill } from "react-icons/ri"
import { DeliveryChoices } from "./DeliveryChoice"

import { useDeliveryChoice } from "../hooks/useDeliveryChoice"

export default function DeliveryMediumChoice () {
    
    const {trip_medium, handleDeliveryChoice} = useDeliveryChoice("trip_medium");

    return(
        <>
        <DeliveryChoices
                handleDeliveryOption={handleDeliveryChoice}
                deliveryOption={trip_medium}
                CheckIcon={FiCheck}
                MainIcon={RiCaravanFill}
                elementOption="Truck"
              >
                <p className="text-sm md:text-md text-center">Large package</p>
              </DeliveryChoices>
               
              <DeliveryChoices
                handleDeliveryOption={handleDeliveryChoice}
                deliveryOption={trip_medium}
                CheckIcon={FiCheck}
                MainIcon={AiFillCar}
                elementOption="Car"
              >
                <p className="text-sm md:text-md text-center">Big package</p>
              </DeliveryChoices>
              <DeliveryChoices
                handleDeliveryOption={handleDeliveryChoice}
                deliveryOption={trip_medium}
                CheckIcon={FiCheck}
                MainIcon={FaMotorcycle}
                elementOption="Motor"
              >
                <p className="text-sm md:text-md text-center">Medium package</p>
              </DeliveryChoices>
        </>
    )
}