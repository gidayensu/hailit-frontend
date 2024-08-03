import { useDeleteVehicleMutation } from "@/lib/store/apiSlice/hailitApi";
import { useRouter } from "next/navigation";

export const useDeleteVehicle = ()=> {
    
    
    const router = useRouter();
    const [deleteVehicle, { isSuccess, isLoading, error }] = useDeleteVehicleMutation();
    
    const handleDeleteVehicle = (vehicle_id: string)=> {
        
        deleteVehicle(vehicle_id)
    }

    if(isSuccess) {
        setTimeout(()=> {
            router.push('/dashboard/users')
        }, 1000)
    }
    
    
    return { isLoading, error, isSuccess, handleDeleteVehicle,  }
}