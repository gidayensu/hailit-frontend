import { FaAngleRight } from "react-icons/fa";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { resetDeliveryChoices } from "@/lib/store/slice/deliveryChoicesSlice";
import { MdDeleteForever } from "react-icons/md";

export default function DeliveryChoicesBreadcrumb () {
  const dispatch = useAppDispatch();
  const handleResetChoices = ()=> {
    dispatch(resetDeliveryChoices())
  }
  const {trip_type, trip_medium, destination_area} = useAppSelector(state=>state.deliveryChoices)
    return(
        <section className="w-full flex gap-2 items-center justify-start text-secondary-shade">
          {
            destination_area &&
                <div className="flex items-center justify-center gap-2 w-1/3 h-8 border-2 border-secondary-color rounded-md text-[12px] font-medium  text-secondary-shade">
                  
                  <p>{destination_area.toUpperCase()}</p>
                  
                </div>
          }
          {
            trip_type && 
            <>
                <FaAngleRight className="text-[15px]"/>    
                <div className="flex items-center justify-center gap-2 w-1/3 h-8 border-2 border-secondary-color rounded-md text-[12px] font-medium  text-secondary-shade">
                  
                  <p>{trip_type.toUpperCase()}</p>
                  
                </div>
            </>
          }

          {
            trip_medium && <>
            
                <FaAngleRight className="text-[15px]"/>    
                <div className="flex items-center justify-center gap-2 w-1/3 h-8 border-2 border-secondary-color rounded-md text-[12px] font-medium  text-secondary-shade">
                  
                  <p>{trip_medium.toUpperCase()}</p>
                  
                </div>
            </>
          }
          <span onClick={handleResetChoices} className="cursor-pointer">

      <MdDeleteForever className="text-rose-500 text-3xl"/>
          </span>
              </section>
              
    )
}