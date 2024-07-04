// actions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';


type AsyncFunction = () => Promise<string>;

export const fetchDropOffLocationName = createAsyncThunk(
  'location/fetchDropOffLocationName',
  async (setLocationName: AsyncFunction) => {
    const result = await setLocationName();
    return result; // the result is expected to be a string
  }
);

export const fetchPickUpLocationName = createAsyncThunk(
  'location/fetchPickUpLocationName',
  async (setLocationName: AsyncFunction) => {
    const result = await setLocationName();
    return result; // the result is expected to be a string
  }
);



export const USER_LOGOUT = 'USER_LOGOUT';

export const userLogout = () => ({
  type: USER_LOGOUT,
});
