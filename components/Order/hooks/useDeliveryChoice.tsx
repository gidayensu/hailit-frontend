
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { setDestinationArea, setDeliveryDay, setDeliveryMedium, resetDeliveryChoices, setScheduled } from "@/lib/store/slice/deliveryChoicesSlice"


type ChoiceType = "trip_area" | "trip_medium" | "delivery_day"

export const useDeliveryChoice = (choiceType?:ChoiceType) => {
    const {trip_area, scheduled, trip_medium, trip_type} = useAppSelector(state=>state.deliveryChoices)
    console.log({scheduled})
    const dispatch = useAppDispatch();

    const handleDeliveryChoice = (choice:string)=> {

        choiceType === "trip_area" ? 
        dispatch(setDestinationArea(choice)) :
        choiceType === "trip_medium" ?
        dispatch(setDeliveryMedium(choice)) :
        ''
        if (choiceType === "delivery_day") {
            choice === "Schedule" ? dispatch(setScheduled(true)) && dispatch(setDeliveryDay(choice)): dispatch(setDeliveryDay(choice))

        }
        
    }

    const handleResetChoices = ()=> {
        dispatch(resetDeliveryChoices())
      }

    return {trip_area, scheduled, trip_medium, trip_type, handleDeliveryChoice, handleResetChoices}
    
}