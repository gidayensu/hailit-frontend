'use client'
import { useLazySearchTripsQuery } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch } from "@/lib/store/hooks";
import { setActiveSection } from "@/lib/store/slice/dashboardSlice";
import { Trip } from "@/lib/store/slice/tripSlice";
import { useCallback, useRef, useState } from "react";

import { useRouter } from "next/navigation";

export const useGetSearchResults = () => {
    const [openSearchContainer, setOpenSearchContainer] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const inputRef = useRef<any>(null);
    const searchContainerRef = useRef<any>(null);
    
    const router  = useRouter();

    const dispatch = useAppDispatch();

    const [searchTrips, { data, error, isLoading: tripsLoading }] = useLazySearchTripsQuery();

    let debounceTimeout: NodeJS.Timeout | undefined = undefined;

    const debouncedSearch = useCallback(() => {
        const searchQuery =   inputRef.current?.value
        if(searchQuery !=='') {

            setOpenSearchContainer(true);
            setIsLoading(true);
        } else {
            setOpenSearchContainer(false);
            setIsLoading(false);
        }

        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        debounceTimeout = setTimeout(() => {
            
                const endpoint = `${searchQuery}`;
                searchQuery ? searchTrips(endpoint): ''
                
            
        }, 500);
    }, [searchTrips]);

    if (data && !tripsLoading && isLoading) {
        setIsLoading(false); 
    }

    // useEffect(() => {
    //     if (data && !tripsLoading) {
    //         setIsLoading(false); 
    //     }
    // }, [data, tripsLoading]);

    const handleSearchItemTrack = (selectedTripId:string)=> {
        dispatch(setActiveSection('Track Order'))
        setOpenSearchContainer(false)
        router.push(`/dashboard/track-order/${selectedTripId}`)
        inputRef.current.value = '';
        
    }

    //close search container when user clicks outside the container

    const handleClickOutSide = (event: MouseEvent | KeyboardEvent)=> {
        if(inputRef.current && !inputRef.current.contains(event.target) && searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
            setOpenSearchContainer(false)
            
        }
    }

    const handlePressEscape = (event: KeyboardEvent) => {
        if(event.key === 'Escape') {
            setOpenSearchContainer(false)
            inputRef.current.value = '';
        }
    }
    (()=> {

        document.addEventListener('mousedown', handleClickOutSide)
        document.addEventListener('keydown', handlePressEscape)
        //event listener clean up
        return ()=> {
            document.removeEventListener('mousedown', handleClickOutSide)
            document.removeEventListener('keydown', handlePressEscape)
        }
    })
    // useEffect(()=> {
    //     const handleClickOutSide = (event: MouseEvent | KeyboardEvent)=> {
    //         if(inputRef.current && !inputRef.current.contains(event.target) && searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
    //             setOpenSearchContainer(false)
                
    //         }
    //     }

    //     const handlePressEscape = (event: KeyboardEvent) => {
    //         if(event.key === 'Escape') {
    //             setOpenSearchContainer(false)
    //             inputRef.current.value = '';
    //         }
    //     }
    //     document.addEventListener('mousedown', handleClickOutSide)
    //     document.addEventListener('keydown', handlePressEscape)
    //     //event listener clean up
    //     return ()=> {
    //         document.removeEventListener('mousedown', handleClickOutSide)
    //         document.removeEventListener('keydown', handlePressEscape)
    //     }
    // }, [inputRef])
    
    const trips:Trip[] = data?.trips

    return { inputRef, trips, debouncedSearch, isLoading, data, error, openSearchContainer, searchContainerRef, handleSearchItemTrack };
};
