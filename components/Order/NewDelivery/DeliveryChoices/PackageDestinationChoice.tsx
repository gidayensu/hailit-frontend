"use client";

import { BsFillPinMapFill } from "react-icons/bs";
import { DeliveryChoices } from "./DeliveryChoice";

import { FiCheck } from "react-icons/fi";
import { RiMapPinRangeLine, RiTreasureMapFill } from "react-icons/ri";
import { useDeliveryChoice } from "../../hooks/useDeliveryChoice";

export default function PackageDestinationChoice() {
  const { trip_area, trip_medium, trip_type, handleDeliveryChoice } =
    useDeliveryChoice();
    
  return (
    <>
      <DeliveryChoices
        handleDeliveryOption={handleDeliveryChoice}
        deliveryOption={trip_area}
        
        MainIcon={BsFillPinMapFill}
        choiceType={{
          choice: "Accra",
          choiceCategory: "trip_area"
       }}
      >
        <p className="text-sm md:text-md text-center">Accra or Tema suburb</p>
      </DeliveryChoices>

      <div className="w-full md:w-2/3 flex gap-3">
        <DeliveryChoices
          handleDeliveryOption={handleDeliveryChoice}
          deliveryOption={trip_area}
          
          MainIcon={RiMapPinRangeLine}
          choiceType={{
            choice: "Kumasi",
            choiceCategory: "trip_area"
         }}
        >
          <p className="text-sm md:text-md text-center">Abuakwa, Ejisu, etc</p>
        </DeliveryChoices>

        <DeliveryChoices
          handleDeliveryOption={handleDeliveryChoice}
          deliveryOption={trip_area}
          
          MainIcon={RiTreasureMapFill}
          choiceType={{
            choice: "Inter City",
            choiceCategory: "trip_area"
         }}
         disabled= {trip_medium === "Motor" || trip_type === "Same Day"}
        >
          <p className="text-sm md:text-md text-center">Accra - Kumasi</p>
        </DeliveryChoices>
      </div>
    </>
  );
}
