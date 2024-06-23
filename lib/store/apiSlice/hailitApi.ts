import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "@/lib/supabaseAuth";



// API endpoint for fetching data
export const hailitApi = createApi({
  
  reducerPath: "tripsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:4000
/api/v1/`,
    prepareHeaders: async (headers) => {
      
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        const accessToken = session.access_token;
        headers.set("authorization", `Bearer ${accessToken}`)
        
      }

      return headers;
    },
  }),
  tagTypes: ['Trip', 'Trips', 'User Trips'],
  endpoints: (builder) => ({
    // TRIPS
    getAllTrips: builder.query<any, string | string[]>({
      query: (endpoint) => ({
        url: `${endpoint}`,
        method: "GET",
      }),
      providesTags: ['Trips']
    }),
    getTrip: builder.query<any, string | string[]>({
      query: (trip_id) => ({
        url: `trips/user-trip/${trip_id}`,
        method: "GET",
      }),
      providesTags: ['Trip']
    }),
    getUserTrips: builder.query<any, string | string[]>({
      query: (userId) => ({
        url: `trips/user-trips/${userId}`,
        method: "GET",
      }),
      providesTags: ['User Trips']
    }),
    addTrip: builder.mutation<any, any>({
      query: (tripDetails) => ({
        url: `trips/add-trip`,
        method: "POST",
        body: tripDetails,
      }),
      invalidatesTags: ['Trip', 'User Trips'],
    }),

    updateTrip: builder.mutation<any, any>({
      query: ({ trip_id, tripDetails  }) => ({
        url: `trips/user-trip/${trip_id}`,
        method: "PUT",
        body: tripDetails,
      }),
      invalidatesTags: ['Trip', 'User Trips', 'Trips']
    }),
    rateTrip: builder.query<any, string | string[]>({
      query: (trip_id) => ({
        url: `trips/rate-trip/${trip_id}`,
        method: "PUT",
      }),
    }),

    deleteTrip: builder.query<any, string | string[]>({
      query: (trip_id) => ({
        url: `trips/user-trip/${trip_id}`,
        method: "DELETE",
      }),
    }),

    // USERS
    getAllUsers: builder.query<any, string | string[]>({
      query: (endpoint) => ({
        url: `${endpoint}`,
        method: "GET",
      }),
    }),

    getAdmin: builder.query<any, string | string[] | any>({
      query: (userId) => ({
        url: `users/admin/${userId}`,
        method: "GET",
      }),
    }),
    getUser: builder.query<any, string | string[] | any>({
      query: (userId) => ({
        url: `users/${userId}`,
        method: "GET",
      }),
    }),

    addUser: builder.query<any, any>({
      query: (userDetails) => ({
        url: `users/register`,
        method: "POST",
        body: userDetails,
      }),
    }),

    updateUser: builder.query<any, any>({
      query: ({ userId, userDetails }) => ({
        url: `users/${userId}`,
        method: "PUT",
        body: userDetails,
      }),
    }),

    deleteUser: builder.query<any, any>({
      query: ({ userId }) => ({
        url: `${userId}`,
        method: "DELETE",
      }),
    }),

    //DRIVERS
    getAllDrivers: builder.query<any, string | string[]>({
      query: (endpoint) => ({
        url: `${endpoint}`,
        method: "GET",
      }),
    }),

    getDriver: builder.query<any, string | string[]>({
      query: (driverId) => ({
        url: `drivers/${driverId}`,
        method: "GET",
      }),
    }),

    updateDriver: builder.query<any, any>({
      query: ({ driverId, driverDetails }) => ({
        url: `users/${driverId}`,
        method: "PUT",
        body: driverDetails,
      }),
    }),

    deleteDriver: builder.query<any, any>({
      query: ({ driverId }) => ({
        url: `${driverId}`,
        method: "DELETE",
      }),
    }),
    // RIDERS
    getAllRiders: builder.query<any, string | string[]>({
      query: (endpoint) => ({
        url: `${endpoint}`,
        method: "GET",
      }),
    }),

    getRider: builder.query<any, string | string[]>({
      query: (riderId) => ({
        url: `riders/${riderId}`,
        method: "GET",
      }),
    }),

    updateRider: builder.query<any, any>({
      query: ({ riderId, riderDetails }) => ({
        url: `riders/${riderId}`,
        method: "PUT",
        body: riderDetails,
      }),
    }),

    deleteRider: builder.query<any, any>({
      query: ({ riderId }) => ({
        url: `${riderId}`,
        method: "DELETE",
      }),
    }),

    //VEHICLES
    getAllVehicles: builder.query<any, string | string[]>({
      query: (endpoint) => ({
        url: `${endpoint}`,
        method: "GET",
      }),
    }),

    getVehicle: builder.query<any, string | string[]>({
      query: (vehicleId) => ({
        url: `vehicles/${vehicleId}`,
        method: "GET",
      }),
    }),

    addVehicle: builder.query<any, any>({
      query: (vehicleDetails) => ({
        url: `vehicles/add`,
        method: "POST",
        body: vehicleDetails,
      }),
    }),

    updateVehicle: builder.query<any, any>({
      query: ({ vehicleId, vehicleDetails }) => ({
        url: `vehicles/${vehicleId}`,
        method: "PUT",
        body: vehicleDetails,
      }),
    }),

    deleteVehicle: builder.query<any, any>({
      query: ({ vehicleId }) => ({
        url: `${vehicleId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  // USERS
  useGetAllUsersQuery,
  useGetAdminQuery,
  useGetUserQuery,
  useLazyGetUserQuery,
  useLazyAddUserQuery,
  useLazyUpdateUserQuery,
  useLazyDeleteUserQuery,
  
  //TRIPS
  useGetAllTripsQuery,
  useGetTripQuery,
  useGetUserTripsQuery,
  useAddTripMutation,
  useUpdateTripMutation,
  
  useLazyDeleteTripQuery,
  useLazyRateTripQuery,
  
  //DRIVERS
  useGetAllDriversQuery,
  useLazyGetAllDriversQuery,
  useGetDriverQuery,
  useLazyGetDriverQuery,
  useLazyUpdateDriverQuery, 
  useLazyDeleteDriverQuery,
  
  //RIDERS
  useGetAllRidersQuery,
  useLazyGetAllRidersQuery,
  useGetRiderQuery,
  useLazyGetRiderQuery,
  useLazyUpdateRiderQuery,
  useLazyDeleteRiderQuery,

  //VEHICLES
  useGetAllVehiclesQuery,
  useGetVehicleQuery,
  useLazyAddVehicleQuery,
  useLazyUpdateVehicleQuery, 
  useLazyDeleteVehicleQuery,
  
} = hailitApi;
