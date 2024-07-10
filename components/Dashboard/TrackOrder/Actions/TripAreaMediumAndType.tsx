'use client'
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setTripArea, setTripType, setTripMedium } from "@/lib/store/slice/deliveryChoicesSlice";
import { ItemsSelectorNoIcons } from "@/components/Shared/ItemsSelectorNoIcons";
import { useCallback, useEffect } from "react";


type choiceType = "trip area" | "trip medium" | "trip type"

export default function TripAreaMediumAndType () {
  const dispatch = useAppDispatch();

  const handleTripChoices = useCallback((tripChoice:string, choiceType:string)=>{
      choiceType === "trip area"
        ? dispatch(setTripArea(tripChoice))
        : choiceType === "trip medium"
        ? dispatch(setTripMedium(tripChoice))
        : dispatch(setTripType(tripChoice));
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
                itemType="Accra"
                selectedItemType={trip_area}
                onClickFunc={() => {handleTripChoices("Accra", "trip area")}}
                className=" w-24"
              />
              <ItemsSelectorNoIcons
                itemType="Kumasi"
                selectedItemType={trip_area}
                onClickFunc={() => {handleTripChoices("Kumasi", "trip area")}}
                className=" w-24"
              />
              <ItemsSelectorNoIcons
                itemType="Inter City"
                selectedItemType={trip_area}
                onClickFunc={() => {handleTripChoices("Inter City", "trip area")}}
                className=" w-24"
              />
            </div>            
            <span className="text-left">
              <h3 className=" text-[14px] font-bold ">Trip Type</h3>
            </span>

            {/* TRIP TYPES SECTION */}
            <div className="flex gap-2 w-full">
              <ItemsSelectorNoIcons
                itemType="Same Day"
                selectedItemType={trip_type}
                onClickFunc={() => {handleTripChoices("Same Day", "trip type")}}
                className=" w-24"
              />
              <ItemsSelectorNoIcons
                itemType="Next Day"
                selectedItemType={trip_type}
                onClickFunc={() => {handleTripChoices("Next Day", "trip type")}}
                className=" w-24"
              />
              <ItemsSelectorNoIcons
                itemType="Scheduled"
                selectedItemType={trip_type}
                onClickFunc={() => {handleTripChoices("Scheduled", "trip type")}}
                className=" w-24"
              />
            </div>
            <span className="text-left">
              <h3 className=" text-[14px] font-bold ">Trip Medium</h3>
            </span>

            {/* TRIP MEDIUM SECTION */}
            <div className="flex gap-2 w-full">
              <ItemsSelectorNoIcons
                itemType="Car"
                selectedItemType={trip_medium}
                onClickFunc={() => {handleTripChoices("Car", "trip medium")}}
                className=" w-24"
              />
              <ItemsSelectorNoIcons
                itemType="Motor"
                selectedItemType={trip_medium}
                onClickFunc={() => {handleTripChoices("Motor", "trip medium")}}
                className=" w-24"
              />
              <ItemsSelectorNoIcons
                itemType="Truck"
                selectedItemType={trip_medium}
                onClickFunc={() => {handleTripChoices("Truck", "trip medium")}}
                className=" w-24"
              />
            </div>
 
      </div>
    )
}