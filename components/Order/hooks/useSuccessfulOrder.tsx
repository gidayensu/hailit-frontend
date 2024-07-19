"use client";

//next+redux+helper function +react
import { resetDeliveryChoices } from "@/lib/store/slice/deliveryChoicesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { copyToClipBoard } from "@/lib/utils";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export const useSuccesfulOrder = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const { trip_id, order_success } = useAppSelector((state) => state.newOrder);
  if (!order_success) {
    redirect("/order");
  }

  const dispatch = useAppDispatch();
  
  useEffect(()=> {

      dispatch(resetDeliveryChoices());
  }, [])

  const handleCopyTripId = (tripId: string) => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
    copyToClipBoard(tripId);
  };

  const handleLoading = () => {
    setLoading(true);
  };
  return { loading, copied, trip_id, handleCopyTripId, handleLoading };
};
