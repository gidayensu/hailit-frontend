'use client'
import { useAppSelector } from "@/lib/store/hooks";
import { AllDrivers } from "./AllDrivers";
import DispatcherDetails from "./DispatcherDetails";

export default function AllDriversSection () {
    
    const {selectedDriverId} = useAppSelector((state)=>state.dashboard)
    
        console.log({selectedDriverId})
        return (
            <>
            {!selectedDriverId &&
            <AllDrivers />
            }
            {selectedDriverId &&
            <DispatcherDetails userRole="Driver"   />}
            </>
        )
}