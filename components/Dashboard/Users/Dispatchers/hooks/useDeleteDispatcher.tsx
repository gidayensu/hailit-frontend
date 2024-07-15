import { useDeleteDriverMutation, useDeleteRiderMutation } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch } from "@/lib/store/hooks";
import { setSelectedDriverId, setSelectedRiderId } from "@/lib/store/slice/dashboardSlice";

export const useDeleteDispatcher = ({dispatcherId, userRole}:{dispatcherId:string, userRole: "Driver" | "Rider"})=> {
    const dispatch = useAppDispatch();

    const [deleteDriver, { isSuccess:driverDeleteSuccess, isLoading: driverDeleteLoading, error:driverDeleteError }] = useDeleteDriverMutation();
    const [deleteRider, { isSuccess:riderDeleteSuccess, isLoading: riderDeleteLoading, error: riderDeleteError }] = useDeleteRiderMutation();
    

    const deleteSuccess = riderDeleteSuccess || driverDeleteSuccess;
    const deleteLoading = riderDeleteLoading || driverDeleteLoading;
    const deleteError = riderDeleteError || driverDeleteError;

    const handleDeleteDispatcher = ()=> {
        userRole === "Driver" 
        ? deleteDriver(dispatcherId)
        : deleteRider(dispatcherId)
    }   
    

    if (riderDeleteSuccess || driverDeleteSuccess) {
        setTimeout(() => {
            if (riderDeleteSuccess) {
                dispatch(setSelectedRiderId(''))
            }
            if (driverDeleteSuccess) {
                dispatch(setSelectedDriverId(''))
            }
        }, 1000);
    }
    
    
    
    return { deleteError, deleteSuccess,  deleteLoading, handleDeleteDispatcher }
}