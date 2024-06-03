import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserLocation } from "@/components/Maps/Map";
interface MapData {
    searchData: any,
    chosenLocation: UserLocation, 
    chosenLocationName: string
    searchContainer: boolean
}

const initialState:MapData = {
    searchData: [],
    chosenLocation: [0, 0],
    chosenLocationName: '',
    searchContainer: false
}

export const mapSlice = createSlice ({
    name: 'map data',
    initialState, 
    reducers : {
        setSearchData (state, action: PayloadAction<any>) {
            state.searchData = action.payload
        },

        setChosenLocation (state, action:PayloadAction<UserLocation>) {
            state.chosenLocation = action.payload
        },

        setChosenLocationName (state, action:PayloadAction<any>) {
            
            state.chosenLocationName = action.payload
        }, 

        setSearchContainer (state, action:PayloadAction<boolean>) {
            state.searchContainer = action.payload
        }

    }
})

  
  
  
export const {setSearchData, setChosenLocation, setChosenLocationName, setSearchContainer} = mapSlice.actions