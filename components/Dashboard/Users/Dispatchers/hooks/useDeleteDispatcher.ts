import { useDeleteDriverMutation, useDeleteRiderMutation } from "@/lib/store/apiSlice/hailitApi";
import { useRouter } from "next/navigation";
import { DispatcherRole } from "./useDispatcherProfile";
export const useDeleteDispatcher = ({dispatcherId, dispatcherRole}:{dispatcherId:string, dispatcherRole: DispatcherRole})=> {
    
    const router = useRouter();
    const [deleteDriver, { isSuccess:driverDeleteSuccess, isLoading: driverDeleteLoading, error:driverDeleteError }] = useDeleteDriverMutation();
    const [deleteRider, { isSuccess:riderDeleteSuccess, isLoading: riderDeleteLoading, error: riderDeleteError }] = useDeleteRiderMutation();
    

    const deleteSuccess = riderDeleteSuccess || driverDeleteSuccess;
    const deleteLoading = riderDeleteLoading || driverDeleteLoading;
    const deleteError = riderDeleteError || driverDeleteError;

    const handleDeleteDispatcher = ()=> {
      dispatcherRole === "Rider"
        ? deleteRider(dispatcherId)
        : deleteDriver(dispatcherId);
    }   
    

    if (riderDeleteSuccess || driverDeleteSuccess) {
        setTimeout(() => {
            const urlEndpoint = `${dispatcherRole.toLowerCase()}s`
            router.push(`/dashboard/dispatchers/${urlEndpoint}`) 
            
        }, 1000);
    }
    
    
    
    return { deleteError, deleteSuccess,  deleteLoading, handleDeleteDispatcher }
}