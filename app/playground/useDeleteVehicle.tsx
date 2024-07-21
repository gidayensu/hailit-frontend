import { useDeleteVehicleMutation } from "@/lib/store/apiSlice/hailitApi";
import { useRouter } from "next/navigation";

export const useDeleteVehicle = (vehicleId:string)=> {
    
    const router = useRouter();
    const [deleteVehicle, { isSuccess, isLoading, error }] = useDeleteVehicleMutation();
    
    const handleDeleteVehicle = ()=> {
        
        deleteVehicle(vehicleId)
    }

    if(isSuccess) {
        setTimeout(()=> {
            router.push('/dashboard/users')
        }, 1000)
    }
    
    
    return { isLoading, error, isSuccess, handleDeleteVehicle }
}