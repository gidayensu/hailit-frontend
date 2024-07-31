import { DispatcherTrips } from "@/components/Dashboard/Users/Dispatchers/hooks/useDispatcherProfile";
import { UserTrips } from "@/components/Dashboard/Users/hooks/useUserProfile";
import { supabase, userIdAndEmailFromSession } from "@/lib/supabaseAuth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { io } from 'socket.io-client';
import { Trip } from "../slice/tripSlice";

const baseUrl = `https://hailit-backend.onrender.com/api/v1/`;



let userNamespaceSocket:any;

const initializeSocketIo = async () => {
  const { user_id } = await userIdAndEmailFromSession();
  if (user_id) {
    userNamespaceSocket = io(`https://hailit-backend.onrender.com/user-${user_id}`, {
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
      query: { user_id: user_id },
      
      transports: ['websocket', 'polling']
    });

    userNamespaceSocket.on('connect', () => {
      console.log(`Connected with user ID: ${user_id}`);
      
    });

    userNamespaceSocket.on('connect_error', (error:any) => {
      console.error('Connection error:', error);
    });
  }
};
initializeSocketIo();
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
      }),
      providesTags: ["Trips"],
    }),
    getMostRecentTrips: builder.query<any, string | string[]>({
      query: (endpoint) => ({
        url: `${endpoint}`,
        method: "GET",
      }),  async onCacheEntryAdded(
        _, // arg
         {updateCachedData, cacheDataLoaded, cacheEntryRemoved}
       ) {
         
        if (userNamespaceSocket) {

          try {
            await cacheDataLoaded;
            
            userNamespaceSocket.on('tripAdded', (addedTrip:Trip) => {
              
             updateCachedData((draft)=> {
              draft.trips.pop();
               draft.trips = [addedTrip, ...draft.trips]
             })
           });
           userNamespaceSocket.on('tripUpdated', (tripUpdate:Trip) => {
              updateCachedData((draft)=> {
               const index = draft.trips.findIndex((trip:Trip)=>trip.trip_id === tripUpdate.trip_id);
               if (index !==-1) {
                    draft.trips[index] = tripUpdate
               }
              })
            });
            userNamespaceSocket.on('tripRated', (ratedTrip:Trip) => {
              updateCachedData((draft)=> {
               const index = draft.trips.findIndex((trip:Trip)=>trip.trip_id === ratedTrip.trip_id);
               if (index !==-1) {
                  draft.trips[index] = ratedTrip
               }
              })
            });
            userNamespaceSocket.on('tripDeleted', (trip_id:string) => {
             
              updateCachedData((draft)=> {
               const index = draft.trips.findIndex((trip:Trip)=>trip.trip_id === trip_id);
               if (index !==-1) {
                  draft.trips = draft.trips.filter((trip:Trip)=>trip.trip_id !== trip_id) 
               }
              })
            });
            
            
            
          } catch (err) {
            console.log(err)
          }
        }
        
         await cacheEntryRemoved
         
         userNamespaceSocket.off('updatedTrip');
         userNamespaceSocket.off('deletedTrip');
         userNamespaceSocket.off('ratedTrip');
         userNamespaceSocket.close();
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

        if (userNamespaceSocket) {

          try {
            await cacheDataLoaded;
            
            userNamespaceSocket.on('updatedTrip', (updatedTrip:Trip) => {
              updateCachedData((draft)=> {
               console.log({updatedTrip})
               if (draft.trip.trip_id  ===updatedTrip.trip_id) {
                 draft.trip = updatedTrip
               }
              })
            });
            userNamespaceSocket.on('hi', (hi:string) => {
              updateCachedData(()=> {
               console.log({hi})
              })
            });
           //  userNamespaceSocket.on('currentMonthTripsCount', (currentMonthTripsCount:any) => { 
           //   updateCachedData(()=> {
           //     console.log({currentMonthTripsCount})
           //      return currentMonthTripsCount
           //   })
           // });
            userNamespaceSocket.on('ratedTrip', (ratedTrip:Trip) => {
             console.log({ratedTrip})
              updateCachedData((draft)=> {
               if (draft.trip.trip_id  === ratedTrip.trip_id) {
                 draft.trip = ratedTrip
               }
              })
            });
            userNamespaceSocket.on('deletedTrip', (trip_id:string) => {
             console.log({trip_id})
              updateCachedData((draft)=> {
               if (draft.trip.trip_id  === trip_id) {
                 draft.trip = []
               }
              })
            });
            
            
          } catch (err) {
            console.log(err)
          }
        }
        
         await cacheEntryRemoved
         userNamespaceSocket.off('updatedTrip');
         userNamespaceSocket.off('deletedTrip');
         userNamespaceSocket.off('ratedTrip');
         userNamespaceSocket.close();
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
        
        if(userNamespaceSocket) {

          try {
            await cacheDataLoaded;
            userNamespaceSocket.on('customerTrips',  (customerTrips: UserTrips) => { 
             updateCachedData((draft)=> {
               if(draft.trips.customer_trips)
                  draft.trips = customerTrips;
             })
           });
           userNamespaceSocket.on('dispatcherTrips',  (dispatcherTrips: DispatcherTrips) => { 
             updateCachedData((draft)=> {
               if(draft.trips.dispatcher_trips)
                  draft.trips = dispatcherTrips;
             })
           });
  
            
          } catch(err) {
            console.log(err)
          }
        }
         await cacheEntryRemoved
         userNamespaceSocket.off('userTrips');
         userNamespaceSocket.close();
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
      async onCacheEntryAdded(
        _, // arg
         {updateCachedData, cacheDataLoaded, cacheEntryRemoved}
       ) {
         if(userNamespaceSocket) {

           try {
             await cacheDataLoaded;
             userNamespaceSocket.on('hi', (hi:string) => {
               updateCachedData(()=> {
                console.log({hi})
               })
             });
             userNamespaceSocket.on('currentMonthTripsCount', (currentMonthTripsCount:any) => { 
              updateCachedData(()=> {
                 return currentMonthTripsCount
              })
            });
   
             
           } catch(err) {
             console.log(err)
           }
         }
         await cacheEntryRemoved
         userNamespaceSocket.off('currentMonthTripsCount');
         userNamespaceSocket.close();
       },
      providesTags: ["Current Month Trip Counts"],
    }),
    getTripMonths: builder.query<any, string | string[]>({
      query: () => ({
        url: `trips/trip-months`,
        method: "GET",
      }),
      async onCacheEntryAdded(
        _, // arg
         {updateCachedData, cacheDataLoaded, cacheEntryRemoved}
       ) {
        if(userNamespaceSocket) {
          
          try {
            await cacheDataLoaded;
            userNamespaceSocket.on('hi', (hi:string) => {
             updateCachedData(()=> {
              console.log({hi})
             })
           });
            userNamespaceSocket.on('tripMonths', (tripMonths: any) => { 
             updateCachedData((draft)=> {
                draft.tripMonths = tripMonths
             })
           });
  
            
          } catch(err) {
            console.log(err)
          }
        }
         await cacheEntryRemoved
         userNamespaceSocket.off('tripMonths');
          userNamespaceSocket.close();
       },
    }),
    getWeekTripCount: builder.query<any, string | string[]>({
      query: () => ({
        url: `trips/current-week-trip-count`,
        method: "GET",
      }), async onCacheEntryAdded(
        _, // arg
         {updateCachedData, cacheDataLoaded, cacheEntryRemoved}
       ) {
        if(userNamespaceSocket) {
          
          try {
            await cacheDataLoaded;
            userNamespaceSocket.on('hi', (hi:string) => {
             updateCachedData(()=> {
              console.log({hi})
             })
           });
            userNamespaceSocket.on('currentWeekCount',  (currentWeekTrips:any) => { 
             updateCachedData((draft)=> {
                 draft.currentWeekTrips = currentWeekTrips
             })
           });
  
            
          } catch(err) {
            console.log(err)
          }
        }
         await cacheEntryRemoved
         userNamespaceSocket.off('currentWeekCount');
          userNamespaceSocket.close();
       },
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
      async onCacheEntryAdded(
        _, // arg
         {updateCachedData, cacheDataLoaded, cacheEntryRemoved}
       ) {
        if(userNamespaceSocket) {
          
          try {
            await cacheDataLoaded;
            userNamespaceSocket.on('hi', (hi:string) => {
             updateCachedData(()=> {
              console.log({hi})
             })
           });
            userNamespaceSocket.on('monthRevenue',  (monthRevenue:any) => { 
             updateCachedData((draft)=> {
                  draft.revenueData = monthRevenue
             })
           });
  
            
          } catch(err) {
            console.log(err)
          }
        }
         await cacheEntryRemoved
         userNamespaceSocket.off('monthRevenue');
          userNamespaceSocket.close();
       },
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
  useGetMostRecentTripsQuery,
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

