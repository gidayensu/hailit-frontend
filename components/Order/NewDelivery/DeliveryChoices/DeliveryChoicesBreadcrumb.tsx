import { GoDotFill } from "react-icons/go";
import { MdDeleteForever } from "react-icons/md";
import { useDeliveryChoice } from "../../hooks/useDeliveryChoice";

export default function DeliveryChoicesBreadcrumb() {
  const { handleResetChoices, trip_type, trip_medium, trip_area } =
    useDeliveryChoice();

    
  return (
    <section className="w-full flex gap-2 items-center justify-start text-secondary-shade truncate">
      
      <ChoiceContainer choice={trip_area} />
      <ChoiceContainer choice={trip_type} showDot={true}/>
      <ChoiceContainer choice={trip_medium} showDot={true}/>
      
      <span onClick={handleResetChoices} className="cursor-pointer">
        <MdDeleteForever className="text-rose-500 text-3xl" />
      </span>
    </section>
  );
}


function ChoiceContainer ({choice, showDot}:{choice:string, showDot?:boolean}) {
  const containerClass = "flex items-center justify-center gap-2 w-1/3 h-8 border-2 border-secondary-color rounded-md text-[12px] font-medium  text-secondary-shade p-1" 
  return (
    <>
     {choice && (
        <>
          {showDot && <GoDotFill className="text-[15px]" />}
          <div className={containerClass}>
            <p>{choice.toUpperCase()}</p>
          </div>
        </>
      )}
    </>
  )
}