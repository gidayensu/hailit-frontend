"use client";
import { useState } from "react";
import { AllTripsData } from "./AllTripsTable";
import AddTrip from "./AddTrip";
export default function AllTripsSection() {
  const [addTrip, setAddTrip] = useState<boolean>(false);
  return (
    <>
      {!addTrip && <AllTripsData setAddTrip={setAddTrip} />}

      {addTrip && <AddTrip />}
    </>
  );
}
