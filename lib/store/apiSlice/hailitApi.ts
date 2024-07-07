import { supabase } from "@/lib/supabaseAuth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



// API endpoint for fetching data
export const hailitApi = createApi({
  
  reducerPath: "tripsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:4000/api/v1/`,
    // baseUrl: `https://hailit-backend.onrender.com/api/v1/`,
    prepareHeaders: async (headers) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const accessToken = session.access_token;
        headers.set("authorization", `Bearer ${accessToken}`)
        
      }

      return headers;
    },
  }),
  tagTypes: ['Trip', 'Trips', 'User Trips', 'Current Month Trip Counts', 'User', 'Users', 'All Riders', 'Rider', 'Driver', 'All Drivers'],
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
      invalidatesTags: ['Trip', 'User Trips', 'Current Month Trip Counts'],
    }),

    updateTrip: builder.mutation<any, any>({
      query: ({ trip_id, tripDetails  }) => ({
        url: `trips/user-trip/${trip_id}`,
        method: "PUT",
        body: tripDetails,
      }),
      invalidatesTags: ['Trip', 'User Trips', 'Trips', 'Current Month Trip Counts']
    }),
    rateTrip: builder.query<any, string | string[]>({
      query: (trip_id) => ({
        url: `trips/rate-trip/${trip_id}`,
        method: "PUT",
      }),
    }),

    deleteTrip: builder.mutation<any, any>({
      query: (trip_id) => ({
        url: `trips/user-trip/${trip_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Trip', 'User Trips', 'Trips', 'Current Month Trip Counts']
    }),
    getCurrentMonthTripCounts: builder.query({
      query: () => ({
        url: `trips/current-month-trip-count`,
        method: "GET",
      }),
      providesTags: ['Current Month Trip Counts']
    }),
    getTripMonths: builder.query<any, string | string[]>({
      query: () => ({
        url: `trips/trip-months`,
        method: "GET",
      }),
    }),
    searchTrips: builder.query<any, string | string[]>({
      query: (searchQuery)=> ({
        url: `trips/search-trips?search=${searchQuery}`,
        method: "GET",
      })
    }),
    // USERS
    getAllUsers: builder.query<any, string | string[]>({
      query: (endpoint) => ({
        url: `${endpoint}`,
        method: "GET",
      }),
      providesTags: ['Users']
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
      providesTags: ['User']
    }),

    addUser: builder.query<any, any>({
      query: (userDetails) => ({
        url: `users/register`,
        method: "POST",
        body: userDetails,
      }),
    }),

    updateUser: builder.mutation<any, any>({
      query: ({ userId, userDetails }) => ({
        url: `users/${userId}`,
        method: "PUT",
        body: userDetails,
      }),
      
      invalidatesTags: ['Users', 'User',  ]
    }),

    deleteUser: builder.mutation<any, any>({
      query: (userId) => ({
        url: `users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ['User', 'Users']
    }),

    //DRIVERS
    getAllDrivers: builder.query<any, string | string[]>({
      query: (endpoint) => ({
        url: `${endpoint}`,
        method: "GET",
      }),
      providesTags: ['All Drivers']
    }),

    getDriver: builder.query<any, string | string[]>({
      query: (driverId) => ({
        url: `drivers/${driverId}`,
        method: "GET",
      }),
      providesTags: ['Driver']
    }),

    updateDriver: builder.mutation<any, any>({
      query: ({ driverId, driverDetails }) => ({
        url: `drivers/${driverId}`,
        method: "PUT",
        body: driverDetails,
      }),
      invalidatesTags: ['Driver', 'All Drivers']
    }),

    deleteDriver: builder.mutation<any, any>({
      query: (driverId ) => ({
        url: `drivers/${driverId}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Driver', 'All Drivers']
    }),
    // RIDERS
    getAllRiders: builder.query<any, string | string[]>({
      query: (endpoint) => ({
        url: `${endpoint}`,
        method: "GET",
      }),
      providesTags: ['All Riders']
    }),

    getRider: builder.query<any, string | string[]>({
      query: (riderId) => ({
        url: `riders/${riderId}`,
        method: "GET",
      }),
      providesTags: ['Rider']
    }),

    updateRider: builder.mutation<any, any>({
      query: ({ riderId, riderDetails }) => ({
        url: `riders/${riderId}`,
        method: "PUT",
        body: riderDetails,
      }),
      invalidatesTags: ['Rider', 'All Riders']
    }),

    deleteRider: builder.mutation<any, any>({
      query: (riderId ) => ({
        url: `riders/${riderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Rider', 'All Riders']
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
  //PREFETCH
  usePrefetch,
  // USERS
  useGetAllUsersQuery,
  useGetAdminQuery,
  useGetUserQuery,
  useLazyGetUserQuery,
  useLazyAddUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  
  //TRIPS
  useGetAllTripsQuery,
  useGetTripQuery,
  useGetUserTripsQuery,
  useAddTripMutation,
  useUpdateTripMutation,
  useGetTripMonthsQuery,
  useGetCurrentMonthTripCountsQuery, 
  useDeleteTripMutation, 
  
  useLazyRateTripQuery,
  useLazySearchTripsQuery,
  
  //DRIVERS
  useGetAllDriversQuery,
  useLazyGetAllDriversQuery,
  useGetDriverQuery,
  useLazyGetDriverQuery,
  useUpdateDriverMutation,
  useDeleteDriverMutation,
  
  
  //RIDERS
  useGetAllRidersQuery,
  useLazyGetAllRidersQuery,
  useGetRiderQuery,
  useLazyGetRiderQuery,
  useUpdateRiderMutation,
  useDeleteRiderMutation,
  

  //VEHICLES
  useGetAllVehiclesQuery,
  useGetVehicleQuery,
  useLazyAddVehicleQuery,
  useLazyUpdateVehicleQuery, 
  useLazyDeleteVehicleQuery,
  
} = hailitApi;

