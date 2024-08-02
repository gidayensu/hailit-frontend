import TripMap from "@/components/Maps/TripMap";
import Container from "@/components/ui/container";
export default function MapSection (){
    return (
        <Container className="h-80 rounded-xl w-full content-normal  overflow-hidden flex flex-col items-center justify-center border border-slate-200 dark:border-opacity-20">
            <div className="flex flex-col  w-full  rounded-lg  p-3">
        <p className="font-bold">TRIP MAP LOCATIONS</p>
        <p className="text-[12px] "><b className="text-amber-500">Pickup</b> and <b className="text-green-500">Drop off</b></p>
        
        

            </div>
        
        <TripMap/>
        </Container>
)
}