import { useAppSelector } from "@/lib/store/hooks";
import { redirect } from "next/navigation";
import MainMap from "./MainMap";

export default function DropOffMap() {
  const { trip_medium, trip_area, trip_type } = useAppSelector(
    (state) => state.deliveryChoices
  );

  if (!trip_medium || !trip_area || !trip_type) {
    return redirect("/order");
  }

  return (
    <MainMap locationType="drop off"/>  );
}
