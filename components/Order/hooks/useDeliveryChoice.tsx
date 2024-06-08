
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { setDestinationCity, setDeliveryDay, setDeliveryMedium, resetDeliveryChoices, setScheduled } from "@/lib/store/slice/deliveryChoicesSlice"


type ChoiceType = "destination_area" | "trip_medium" | "delivery_day"

export const useDeliveryChoice = (choiceType?:ChoiceType) => {
    const {destination_area, scheduled, trip_medium, trip_type} = useAppSelector(state=>state.deliveryChoices)
    console.log({scheduled})
    const dispatch = useAppDispatch();

    const handleDeliveryChoice = (choice:string)=> {
        console.log({choice})
        choiceType === "destination_area" ? 
        dispatch(setDestinationCity(choice)) :
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

    return {destination_area, scheduled, trip_medium, trip_type, handleDeliveryChoice, handleResetChoices}
    
}