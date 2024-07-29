import { supabase } from "@/lib/supabaseAuth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Trip } from "../slice/tripSlice";
import {io} from 'socket.io-client';

const baseUrl = `https://hailit-backend.onrender.com/api/v1/`;

const socket = io('https://hailit-backend.onrender.com/', {
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
  transports: ['websocket', 'polling']
});

// API endpoints for fetching data
export const hailitApi = createApi({
  reducerPath: "tripsApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: async (headers) => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        const accessToken = session.access_token;
        headers.set("authorization", `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),
  tagTypes: [
    "Trip",
    "Trips",
    "User Trips",
    "Current Month Trip Counts",
    "User",
    "Users",
    "All Riders",
    "Rider",
    "Driver",
    "All Drivers",
    "Vehicle",
    "All Vehicles"
  ],
  endpoints: (builder) => ({
    // TRIPS
    getAllTrips: builder.query<any, string | string[]>({
      query: (endpoint) => ({
        url: `${endpoint}`,
        method: "GET",
      }),async onCacheEntryAdded(
        _, // arg
         {updateCachedData, cacheDataLoaded, cacheEntryRemoved}
       ) {
         
         
         try {
           await cacheDataLoaded;
           socket.on('tripAdded', (addedTrip) => {
             
            updateCachedData((draft)=> {
             draft.trips.pop();
             draft.trips = [addedTrip, ...draft.trips]
             draft.total_items = Number(draft.total_items) + 1;
             
            })
          });
           socket.on('tripUpdated', (tripUpdate) => {
             updateCachedData((draft)=> {
              const index = draft.trips.findIndex((trip:Trip)=>trip.trip_id === tripUpdate.trip_id);
              if (index !==-1) {
                draft.trips[index] = tripUpdate
              }
             })
           });
           socket.on('tripRated', (ratedTrip) => {
             updateCachedData((draft)=> {
              const index = draft.trips.findIndex((trip:Trip)=>trip.trip_id === ratedTrip.trip_id);
              if (index !==-1) {
                draft.trips[index] = ratedTrip
              }
             })
           });
           socket.on('tripDeleted', (trip_id) => {
            console.log(trip_id)
             updateCachedData((draft)=> {
              const index = draft.trips.findIndex((trip:Trip)=>trip.trip_id === trip_id);
              if (index !==-1) {
                draft.trips = draft.trips.filter((trip:Trip)=>trip.trip_id !== trip_id) 
              }
             })
           });
           
           
         } catch {
           console.log('')
         }
         await cacheEntryRemoved
         socket.off('tripAdded');
         socket.off('tripUpdated');
         socket.off('tripDeleted');
         socket.off('tripRated');
        socket.close();
       },
      providesTags: ["Trips"],
    }),
    getTrip: builder.query<any, string | string[]>({
      query: (trip_id) => ({
        url: `trips/user-trip/${trip_id}`,
        method: "GET",
      }),
      async onCacheEntryAdded(
        _, // arg
         {updateCachedData, cacheDataLoaded, cacheEntryRemoved}
       ) {
         
         
         try {
           await cacheDataLoaded;
           
           socket.on('tripUpdated', (tripUpdate) => {
            
             updateCachedData((draft)=> {
              
              if (draft.trip.trip_id  ===tripUpdate.trip.trip_id) {
                draft.trip = tripUpdate.trip
              }
             })
           });
           socket.on('tripRated', (ratedTrip) => {
             updateCachedData((draft)=> {
              if (draft.trip.trip_id  === ratedTrip.trip.trip_id) {
                draft.trip = ratedTrip
              }
             })
           });
           socket.on('tripDeleted', (trip_id) => {
             updateCachedData((draft)=> {
              if (draft.trip.trip_id  === trip_id) {
                draft.trip = []
              }
             })
           });
           
           
         } catch (err) {
           console.log(err)
         }
         await cacheEntryRemoved
         
         socket.off('tripUpdated');
         socket.off('tripDeleted');
         socket.off('tripRated');
        socket.close();
       },
      
      providesTags: ["Trip"],
    }),
    getUserTrips: builder.query<any, string | string[]>({
      query: (userId) => ({
        url: `trips/user-trips/${userId}`,
        method: "GET",
      }),
      async onCacheEntryAdded(
        _, // arg
         {updateCachedData, cacheDataLoaded, cacheEntryRemoved}
       ) {
         
         
         try {
           await cacheDataLoaded;
           
           socket.on('tripAdded', (addedTrip) => {
            
            updateCachedData((draft)=> {
              if(draft.trips.dispatcher_trips) {
                draft.trips.dispatcher_trips = [addedTrip, ...(draft?.trips?.dispatcher_trips ?? [])];
              }

              if(draft.trips.customer_trips) {

                draft.trips.customer_trips = [addedTrip, ...(draft.trips.customer_trips ?? [])];
              }

            
             draft.trips.current_trips = Number(draft.trips.current_trips) + 1;
             draft.trips.total_trip_count = Number(draft.trips.total_trip_count) + 1;
             
            })
          });
           socket.on('tripUpdated', (tripUpdate) => {
             updateCachedData((draft)=> {
               const { trip } = tripUpdate;
               console.log(trip)
               const updateTrip = (trips:Trip[], updatedTrip:Trip) => {
                 const index = trips?.findIndex(
                   (trip) => trip.trip_id === updatedTrip.trip_id
                 );
                 if (index !== -1) {
                   trips[index] = updatedTrip;
                 }
               };

               if (draft.trips.customer_trips) {
                 updateTrip(draft.trips.customer_trips, trip);
               }

               if (draft.trips.dispatcher_trips) {
                 updateTrip(draft.trips.dispatcher_trips, trip);
               }

               if (trip.trip_status === "Cancelled") {
                 draft.trips.current_trips =
                   Number(draft.trips.current_trips) - 1;
                 draft.trips.cancelled_trips =
                   Number(draft.trips.cancelled_trips) + 1;
               }

               if (trip.trip_status === "Delivered") {
                 draft.trips.current_trips =
                   Number(draft.trips.current_trips) - 1;
                 draft.trips.delivered_trips =
                   Number(draft.trips.delivered_trips) + 1;
               }
             }
          )
           });
          
           socket.on('tripDeleted', (trip_id) => {
            
             updateCachedData((draft)=> {

              const removeTrip = (trips:Trip[], trip_id:string) => {
                const index = trips?.findIndex((trip) => trip.trip_id === trip_id);
                if (index !== -1) {
                  return trips.filter((trip) => trip.trip_id !== trip_id);
                }
                return trips;
              };
              
              if (draft.trips.customer_trips) {
                draft.trips.customer_trips = removeTrip(draft.trips.customer_trips, trip_id);
              }
              
              if (draft.trips.dispatcher_trips) {
                draft.trips.dispatcher_trips = removeTrip(draft.trips.dispatcher_trips, trip_id);
              }
              
              
              
             })
           });
           
           
         } catch(err) {
           console.log(err)
         }
         await cacheEntryRemoved
         socket.off('tripAdded');
         socket.off('tripUpdated');
         socket.off('tripDeleted');
         
        socket.close();
       },
      providesTags: ["User Trips"],
    }),
    addTrip: builder.mutation<any, any>({
      query: (tripDetails) => ({
        url: `trips/add-trip`,
        method: "POST",
        body: tripDetails,
      }),
      invalidatesTags: ["Trip", "User Trips", "Current Month Trip Counts"],
    }),

    updateTrip: builder.mutation<any, any>({
      query: ({ trip_id, tripDetails }) => ({
        url: `trips/user-trip/${trip_id}`,
        method: "PUT",
        body: tripDetails,
      }), 
      invalidatesTags: [
        "Trip",
        "User Trips",
        "Trips",
        "Current Month Trip Counts",
      ],
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
      invalidatesTags: [
        "Trip",
        "User Trips",
        "Trips",
        "Current Month Trip Counts",
      ],
    }),
    getCurrentMonthTripCounts: builder.query({
      query: () => ({
        url: `trips/current-month-trip-count`,
        method: "GET",
      }),
      providesTags: ["Current Month Trip Counts"],
    }),
    getTripMonths: builder.query<any, string | string[]>({
      query: () => ({
        url: `trips/trip-months`,
        method: "GET",
      }),
    }),
    getWeekTripCount: builder.query<any, string | string[]>({
      query: () => ({
        url: `trips/current-week-trip-count`,
        method: "GET",
      }),
      providesTags: ["Trip"],
    }),
    getTripCountsByMonth: builder.query<any, string | string[]>({
      query: (endpoint) => ({
        url: `trips/trip-count-by-month?${endpoint}`,
        method: "GET",
      }),
      providesTags: ["Trip"],
    }),
    getTripRevenueByMonth: builder.query<any, string | string[]>({
      query: () => ({
        url: `trips/trips-revenue`,
        method: "GET",
      }),
      providesTags: ["Trip"],
    }),
    searchTrips: builder.query<any, string | string[]>({
      query: (searchQuery) => ({
        url: `trips/search-trips?search=${searchQuery}`,
        method: "GET",
      }),
    }),

    // USERS
    getAllUsers: builder.query<any, string | string[]>({
      query: (endpoint) => ({
        url: `${endpoint}`,
        method: "GET",
      }),
      providesTags: ["Users"],
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
      providesTags: ["User"],
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

      invalidatesTags: ["Users", "User"],
    }),

    deleteUser: builder.mutation<any, any>({
      query: (userId) => ({
        url: `users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User", "Users"],
    }),

    //DRIVERS
    getAllDrivers: builder.query<any, string | string[]>({
      query: (endpoint) => ({
        url: `${endpoint}`,
        method: "GET",
      }),
      providesTags: ["All Drivers"],
    }),

    getDriver: builder.query<any, string | string[]>({
      query: (driverId) => ({
        url: `drivers/${driverId}`,
        method: "GET",
      }),
      providesTags: ["Driver"],
    }),

    updateDriver: builder.mutation<any, any>({
      query: ({ driverId, driverDetails }) => ({
        url: `drivers/${driverId}`,
        method: "PUT",
        body: driverDetails,
      }),
      invalidatesTags: ["Driver", "All Drivers"],
    }),

    deleteDriver: builder.mutation<any, any>({
      query: (driverId) => ({
        url: `drivers/${driverId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Driver", "All Drivers"],
    }),
    // RIDERS
    getAllRiders: builder.query<any, string | string[]>({
      query: (endpoint) => ({
        url: `${endpoint}`,
        method: "GET",
      }),
      providesTags: ["All Riders"],
    }),

    getRider: builder.query<any, string | string[]>({
      query: (riderId) => ({
        url: `riders/${riderId}`,
        method: "GET",
      }),
      providesTags: ["Rider"],
    }),

    updateRider: builder.mutation<any, any>({
      query: ({ riderId, riderDetails }) => ({
        url: `riders/${riderId}`,
        method: "PUT",
        body: riderDetails,
      }),
      invalidatesTags: ["Rider", "All Riders"],
    }),

    deleteRider: builder.mutation<any, any>({
      query: (riderId) => ({
        url: `riders/${riderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Rider", "All Riders"],
    }),

    //VEHICLES
    getAllVehicles: builder.query<any, string | string[]>({
      query: (endpoint) => ({
        url: `${endpoint}`,
        method: "GET",
      }),
      providesTags: ['All Vehicles']
    }),

    getVehicle: builder.query<any, string | string[]>({
      query: (vehicleId) => ({
        url: `vehicles/${vehicleId}`,
        method: "GET",
      }),
      providesTags: ['Vehicle']
    }),

    addVehicle: builder.mutation<any, any>({
      query: (vehicleDetails) => ({
        url: `vehicles/add`,
        method: "POST",
        body: vehicleDetails,
      }),
      invalidatesTags: ['Vehicle', 'All Vehicles'  ]
    }),

    updateVehicle: builder.mutation<any, any>({
      query: ({ vehicleId, vehicleDetails }) => ({
        url: `vehicles/${vehicleId}`,
        method: "PUT",
        body: vehicleDetails,
      }),
      invalidatesTags: ['Vehicle', 'All Vehicles'  ]
    }),

    deleteVehicle: builder.mutation<any, any>({
      query: (vehicleId ) => ({
        url: `vehicles/${vehicleId}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Vehicle', 'All Vehicles'  ]
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
  useGetWeekTripCountQuery,
  useGetTripCountsByMonthQuery,
  useLazyGetTripMonthsQuery,
  useLazyRateTripQuery,
  useLazySearchTripsQuery,
  useGetTripRevenueByMonthQuery,

  
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
  useAddVehicleMutation,
  useUpdateVehicleMutation,
  useDeleteVehicleMutation
  
  
} = hailitApi;

