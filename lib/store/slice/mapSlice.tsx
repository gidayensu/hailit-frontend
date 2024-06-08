// mapSlice.tsx
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPickUpLocationName, fetchDropOffLocationName } from "../actions";
import { UserLocation } from "@/components/Maps/MainMap";

interface MapData {
  searchData: any,
  pickUpLocation: UserLocation, 
  pickUpLocationName: string,
  dropOffLocation: UserLocation, 
  dropOffLocationName: string,
  searchContainer: boolean,
}

const initialState: MapData = {
  searchData: ['1', '2'],
  pickUpLocation: [0, 0],
  pickUpLocationName: '',
  dropOffLocationName: '',
  dropOffLocation: [0, 0],
  searchContainer: false
}

export const mapSlice = createSlice({
  name: 'map data',
  initialState, 
  reducers: {
    setSearchData(state, action: PayloadAction<any>) {
      state.searchData = action.payload
    },

    setPickUpLocation(state, action: PayloadAction<UserLocation>) {
      state.pickUpLocation = action.payload
      console.log('this pickup location is running')
    },

    setDropOffLocation(state, action: PayloadAction<UserLocation>) {
      state.dropOffLocation = action.payload
      console.log('this drop off location is running')
    },

     

    setSearchContainer(state, action: PayloadAction<boolean>) {
      state.searchContainer = action.payload
    },

    resetSearch(state) {
      state.searchContainer = false;
      state.searchData = ['1', '2'];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPickUpLocationName.fulfilled, (state, action: PayloadAction<string>) => {
        state.pickUpLocationName = action.payload;
        console.log('this pickup extra reducer is running')
      })
      .addCase(fetchDropOffLocationName.fulfilled, (state, action: PayloadAction<string>) => {
        console.log('this dropoff extra reducer is running')
        state.dropOffLocationName = action.payload;
      });
  },
});

export const {
  setSearchData,
  setPickUpLocation,

  setSearchContainer,
  setDropOffLocation,

} = mapSlice.actions;


