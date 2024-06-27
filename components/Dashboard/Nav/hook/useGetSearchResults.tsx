'use client'
import { useAppDispatch } from "@/lib/store/hooks";
import { useLazySearchTripsQuery } from "@/lib/store/apiSlice/hailitApi";
import { useRef, useState, useEffect, useCallback } from "react";
import { setActiveSection, setTrackingOrder, setSelectedTripId } from "@/lib/store/slice/dashboardSlice";
import { Trip } from "@/lib/store/slice/tripSlice";

import { useGetTrip } from "../../TrackOrder/StatusSection/hook/useGetTrip";
export const useGetSearchResults = () => {
    const [openSearchContainer, setOpenSearchContainer] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const inputRef = useRef<any>(null);
    const searchContainerRef = useRef<any>(null);
    


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

    useEffect(() => {
        if (data && !tripsLoading) {
            setIsLoading(false); 
        }
    }, [data, tripsLoading]);

    const handleSearchItemTrack = (selectedTripId:string)=> {
        dispatch(setActiveSection('Track Order'))
        setOpenSearchContainer(false)
        dispatch(setSelectedTripId(selectedTripId));
        inputRef.current.value = '';
        setTrackingOrder(true)
    }

    //close search container when user clicks outside the container
    useEffect(()=> {
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
        document.addEventListener('mousedown', handleClickOutSide)
        document.addEventListener('keydown', handlePressEscape)
        //event listener clean up
        return ()=> {
            document.removeEventListener('mousedown', handleClickOutSide)
            document.removeEventListener('keydown', handlePressEscape)
        }
    }, [inputRef])
    
    const trips:Trip[] = data?.trips

    return { inputRef, trips, debouncedSearch, isLoading, data, error, openSearchContainer, searchContainerRef, handleSearchItemTrack };
};
