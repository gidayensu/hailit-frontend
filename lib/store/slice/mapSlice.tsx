import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserLocation } from "@/components/Maps/Map";
interface MapData {
    searchData: any,
    chosenLocation: UserLocation, 

}

const initialState:MapData = {
    searchData: [],
    chosenLocation: [0, 0]
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
        }

    }
})

export const {setSearchData, setChosenLocation} = mapSlice.actions