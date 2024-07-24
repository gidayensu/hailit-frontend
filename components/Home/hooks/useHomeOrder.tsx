'use client'
import { useAppDispatch } from "@/lib/store/hooks";
import { setTripMedium, setTripArea, setTripType, resetDeliveryChoices } from "@/lib/store/slice/deliveryChoicesSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DeliveryOptions } from "../HomeOptions";

export const useHomeOrder = ()=> {
    const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<DeliveryOptions>("");

  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLoading = (selected: DeliveryOptions) => {
    setLoading(true);
    setSelected(selected);

    if (selected === "Track Order") {
      return router.push("/track")
    }
    if (selected === "Express") {
      dispatch(setTripMedium("Motor"));
      dispatch(setTripArea("Accra"));
      dispatch(setTripType("Same Day"));
    }
    
    if (selected === "Inter City") {
      dispatch(setTripMedium("Car"));
      dispatch(setTripArea("Inter City"));
      dispatch(setTripType("Scheduled"));
    }
    if (selected === "Movers") {
      dispatch(setTripArea("Accra"));
      dispatch(setTripMedium("Truck"));
      dispatch(setTripType("Scheduled"));
    }
    if (selected === "New Delivery" || selected === "Custom") {
      dispatch(resetDeliveryChoices());
    }
    router.push("/order/new");
  };
  return {handleLoading, loading, selected}
}