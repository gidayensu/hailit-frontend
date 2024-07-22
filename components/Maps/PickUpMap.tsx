import { useAppSelector } from "@/lib/store/hooks";
import MainMap from "./MainMap";
import { redirect } from "next/navigation";

export default function PickUpMap() { 

  const { trip_medium, trip_area, trip_type } = useAppSelector(
    (state) => state.deliveryChoices
  );

  if (!trip_medium || !trip_area || !trip_type) {
    return redirect("/order");
  }

  return (
    <MainMap locationType="pickup"/>  );  ;
}
