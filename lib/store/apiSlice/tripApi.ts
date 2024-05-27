import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const generateQueryStr = (baseString: string, query: Object): string => {
  const queryString: string =
    baseString +
    Object.entries(query)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

  return queryString;
};

interface IHeader {
  "X-RapidAPI-Key": string;
  "X-RapidAPI-Host": string;
}
const Header: IHeader = {
  "X-RapidAPI-Key": "6b365afe7cmsh5548dfde4720349p10e88bjsn3c9175ff3429",
  "X-RapidAPI-Host": "http://localhost:5000/api/v1/trip/user-trip/",
};

// API endpoint for fetching data
export const tripApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:5000/api/v1/trip/user-trip/`,
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", Header["X-RapidAPI-Key"]);
      headers.set("X-RapidAPI-Host", Header["X-RapidAPI-Host"]);

      return headers;
    },
  }),

  endpoints: (builder) => ({
    getTripDetails: builder.query<any, string|string[]>({ // Change type to string for tripId
      query: (tripId) => ({
        url: `${tripId}`, 
      }),
    }),
    
  }),
});

export const { useGetTripDetailsQuery } = tripApi;