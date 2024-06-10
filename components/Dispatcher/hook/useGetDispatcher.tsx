import { useAppSelector } from "@/lib/store/hooks"
import { useGetUserTrips } from "@/components/Order/hooks/useGetUserTrips"



export const useGetDispatcher = ()=> {
    const { email, first_name, last_name, user_role } = useAppSelector(state=>state.user)    
    const { trips, currentTrips } = useGetUserTrips();
    

    return {email, first_name, last_name,trips, currentTrips, user_role}
}