import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//HAVE TO DEFINE TYPES FOR TRIPS, RIDERS, ETC. TO USE THEM HERE


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
    overviewData: any, 
    usersData: any, 
    tripsData: any,
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

        setOverviewData (state, action:PayloadAction<any>) {
            state.overviewData = action.payload           
            
        },
        setTableData (state, action:PayloadAction<SetData>) {
            const {table} = action.payload
            const {data} = action.payload;
            state[table] = data           
            
        },
        setUsersData(state, action:PayloadAction<any>) {
            state.usersData = action.payload
        },
        setTripsData (state, action:PayloadAction<any>) {
            state.tripsData = action.payload           
        },

        setDriversData (state, action:PayloadAction<any>) {
            state.driversData = action.payload           
            
        },
        setRidersany (state, action:PayloadAction<any>) {
            state.ridersData = action.payload           
            
        },
        setVehiclesData (state, action:PayloadAction<any>) {
            state.vehiclesData = action.payload
        },

        deleteFromData(state, action:PayloadAction<DeleteData>) {
            const {table} = action.payload
            const {dataId} = action.payload
            state[table] = state[table].filter((item:any) => item.id !== dataId);
        }
        
        
    }
})

export const {setDriversData, setOverviewData, setRidersany, setTripsData, setUsersData, setVehiclesData, setTableData} = dashboardTablesSlice.actions