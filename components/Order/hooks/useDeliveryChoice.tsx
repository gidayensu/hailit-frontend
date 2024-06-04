
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { setDestinationCity, setDeliveryDay, setDeliveryMedium, resetDeliveryChoices } from "@/lib/store/slice/deliveryChoicesSlice"


type ChoiceType = "destination_area" | "trip_medium" | "delivery_day"

export const useDeliveryChoice = (choiceType?:ChoiceType) => {
    const {destination_area, scheduled, trip_medium, trip_type} = useAppSelector(state=>state.deliveryChoices)
    const dispatch = useAppDispatch();

    const handleDeliveryChoice = (choice:string)=> {
        choiceType === "destination_area" ? 
        dispatch(setDestinationCity(choice)) :
        choiceType === "trip_medium" ?
        dispatch(setDeliveryMedium(choice)) :
        choiceType === "delivery_day" ?
        dispatch(setDeliveryDay(choice)) :
        ''
        
    }

    const handleResetChoices = ()=> {
        dispatch(resetDeliveryChoices())
      }

    return {destination_area, scheduled, trip_medium, trip_type, handleDeliveryChoice, handleResetChoices}
    
}