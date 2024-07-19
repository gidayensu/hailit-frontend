import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//HAVE TO DEFINE TYPES FOR TRIPS, RIDERS, ETC. TO USE THEM HERE

import { Trip } from "./tripSlice";
type Table = "overviewData" | "usersData" | "tripsData" | "vehiclesData" | "ridersData" | "driversData";

interface DeleteData {
    table: Table,
    dataId: string
}

interface SetData {
    table: Table,
    data: any,
}
export interface DashboardTables {
    overviewData: Trip[], 
    usersData: any, 
    tripsData: Trip[],
    ridersData: any, 
    driversData: any, 
    vehiclesData: any
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

       
        setTableData (state, action:PayloadAction<SetData>) {
            const {table} = action.payload
            const {data} = action.payload;
            state[table] = data           
            
        },
        

        deleteFromData(state, action:PayloadAction<DeleteData>) {
            const {table} = action.payload
            const {dataId} = action.payload
            state[table] = state[table].filter((item:any) => item.id !== dataId);
        }
        
        
    }
})

export const {

  setTableData,
} = dashboardTablesSlice.actions;