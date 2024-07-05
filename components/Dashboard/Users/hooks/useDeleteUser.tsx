import { useAppDispatch } from "@/lib/store/hooks";
import { useDeleteUserMutation } from "@/lib/store/apiSlice/hailitApi";
import { setSelectedUserId } from "@/lib/store/slice/dashboardSlice";
export const useDeleteUser = (userId:string)=> {
    const dispatch = useAppDispatch();

    const [deleteUser, { isSuccess, isLoading, error }] = useDeleteUserMutation();
    
    const handleDeleteUser = ()=> {
        
        deleteUser(userId)
    }

    if(isSuccess) {
        setTimeout(()=> {
            dispatch(setSelectedUserId(''))
        }, 1000)
    }
    
    
    return { isLoading, error, isSuccess, handleDeleteUser }
}