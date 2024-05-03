import { useState, useEffect } from "react";
import { Map, Marker, } from "pigeon-maps";
import { Input } from "./ui/input";
import { FaMapPin } from "react-icons/fa";
import { fetchMapData, reverseMapSearch } from "@/lib/utils";
import { map } from "zod";

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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;
        setUserLocation([latitude, longitude]); // Update state with actual location
        // setUserLocationName( reverseMapSearch(latitude, longitude))
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
  }, [userLocation]); // Update only when userLocation changes
  

  
  const [selectedLocation, setSelectedLocation] = useState(userLocation);
  const [selectedLocationName, setSelectedLocationName] = useState(userLocationName);
  
  useEffect(()=> {
    if(selectedLocation){
    setSelectedLocationName(locationNameData(selectedLocation[0], selectedLocation[1]))}
  }, [selectedLocation] )
  
  const [zoom, setZoom] = useState(17);
  const [hue, setHue] = useState(0);
  const color = `hsl(${hue % 360}deg 39% 70%)`;

  const mapDataHandler = (searchQuery:any)=> {
    fetchMapData(searchQuery.target.value)
  }
  return (
    <div className="flex justify-center">
      <Input
        className="flex items-center justify-center absolute h-10 sm:h-12 w-60 text-center bg-white z-50 mt-5 shadow-lg rounded-full"
        placeholder="Search your location"
        onChange={()=>mapDataHandler(event)}
      />

      <div className="relative w-full h-full">
        {userLocation && selectedLocation && ( // Render map only if userLocation is defined
          <Map
            onClick={({ event, latLng, pixel }) => {
              // console.log("event:", event, "latLng:", latLng, "pixel:", pixel);
              setSelectedLocation(latLng);
            }}
            height={1000}
            center={selectedLocation}
            zoom={zoom}
            onBoundsChanged={({ center, zoom }) => {
              setZoom(zoom);
            }}
          >
            <Marker
              // width={50}
              anchor={selectedLocation}
              color={color}
              onClick={() => setHue(hue + 20)}
            >
              <div className="flex flex-col items-center justify-center gap-2 relative">
                <div className="absolute flex items-center justify-center h-auto w-44 bg-white shadow-md text-center text-[10px] mb-32 rounded-lg p-2">
                  <p className="text-slate-800 text-sm font-bold line-clamp-3">{selectedLocationName}</p>
                </div>
              <FaMapPin className="text-3xl text-slate-800 relative"/>
              </div>
              
            </Marker>
          </Map>
        )}
      </div>
    </div>
  );
}
