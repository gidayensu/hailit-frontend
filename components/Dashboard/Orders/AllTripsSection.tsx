"use client";
import { useState } from "react";
import { AllTripsData } from "./AllTripsTable";
import AddTrip from "./AddTrip";
export default function AllTripsSection() {
  const [addTrip, setAddTrip] = useState<boolean>(() => {
    const saved = localStorage.getItem('addTrip');
    return saved !== null ? JSON.parse(saved) : false;
  });

  const toggleAddTrip = () => {
    setAddTrip((prevAddTrip) => {
      const newAddTrip = !prevAddTrip;
      localStorage.setItem('addTrip', JSON.stringify(newAddTrip));
      return newAddTrip;
    });
  };


  return (
    <>
      {!addTrip && <AllTripsData setAddTrip={toggleAddTrip} />}

      {addTrip && <AddTrip setAddTrip={toggleAddTrip}/>}
    </>
  );
}
