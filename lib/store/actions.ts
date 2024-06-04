// actions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';

// Define the async function type
type AsyncFunction = () => Promise<string>;

export const fetchDropOffLocationName = createAsyncThunk(
  'location/fetchDropOffLocationName',
  async (asyncFunction: AsyncFunction) => {
    const result = await asyncFunction();
    return result; // the result is expected to be a string
  }
);

export const fetchPickUpLocationName = createAsyncThunk(
  'location/fetchPickUpLocationName',
  async (asyncFunction: AsyncFunction) => {
    const result = await asyncFunction();
    return result; // the result is expected to be a string
  }
);



export const USER_LOGOUT = 'USER_LOGOUT';

export const userLogout = () => ({
  type: USER_LOGOUT,
});
