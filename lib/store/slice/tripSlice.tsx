import { UserTrip } from "@/components/Dashboard/Users/hooks/useUserProfile";
import { TripStage, TripType } from "@/components/Order/types/Types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type DispatcherRole = "Rider" | "Driver"
const initialState:Trip = {
    
      trip_stage: 1,
      trip_request_date: null,
      trip_commencement_date: null,
      trip_completion_date: null,
      trip_cost: '0', 
      payment_status: false,
      dispatcher_rating: null,
      rated: false,
      package_value: '', 
      rating_comment: "",
      recipient_number: "",
      trip_type: "Next Day",
      trip_id: "",
      drop_lat: "",
      drop_long: "",
      pick_lat: "",
      pick_long: "",
      payment_method: "",
      promo_code: "",
      dispatcher_id: "",
      customer_id: "",
      trip_medium: "Motor",
      trip_status: "Booked",
      package_type: "Others",
      pickup_location: "",
      drop_off_location: "",
      additional_information: "",
      sender_number: "",
      trip_area: "Accra",
      
      //dispatcher is structured to match both drivers and riders
      dispatcher: {
        rating_count: 0,
        cumulative_rating: 0.,
        user_id: "",
        dispatcher_id: "",
        license_number: "",
        available: false,
        vehicle_id: "",
        user_role: "Rider",
        first_name: "",
        last_name: "",
        phone_number: "",
        vehicle: {
          vehicle_id: "",
          vehicle_model: "",
          plate_number: "",
          vehicle_type: "",
          insurance_details: "",
          road_worthy: "",
          vehicle_name: "",
          available: false, 
        },
      },
    }

  

export const tripSlice = createSlice({
    name: 'trip',
    initialState,
    reducers: {
        setTrip (state, action:PayloadAction<Trip>) {
            return action.payload
            
        },
        setPaymentStatus (state, action:PayloadAction<boolean>) {
          state.payment_status = action.payload
        },
        clearTrip () {
          return initialState;
        }
        
        
    }
})

export const {
    setTrip, clearTrip, setPaymentStatus
} = tripSlice.actions;


export interface Dispatcher {
    rating_count: number;
    cumulative_rating: number;
    user_id: string;
    user_role: DispatcherRole;
    dispatcher_id: string;
    license_number?: string;
    available?: boolean;
    vehicle_id?: string;
    first_name: string;
    last_name: string;
    email?: string;
    phone_number?: string;
    vehicle?: Vehicle
  }
  
  export interface Trip extends UserTrip {
    trip_stage: TripStage;
    trip_commencement_date: null | Date | string;   
    dispatcher_rating: null | number;
    rated: boolean;
    rating_comment: string;
    trip_type: TripType;
    trip_id: string;
    promo_code: string;
    dispatcher_id: string;
    customer_id: string;
    dispatcher: Dispatcher;
    pick_lat: string,
    pick_long: string,
    drop_lat: string, 
    drop_long: string,

    


  }
  
  export interface Vehicle {
    vehicle_id?: string,
    vehicle_name?: string, 
    vehicle_model?: string, 
    plate_number?: string,
    vehicle_type?: string,
    insurance_details?: string,
    road_worthy?: string,
    available?: boolean
}

export interface TripsWithUser extends Trip {
  first_name: string,
  last_name: string
}