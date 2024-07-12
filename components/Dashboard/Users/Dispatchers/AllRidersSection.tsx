'use client'
import { useAppSelector } from "@/lib/store/hooks";
import { AllRiders } from "./AllRidersTable";
import DispatcherDetails from "./DispatcherDetails";

export default function AllRidersSection () {
    
    const {selectedRiderId} = useAppSelector((state)=>state.dashboard)
    
    
        return (
            <>
            {!selectedRiderId &&
            <AllRiders />
            }
            {selectedRiderId &&
            <DispatcherDetails   userRole="Rider"/>}
            </>
        )
}