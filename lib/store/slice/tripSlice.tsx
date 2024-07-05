import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderStatus } from "@/components/Dashboard/TrackOrder/StatusSection/hook/useGetTrip";
const initialState:Trip = {
    
      trip_stage: 0,
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
      trip_type: "",
      trip_id: "",
      payment_method: "",
      promo_code: "",
      dispatcher_id: "",
      customer_id: "",
      trip_medium: "",
      trip_status: "Booked",
      package_type: "Others",
      pickup_location: "",
      drop_off_location: "",
      additional_information: "",
      sender_number: "",
      trip_area: "",
      //dispatcher is structured to match both drivers and riders
      dispatcher: {
        rating_count: 0,
        cumulative_rating: "0.0",
        user_id: "",
        dispatcher_id: "",
        license_number: "",
        available: false,
        vehicle_id: "",
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
        clearTrip (state, action:PayloadAction<Trip>) {
          return initialState;
        }
        
        
    }
})

export const {
    setTrip, clearTrip, setPaymentStatus
} = tripSlice.actions;


export interface Dispatcher {
    rating_count?: number;
    cumulative_rating?: string;
    user_id: string;
    dispatcher_id?: string;
    license_number?: string;
    available?: boolean;
    vehicle_id?: string;
    first_name: string;
    last_name: string;
    phone_number?: string;
    vehicle?: Vehicle
  }
  
  export interface Trip {
    trip_stage: number;
    trip_request_date: null | Date | string;
    trip_commencement_date: null | Date | string;
    trip_completion_date: null | Date | string;
    trip_cost: string;
    payment_status: boolean;
    dispatcher_rating: null | number;
    rated: boolean;
    package_value: string;
    rating_comment: string;
    recipient_number: string;
    trip_type: string;
    trip_id: string;
    payment_method: string;
    promo_code: string;
    dispatcher_id: string;
    customer_id: string;
    trip_medium: string;
    trip_status: OrderStatus;
    package_type: string;
    pickup_location: string;
    drop_off_location: string;
    additional_information: string;
    sender_number: string;
    trip_area: string;
    dispatcher: Dispatcher;
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