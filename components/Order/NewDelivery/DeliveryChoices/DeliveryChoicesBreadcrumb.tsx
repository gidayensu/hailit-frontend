import { FaAngleRight } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useDeliveryChoice } from "../../hooks/useDeliveryChoice";

export default function DeliveryChoicesBreadcrumb () {
    
  const {handleResetChoices, trip_type, trip_medium, destination_area } = useDeliveryChoice()
  
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