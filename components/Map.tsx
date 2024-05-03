
import { useState, useEffect } from 'react'
import { Map, Marker } from 'pigeon-maps'
import { Input } from './ui/input'


export default function MyMap() {
  const [userLocation, setUserLocation] = useState([5.5592846 , -0.1074306])
  useEffect(()=> {
    navigator.geolocation.getCurrentPosition(({ coords })=> {
      const {latitude, longitude} = coords;
      console.log('user latitude:', latitude, 'user longitude:', longitude)
      setUserLocation([latitude,longitude]);
      
    })  
  }, [])
  const [selectedLocation, setSelectedLocation] = useState(userLocation)
  const [zoom, setZoom] = useState(11);
  const [hue, setHue] = useState(0)
  const color = `hsl(${hue % 360}deg 39% 70%)`;
  
  
  
  return (
    <div className='flex justify-center'>
    <Input className='flex items-center justify-center absolute h-10 sm:h-12 w-60 text-center bg-white z-50 mt-5 shadow-lg rounded-full' placeholder='Search your location'/>
      
    <div className='relative w-full h-full'>
    <Map 
    onClick={({event, latLng, pixel})=>{
          console.log('event:', event, 'latLng:', latLng, 'pixel:', pixel)
        
        setSelectedLocation(latLng)
         
    }}  
    height={1000}
      center={selectedLocation} 
      zoom={zoom} 
      onBoundsChanged={({ center, zoom }) => { 
        
        setZoom(zoom) 
      }} 
      
    >

<Marker 
        width={50}
        anchor={selectedLocation}
        color={color} 
        onClick={() => setHue(hue + 20)} 
      />

        </Map>
        </div>
        </div>
  )
}