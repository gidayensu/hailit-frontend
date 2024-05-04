import Link from "next/link";
import { useState, useEffect } from "react";
import { Map, Marker } from "pigeon-maps";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FaMapPin } from "react-icons/fa";
import { fetchMapData, reverseMapSearch } from "@/lib/utils";

type UserLocation = [number, number] | null;
type UserLocationName = any;
export default function MyMap() {
  const [userLocation, setUserLocation] = useState<UserLocation>(null); // Initialize as null
  const [userLocationName, setUserLocationName] = useState<UserLocationName>(null);

  const locationNameData = async (latitude:string|number, longitude:string|number)=>{
    const locationData = await reverseMapSearch(latitude, longitude);
    const locationName = locationData?.displayName;
    return locationName
}



const windowHeight = window.innerHeight;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;
        setUserLocation([latitude, longitude]); 
        
        setUserLocationName(locationNameData(latitude, longitude))
      },
      (error) => {
        console.error("Error getting location:", error.message);
        
      }
    );
  }, []); // Empty dependency array to run only once on component mount

  useEffect(() => {
    if (userLocation) {
      setSelectedLocation(userLocation);
      
      
    }
  }, [userLocation]); 
  

  
  const [selectedLocation, setSelectedLocation] = useState(userLocation);
  const [selectedLocationName, setSelectedLocationName] = useState(userLocationName);
  
  useEffect(()=> {
    if(selectedLocation){
    setSelectedLocationName(locationNameData(selectedLocation[0], selectedLocation[1]))}
  }, [selectedLocation] )
  
  
  const [zoom, setZoom] = useState(18);
  

  const mapDataHandler = (searchQuery:any)=> {
    fetchMapData(searchQuery.target.value)
  }
  
  const selectedLocationHandler = (selectedLocation:UserLocation)=> {
    //push this to store or state
  }

  return (
    <div className="flex justify-center">
      <Input
        className="flex items-center justify-center absolute h-10 sm:h-12 w-60 text-center bg-white z-50 mt-5 shadow-lg rounded-full"
        placeholder="Search your location"
        onChange={()=>mapDataHandler(event)}
      />

      <div className="relative w-full h-full">
        {userLocation && selectedLocation && ( 
          <>
          <Map
            onClick={({ event, latLng, pixel }) => {
              // console.log("event:", event, "latLng:", latLng, "pixel:", pixel);
              setSelectedLocation(latLng);
            }}
            
            height={windowHeight}
            center={selectedLocation}
            minZoom={1}
            maxZoom={18}
            zoom={zoom}
            animate={true}
            
            onBoundsChanged={({ center, zoom }) => {
              setSelectedLocation(center)
              setZoom(zoom);
            }}
          >
          {/* <Marker
          anchor={selectedLocation}
           >
          
            
              <FaMapPin className="text-3xl text-red-800 animate-bounce relative"/>
            
          
          
          
        </Marker>   */}
          </Map>
          <Marker
          anchor={selectedLocation}
           >
          <div className="flex flex-col items-center justify-center gap-2 fixed top-0 right-0 left-0 bottom-0">
            <div className="absolute flex items-center justify-center h-auto w-44 bg-white shadow-md text-center text-[10px] mb-32 rounded-lg p-2">
              <p className="text-slate-800 text-[10px] font-bold line-clamp-3 ">{ selectedLocationName || 'Name could not be loaded'}</p>
              <Link href={'/'}> <Button onClick={()=>selectedLocationHandler(selectedLocation)}>Use this location</Button> </Link>
            </div>
          <FaMapPin className="text-3xl text-slate-800 animate-bounce relative mb-8"/>
          </div>
          
        </Marker>
        </>
        )}
      </div>
    </div>
  );
}
