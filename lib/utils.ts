import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

let debounceTimeout: NodeJS.Timeout | null = null;

export async function fetchMapData(
  searchQuery: string
): Promise<GeoData | null> {
  const url = `https://nominatim.openstreetmap.org/search.php?street=${searchQuery}&country=Ghana&format=jsonv2`;

  // Debounce logic
  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
  }

  return new Promise((resolve) => {
    debounceTimeout = setTimeout(async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error fetching map data: ${response.status}`);
        }

        const results = await response.json();
        const returnedResults = results.filter(
          (result: any) => result.display_name !== "Ghana"
        );

        resolve(returnedResults);
      } catch (error) {
        console.error("Error fetching map data:", error);
        resolve(null);
      }
    }, 500); 
  });
}


export async function reverseMapSearch(
  lat: string | number,
  lon: string | number
): Promise<GeoData | null> {
  const url = `https://nominatim.openstreetmap.org/reverse.php?lat=${lat}&lon=${lon}&zoom=18&format=jsonv2`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw Error;
    }

    const data = await response.json();

    return {
      latitude: data.lat,
      longitude: data.lon,
      displayName: data.display_name,
    };
  } catch (err) {
    console.error(err);
    return null;
  }
}

interface GeoData {
  latitude: number;
  longitude: number;
  displayName: string;
}


export const extractTimeFromDate = (dateString:string | any)=> {
  if (dateString === null) {
    return null
  }
const date = new Date(dateString)
return date.toLocaleTimeString();

}

export const checkTimeOfDay = () => {
  const currentHour = new Date().getHours();


  const morningStart = 0;   
  const morningEnd = 11;    
   

  if (currentHour >= morningStart && currentHour <= morningEnd) {
    return "morning";
  }  else {
    return "evening"; 
  }
};





export function extractShortDate(date:string | null | Date) {
  if (date === null) {
    return null
  }
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("en-GB"); 
}

export const extractDateWithDayFromDate = (dateString:string | null | Date)=> {
  if (dateString === null) {
    return null
  }
  const date = new Date(dateString)
  return date.toDateString();
}

export const copyToClipBoard = (element:string)=> {
  navigator.clipboard.writeText(element);
}

export function getSpecificName(str:string) {
  if(str && typeof str==='string') {
      
      const parts = str.split(",");
      return parts.slice(0, 3).join(",");
  }
  // if (parts.length < 3) {
  //   return ""; // Return empty string if not enough commas
  // }
  return str
}

export const scrollToSection = (sectionRef:React.RefObject<any>) => {
  if (sectionRef.current) {
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
  }
};


export function splitLocationData(item:string) {
  let parts = item.split(", ");
  return [parts[0] + ", " + parts[1], parts[parts.length - 1]];
}

export function extractBeforeComma(text:string) {
  return text.split(", ", 1)[0];
}

export const reversePercentageDifference = (percentageDifference:number)=> {
  
   percentageDifference < 1 ? percentageDifference = Math.abs(percentageDifference): percentageDifference = -percentageDifference;
   
   return percentageDifference
}