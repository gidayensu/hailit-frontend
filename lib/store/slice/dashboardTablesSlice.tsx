import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Driver } from "@/components/Dashboard/Users/Dispatchers/AllDriversTable";
import { Rider } from "@/components/Dashboard/Users/Dispatchers/AllRidersTable";
import { Trip, TripsWithUser } from "./tripSlice";
import { User } from "@/components/Dashboard/Users/hooks/useUsersTable";
import { Vehicle } from "@/components/Dashboard/Vehicles/AllVehiclesTable";


type Table = "overviewData" | "usersData" | "tripsData" | "vehiclesData" | "ridersData" | "driversData";

interface DashboardTables {
    overviewData: Trip[], 
    usersData: User[], 
    tripsData: TripsWithUser[],
    ridersData: Rider[], 
    driversData: Driver[], 
    vehiclesData: Vehicle[]
}

interface SetData<T extends Table> {
    table: T;
    data: DashboardTables[T];
}

export const initialState: DashboardTables = {
    overviewData: [],
    usersData: [],
    tripsData: [],
    ridersData: [],
    driversData: [],
    vehiclesData: [],
}

export const dashboardTablesSlice = createSlice({
    name: 'dashboard tables',
    initialState,
    reducers: {
        setTableData<T extends Table>(state: DashboardTables, action: PayloadAction<SetData<T>>) {
            const { table, data } = action.payload;
            state[table] = data;
        },
    }
});

export const {
    setTableData,
} = dashboardTablesSlice.actions;


