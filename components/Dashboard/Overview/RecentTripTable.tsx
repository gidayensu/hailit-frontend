'use client'
import { useGetAllTripsQuery } from "@/lib/store/apiSlice/hailitApi";

import SkeletonTable from "../SkeletonTable";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
import { extractDateWithDayFomDate } from "@/lib/utils";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { setActiveSection, setSelectedTripId, setTrackingOrder } from "@/lib/store/slice/dashboardSlice";

export function RecentTripTable() {
    
  const dispatch = useAppDispatch();
  
  const handleTrackTrip = (tripId:string)=> {
    dispatch(setActiveSection('Track Order'))
    dispatch (setTrackingOrder(true))
    dispatch (setSelectedTripId(tripId))
  }  
  const {data, isLoading, error} = useGetAllTripsQuery(`trips?limit=7`);
    
    let trips = [];
    if (data) {
      trips = data.trips;
    }

    if (error) {
      return <div>
        <p className="text-3xl font-bold flex flex-col items-center justify-center"> Error occurred!...Our Fault</p>
        <p>We are fixing it</p>
      </div>
    }
    return (
      <Table>
    
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Trip id</TableHead>
            
            <TableHead>Booked On</TableHead>
            <TableHead>Pickup</TableHead>
            
            <TableHead>Drop off</TableHead>
            
            <TableHead>Delivered On</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead >Payment Status</TableHead>
            
            <TableHead >Delivery Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            isLoading && <SkeletonTable rows={7} cells={8}/>
          }
          {data && trips.map((trip:any) => (
            
            <TableRow key={trip.trip_id} onClick={()=>handleTrackTrip(trip.trip_id)}>
              <TableCell className="font-medium">{trip.trip_id} </TableCell>
              
              <TableCell>{extractDateWithDayFomDate(trip.trip_request_date)} </TableCell>
              <TableCell>{trip.pickup_location}</TableCell>
              
              <TableCell>{trip.drop_off_location}</TableCell>
              
              <TableCell>{trip.trip_completion_date ? extractDateWithDayFomDate(trip.trip_completion_date): 'TBD'}</TableCell>
              <TableCell>{trip.trip_cost}</TableCell>
              <TableCell className="">
                <div className={`flex item-center justify-center rounded-md w-16 text-white text-[12px] ${trip.paymentStatus ? 'bg-green-600 ': 'bg-red-500 '}`}>
                    <p>
                        {trip.payment_status? 'Paid' : 'Not Paid'}
                    </p>
                </div>
                </TableCell>
              
              <TableCell><div className={`flex item-center justify-center rounded-md w-16 text-white text-[12px] ${trip.trip_status === "Delivered"
                ? "  bg-green-500"
                : trip.trip_status === "Picked Up"
                ? "  bg-sky-600"
                : trip.trip_status === "In Transit"
                ? " bg-amber-500 "
                : trip.trip_status === "New"
                ? " bg-slate-600 dark:text-slate-50"
                : " bg-red-500"}`}>
                    <p>
                        {trip.trip_status}
                    </p>
                </div></TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  
  