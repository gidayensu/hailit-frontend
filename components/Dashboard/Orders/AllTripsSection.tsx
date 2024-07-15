"use client";
import { useState } from "react";
import { AllTripsTable } from "./AllTripsTable";
import AddTrip from "./AddOrder";
export default function AllTripsSection() {
  const [addTrip, setAddOrder] = useState<boolean>(() => {
    const saved = localStorage.getItem('addTrip');
    return saved !== null ? JSON.parse(saved) : false;
  });

  const toggleAddTrip = () => {
    setAddOrder((prevAddTrip) => {
      const newAddTrip = !prevAddTrip;
      localStorage.setItem('addTrip', JSON.stringify(newAddTrip));
      return newAddTrip;
    });
  };


  return (
    <>
      {!addTrip && <AllTripsTable />}

      {addTrip && <AddTrip />}
    </>
  );
}
