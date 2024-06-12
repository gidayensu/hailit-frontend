import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "@/lib/supabaseAuth";

// Define types for your tags
type Trip = { id: string };
type User = { id: string };
type Driver = { id: string };
type Rider = { id: string };
type Vehicle = { id: string };

// API endpoint for fetching data
export const hailitApi = createApi({
  reducerPath: "tripsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:4000/api/v1/`,
    prepareHeaders: async (headers) => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        const accessToken = session.access_token;
        headers.set("authorization", `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Trips', 'Users', 'Drivers', 'Riders', 'Vehicles'],
  endpoints: (builder) => ({
    // TRIPS
    getAllTrips: builder.query<Trip[], string>({
      query: (endpoint) => ({
        url: `${endpoint}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result ? [...result.map(({ id }) => ({ type: 'Trips', id } as const)), { type: 'Trips' }] : [{ type: 'Trips' }],
    }),
    getTrip: builder.query<Trip, string>({
      query: (tripId) => ({
        url: `trips/user-trip/${tripId}`,
        method: "GET",
      }),
      providesTags: (result, error, tripId) => [{ type: 'Trips', id: tripId }],
    }),
    getUserTrips: builder.query<Trip[], string>({
      query: (userId) => ({
        url: `trips/user-trips/${userId}`,
        method: "GET",
      }),
      providesTags: (result, error, userId) => [{ type: 'Trips', id: userId }],
    }),
    addTrip: builder.mutation<Trip, Partial<Trip>>({
      query: (tripDetails) => ({
        url: `trips/add-trip`,
        method: "POST",
        body: tripDetails,
      }),
      invalidatesTags: [{ type: 'Trips' }],
    }),
    updateTrip: builder.mutation<Trip, { tripId: string; tripDetails: Partial<Trip> }>({
      query: ({ tripId, tripDetails }) => ({
        url: `trips/user-trip/${tripId}`,
        method: "PUT",
        body: tripDetails,
      }),
      invalidatesTags: (result, error, { tripId }) => [{ type: 'Trips', id: tripId }],
    }),
    rateTrip: builder.mutation<Trip, string>({
      query: (tripId) => ({
        url: `trips/rate-trip/${tripId}`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, tripId) => [{ type: 'Trips', id: tripId }],
    }),
    deleteTrip: builder.mutation<{ success: boolean; id: string }, string>({
      query: (tripId) => ({
        url: `trips/user-trip/${tripId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, tripId) => [{ type: 'Trips', id: tripId }],
    }),

    // USERS
    getAllUsers: builder.query<User[], string>({
      query: (endpoint) => ({
        url: `${endpoint}`,
        method: "GET",
      }),
      providesTags: [{ type: 'Users' }],
    }),
    getAdmin: builder.query<User, string>({
      query: (userId) => ({
        url: `users/admin/${userId}`,
        method: "GET",
      }),
      providesTags: (result, error, userId) => [{ type: 'Users', id: userId }],
    }),
    getUser: builder.query<User, string>({
      query: (userId) => ({
        url: `users/${userId}`,
        method: "GET",
      }),
      providesTags: (result, error, userId) => [{ type: 'Users', id: userId }],
    }),
    addUser: builder.mutation<User, Partial<User>>({
      query: (userDetails) => ({
        url: `users/register`,
        method: "POST",
        body: userDetails,
      }),
      invalidatesTags: [{ type: 'Users' }],
    }),
    updateUser: builder.mutation<User, { userId: string; userDetails: Partial<User> }>({
      query: ({ userId, userDetails }) => ({
        url: `users/${userId}`,
        method: "PUT",
        body: userDetails,
      }),
      invalidatesTags: (result, error, { userId }) => [{ type: 'Users', id: userId }],
    }),
    deleteUser: builder.mutation<{ success: boolean; id: string }, string>({
      query: (userId) => ({
        url: `users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, userId) => [{ type: 'Users', id: userId }],
    }),

    // DRIVERS
    getAllDrivers: builder.query<Driver[], string>({
      query: (endpoint) => ({
        url: `${endpoint}`,
        method: "GET",
      }),
      providesTags: [{ type: 'Drivers' }],
    }),
    getDriver: builder.query<Driver, string>({
      query: (driverId) => ({
        url: `drivers/${driverId}`,
        method: "GET",
      }),
      providesTags: (result, error, driverId) => [{ type: 'Drivers', id: driverId }],
    }),
    updateDriver: builder.mutation<Driver, { driverId: string; driverDetails: Partial<Driver> }>({
      query: ({ driverId, driverDetails }) => ({
        url: `drivers/${driverId}`,
        method: "PUT",
        body: driverDetails,
      }),
      invalidatesTags: (result, error, { driverId }) => [{ type: 'Drivers', id: driverId }],
    }),
    deleteDriver: builder.mutation<{ success: boolean; id: string }, string>({
      query: (driverId) => ({
        url: `drivers/${driverId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, driverId) => [{ type: 'Drivers', id: driverId }],
    }),

    // RIDERS
    getAllRiders: builder.query<Rider[], string>({
      query: (endpoint) => ({
        url: `${endpoint}`,
        method: "GET",
      }),
      providesTags: [{ type: 'Riders' }],
    }),
    getRider: builder.query<Rider, string>({
      query: (riderId) => ({
        url: `riders/${riderId}`,
        method: "GET",
      }),
      providesTags: (result, error, riderId) => [{ type: 'Riders', id: riderId }],
    }),
    updateRider: builder.mutation<Rider, { riderId: string; riderDetails: Partial<Rider> }>({
      query: ({ riderId, riderDetails }) => ({
        url: `riders/${riderId}`,
        method: "PUT",
        body: riderDetails,
      }),
      invalidatesTags: (result, error, { riderId }) => [{ type: 'Riders', id: riderId }],
    }),
    deleteRider: builder.mutation<{ success: boolean; id: string }, string>({
      query: (riderId) => ({
        url: `riders/${riderId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, riderId) => [{ type: 'Riders', id: riderId }],
    }),

    // VEHICLES
    getAllVehicles: builder.query<Vehicle[], string>({
      query: (endpoint) => ({
        url: `${endpoint}`,
        method: "GET",
      }),
      providesTags: [{ type: 'Vehicles' }],
    }),
    getVehicle: builder.query<Vehicle, string>({
      query: (vehicleId) => ({
        url: `vehicles/${vehicleId}`,
        method: "GET",
      }),
      providesTags: (result, error, vehicleId) => [{ type: 'Vehicles', id: vehicleId }],
    }),
    addVehicle: builder.mutation<Vehicle, Partial<Vehicle>>({
      query: (vehicleDetails) => ({
        url: `vehicles/add`,
        method: "POST",
        body: vehicleDetails,
      }),
      invalidatesTags: [{ type: 'Vehicles' }],
    }),
    updateVehicle: builder.mutation<Vehicle, { vehicleId: string; vehicleDetails: Partial<Vehicle> }>({
      query: ({ vehicleId, vehicleDetails }) => ({
        url: `vehicles/${vehicleId}`,
        method: "PUT",
        body: vehicleDetails,
      }),
      invalidatesTags: (result, error, { vehicleId }) => [{ type: 'Vehicles', id: vehicleId }],
    }),
    deleteVehicle: builder.mutation<{ success: boolean; id: string }, string>({
      query: (vehicleId) => ({
        url: `vehicles/${vehicleId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, vehicleId) => [{ type: 'Vehicles', id: vehicleId }],
    }),
  }),
});

export const {
  // USERS
  useGetAllUsersQuery,
  useGetAdminQuery,
  useGetUserQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  
  // TRIPS
  useGetAllTripsQuery,
  useGetTripQuery,
  useGetUserTripsQuery,
  useAddTripMutation,
  useUpdateTripMutation,
  useRateTripMutation,
  useDeleteTripMutation,
  
  // DRIVERS
  useGetAllDriversQuery,
  useGetDriverQuery,
  useUpdateDriverMutation, 
  useDeleteDriverMutation,
  
  // RIDERS
  useGetAllRidersQuery,
  useGetRiderQuery,
  useUpdateRiderMutation,
  useDeleteRiderMutation,

  // VEHICLES
  useGetAllVehiclesQuery,
  useGetVehicleQuery,
  useAddVehicleMutation,
  useUpdateVehicleMutation, 
  useDeleteVehicleMutation,
    // USERS
    useLazyGetUserQuery,
    
    //TRIPS
    
    //DRIVERS
    
    useLazyGetAllDriversQuery,
    
    useLazyGetDriverQuery,
    
    
    
    //RIDERS
    
    useLazyGetAllRidersQuery,
    
    useLazyGetRiderQuery,
    
    //VEHICLES
    
    
  
} = hailitApi;
