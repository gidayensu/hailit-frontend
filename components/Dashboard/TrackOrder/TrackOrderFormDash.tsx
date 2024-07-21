"use client";

import TrackOrderForm from "@/components/Form/TrackOrderForm";
//hook
import { useGetTrip } from "./StatusSection/hooks/useGetTrip";

export default function TrackOrderFormDash() {
  const { inputRef, handleTrackTrip } = useGetTrip();

  return (
    <main className="flex flex-col gap-5  md:h-full md:mb-0  ">
      <TrackOrderForm inputRef={inputRef} onClickFunc={handleTrackTrip} />
    </main>
  );
}
