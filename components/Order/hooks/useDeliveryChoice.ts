
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { setTripArea, setTripType, setTripMedium, resetDeliveryChoices, setScheduled } from "@/lib/store/slice/deliveryChoicesSlice"
import { TripArea, TripMedium, TripType } from "../types/Types"

interface ChoiceCategory {
    choiceCategory: "trip_area" | "trip_medium" | "delivery_day"
}

interface TripMediumChoice extends ChoiceCategory {
    choiceCategory: "trip_medium"
    choice: TripMedium
}

interface TripAreaChoice extends ChoiceCategory {
    choiceCategory: "trip_area"
    choice: TripArea
}


interface TripTypeChoice extends ChoiceCategory {
    choiceCategory: "delivery_day"
    choice: TripType
}

export type ChoiceType = TripTypeChoice | TripMediumChoice | TripAreaChoice

export const useDeliveryChoice = () => {
    const {trip_area, scheduled, trip_medium, trip_type} = useAppSelector(state=>state.deliveryChoices)
    
    const dispatch = useAppDispatch();

    const handleDeliveryChoice = (choiceType:ChoiceType )=> {
        const choiceCategory = choiceType.choiceCategory
        choiceCategory === "trip_area" ? 
        dispatch(setTripArea(choiceType.choice)) :
        choiceCategory === "trip_medium" ?
        dispatch(setTripMedium(choiceType.choice)) :
        ''
        if (choiceCategory === "delivery_day") {
            choiceType.choice === "Scheduled" ? dispatch(setScheduled(true)) && dispatch(setTripType(choiceType.choice)): dispatch(setTripType(choiceType.choice))
        }
    }

    const handleResetChoices = ()=> {
        dispatch(resetDeliveryChoices())
      }

    return {trip_area, scheduled, trip_medium, trip_type, handleDeliveryChoice, handleResetChoices}
    
}