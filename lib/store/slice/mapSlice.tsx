// mapSlice.tsx
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  fetchMapLocationName } from "../actions";
import { UserLocation } from "@/components/Maps/MainMap";

interface MapData {
  searchData: any,
  userLocation: UserLocation,
  mapLocationName: string,
  pickUpLocation: UserLocation, 
  pickUpLocationName: string,
  dropOffLocation: UserLocation, 
  dropOffLocationName: string,
  searchContainer: boolean,
}

const initialState: MapData = {
  searchData: ['1', '2'],
  mapLocationName: '',
  pickUpLocation: [0, 0],
  userLocation: [5.5663846170585645, -0.23610680052490807],
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

    setUserLocation(state, action: PayloadAction<UserLocation>) {
      state.userLocation = action.payload
      
    },
    
    setPickUpLocation(state, action: PayloadAction<UserLocation>) {
      state.pickUpLocation = action.payload
      
    },
    setPickUpLocationName(state, action: PayloadAction<string>) {
      state.pickUpLocationName = action.payload
      
    },
    setMapLocationName(state, action: PayloadAction<string>) {
      state.mapLocationName = action.payload
      
    },

    setDropOffLocation(state, action: PayloadAction<UserLocation>) {
      state.dropOffLocation = action.payload
      
    },
    setDropOffLocationName(state, action: PayloadAction<string>) {
      state.dropOffLocationName = action.payload
      
    },
    

    setSearchCard(state, action: PayloadAction<boolean>) {
      state.searchContainer = action.payload
    },

    resetSearch(state) {
      state.searchContainer = false;
      state.searchData = ['1', '2'];
    },
    resetMapData() {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchMapLocationName.fulfilled, (state, action: PayloadAction<string>) => {
        
        state.mapLocationName = action.payload;
      });
  },
});

export const {
  setSearchData,
  setPickUpLocation,
  resetMapData,
  setSearchCard,
  setUserLocation,
  setDropOffLocation,
  setPickUpLocationName,
  setDropOffLocationName,
  setMapLocationName
} = mapSlice.actions;


