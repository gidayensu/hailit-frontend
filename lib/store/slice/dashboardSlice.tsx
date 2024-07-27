import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TripStatus, TripStage } from "@/components/Order/types/Types";
import { DispatcherRole } from "@/components/Dashboard/Users/Dispatchers/hooks/useDispatcherProfile";

export type ActiveSection =
  | "Overview"
  | "Orders"
  | "Vehicles"
  | "Users"
  | "Track Order"
  | "Riders"
  | "Drivers"
  | "Analytics"
  | "Sign Out"
  | "Profile";

export interface TripStatusDBUpdate {
  trip_status: TripStatus;
  trip_stage: TripStage;
  trip_commencement_date: null | Date;
  trip_completion_date: null | Date;
}
export interface TripStatusandStage {
  tripStatus: TripStatus;
  tripStage: TripStage;
  tripCommencementDate: null | Date;
  tripCompletionDate: null | Date;
}

export interface DashboardDetails {
  selectedUserId: string;
  selectedRiderId: string;
  selectedDriverId: string;
  dispatcherRole: DispatcherRole;
  assignedDispatcherId: string;
  selectedVehicleId: string;
  tripStatus: string;
  tripStage: TripStage;
}

export interface AssignedDispatcherDetails {
  assignedDispatcherId: string;
}

export const initialState: DashboardDetails = {
  selectedUserId: "",
  selectedDriverId: "",
  selectedRiderId: "",
  selectedVehicleId: "",
  assignedDispatcherId: "",
  dispatcherRole: "Rider",
  tripStatus: "",
  tripStage: 1,
};
export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    
    setTripStatus(state, action: PayloadAction<TripStatusandStage>) {
      state.tripStage = action.payload.tripStage;
      state.tripStatus = action.payload.tripStatus;
    },

    setSelectedDriverId(state, action: PayloadAction<string>) {
      state.selectedDriverId = action.payload;
    },
    setSelectedRiderId(state, action: PayloadAction<string>) {
      state.selectedRiderId = action.payload;
    },

    setDispatcherRole(state, action: PayloadAction<DispatcherRole>) {
      state.dispatcherRole = action.payload;
    },

    setSelectedUserId(state, action: PayloadAction<string>) {
      state.selectedUserId = action.payload;
    },
    setSelectedVehicleId(state, action: PayloadAction<string>) {
      state.selectedVehicleId = action.payload;
    },


  },
});

export const {
  setTripStatus,
  setSelectedUserId,
  setSelectedDriverId,
  setSelectedRiderId,
  setDispatcherRole,
  setSelectedVehicleId
} = dashboardSlice.actions;
