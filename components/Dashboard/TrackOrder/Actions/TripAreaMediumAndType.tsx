'use client'
import { TripArea, TripMedium, TripType } from "@/components/Order/types/Types";
import { ItemsSelectorNoIcons } from "@/components/Shared/ItemsSelectorNoIcons";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setTripArea, setTripMedium, setTripType } from "@/lib/store/slice/deliveryChoicesSlice";
import { useCallback } from "react";




interface ChoiceType {
  choiceType: "trip area" | "trip medium" | "trip type"
}

interface TripMediumChoice extends ChoiceType {
  choiceType: "trip medium"
  userChoice: TripMedium
}

interface TripTypeChoice extends ChoiceType {
  choiceType: "trip type"
  userChoice: TripType
}

interface TripAreaChoice extends ChoiceType {
  choiceType: "trip area"
  userChoice: TripArea
}

type Choice = TripMediumChoice | TripTypeChoice |  TripAreaChoice

export default function TripAreaMediumAndType () {
  const dispatch = useAppDispatch();

 

  const handleTripChoices = useCallback((choice:Choice)=>{
      const choiceType = choice.choiceType;
      choiceType === "trip area" 
      ? dispatch(setTripArea(choice.userChoice)) 
      : choiceType === "trip medium" 
      ? dispatch(setTripMedium(choice.userChoice)) :
      choiceType === "trip type" 
      ? dispatch(setTripType(choice.userChoice)) 
      : ''

  }, [dispatch])

    const {trip_area, trip_type, trip_medium} = useAppSelector(state=>state.deliveryChoices)
    
    return (
      <div className="flex flex-col gap-3">
      <span className="text-left">
              <h3 className=" text-[14px] font-bold ">Trip Area</h3>
            </span>
            {/* TRIP AREA SECTION */}
            <div className="flex gap-2 w-full">
              <ItemsSelectorNoIcons
                item="Accra"
                selectedItem={trip_area}
                setSelectedItem={() => {handleTripChoices({choiceType: "trip area", userChoice: "Accra"})}}
                className=" w-24"
              />
              <ItemsSelectorNoIcons
                item="Kumasi"
                selectedItem={trip_area}
                setSelectedItem={() => {handleTripChoices({choiceType: "trip area", userChoice: "Kumasi"})}}
                className=" w-24"
              />
              <ItemsSelectorNoIcons
                item="Inter City"
                selectedItem={trip_area}
                setSelectedItem={() => {handleTripChoices({choiceType: "trip area", userChoice: "Inter City"})}}
                className=" w-24"
              />
            </div>            
            <span className="text-left">
              <h3 className=" text-[14px] font-bold ">Trip Type</h3>
            </span>

            {/* TRIP TYPES SECTION */}
            <div className="flex gap-2 w-full">
              <ItemsSelectorNoIcons
                item="Same Day"
                selectedItem={trip_type}
                setSelectedItem={() => {handleTripChoices({choiceType: "trip type", userChoice: "Same Day"})}}
                className=" w-24"
              />
              <ItemsSelectorNoIcons
                item="Next Day"
                selectedItem={trip_type}
                setSelectedItem={() => {handleTripChoices({choiceType: "trip type", userChoice: "Next Day"})}}
                className=" w-24"
              />
              <ItemsSelectorNoIcons
                item="Scheduled"
                selectedItem={trip_type}
                setSelectedItem={() => {handleTripChoices({choiceType: "trip type", userChoice: "Scheduled"})}}
                className=" w-24"
              />
            </div>
            <span className="text-left">
              <h3 className=" text-[14px] font-bold ">Trip Medium</h3>
            </span>

            {/* TRIP MEDIUM SECTION */}
            <div className="flex gap-2 w-full">
              <ItemsSelectorNoIcons
                item="Car"
                selectedItem={trip_medium}
                setSelectedItem={() => {handleTripChoices({choiceType: "trip medium", userChoice: "Car"})}}
                className=" w-24"
              />
              <ItemsSelectorNoIcons
                item="Motor"
                selectedItem={trip_medium}
                setSelectedItem={() => {handleTripChoices({choiceType: "trip medium", userChoice: "Motor"})}}
                className=" w-24"
              />
              <ItemsSelectorNoIcons
                item="Truck"
                selectedItem={trip_medium}
                setSelectedItem={() => {handleTripChoices({choiceType: "trip medium", userChoice: "Truck"})}}
                className=" w-24"
              />
            </div>
 
      </div>
    )
}