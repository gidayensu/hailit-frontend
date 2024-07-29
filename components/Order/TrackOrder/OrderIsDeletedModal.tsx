import SecondaryModal from "@/components/Shared/SecondaryModal";
import { useOrderIsDeleted } from "./hooks/useOrderIsDeleted";

export default function OrderIsDeleted ({tripId}:{tripId:string}) {
    const {orderIsDeletedRef, closeIsDeletedModal} = useOrderIsDeleted({tripId})
    return (
        <SecondaryModal closeModal={closeIsDeletedModal} modalRef={orderIsDeletedRef} info = {
      
            <p className="mt-2 text-sm">
            Order has been  <b className="text-red-500 ">deleted!</b>
            </p>
            
            
          } note = {true}/>
    )
}