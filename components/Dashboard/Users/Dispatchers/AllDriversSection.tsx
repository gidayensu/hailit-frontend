'use client'
import { useAppSelector } from "@/lib/store/hooks";
import { AllDrivers } from "./AllDriversTable";
import DispatcherDetails from "./DispatcherDetails";

export default function AllDriversSection () {
    
    const {selectedDriverId} = useAppSelector((state)=>state.dashboard)
    
        
        return (
            <>
            {!selectedDriverId &&
            <AllDrivers />
            }
            {selectedDriverId &&
            <DispatcherDetails />}
            </>
        )
}