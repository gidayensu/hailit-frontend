
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { setTripArea, setTripType, setTripMedium, resetDeliveryChoices, setScheduled } from "@/lib/store/slice/deliveryChoicesSlice"


type ChoiceType = "trip_area" | "trip_medium" | "delivery_day"

export const useDeliveryChoice = (choiceType?:ChoiceType) => {
    const {trip_area, scheduled, trip_medium, trip_type} = useAppSelector(state=>state.deliveryChoices)
    console.log({scheduled})
    const dispatch = useAppDispatch();

    const handleDeliveryChoice = (choice:string)=> {

        choiceType === "trip_area" ? 
        dispatch(setTripArea(choice)) :
        choiceType === "trip_medium" ?
        dispatch(setTripMedium(choice)) :
        ''
        if (choiceType === "delivery_day") {
            choice === "Schedule" ? dispatch(setScheduled(true)) && dispatch(setTripType(choice)): dispatch(setTripType(choice))

        }
        
    }

    const handleResetChoices = ()=> {
        dispatch(resetDeliveryChoices())
      }

    return {trip_area, scheduled, trip_medium, trip_type, handleDeliveryChoice, handleResetChoices}
    
}