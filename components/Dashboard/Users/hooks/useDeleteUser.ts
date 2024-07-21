import { useDeleteUserMutation } from "@/lib/store/apiSlice/hailitApi";
import { useRouter } from "next/navigation";

export const useDeleteUser = (userId:string)=> {
    
    const router = useRouter();
    const [deleteUser, { isSuccess, isLoading, error }] = useDeleteUserMutation();
    
    const handleDeleteUser = ()=> {
        
        deleteUser(userId)
    }

    if(isSuccess) {
        setTimeout(()=> {
            router.push('/dashboard/users')
        }, 1000)
    }
    
    
    return { isLoading, error, isSuccess, handleDeleteUser }
}