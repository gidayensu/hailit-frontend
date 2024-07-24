"use client";
import TrackOrderForm from "@/components/Form/TrackOrderForm";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineLocalPhone } from "react-icons/md";
import { useUserTrackOrder } from "./hooks/useUserTrackOrder";
import Link from "next/link";

export default function TrackOrder() {
  const { handleTrackTrip, inputRef } = useUserTrackOrder();

  return (
    <>
      <TrackOrderForm onClickFunc={handleTrackTrip} inputRef={inputRef} />

      <span className="flex items-start justify-start">
        <h3 className="font-bold  text-lg mt-4 -mb-1">Additional Tracking</h3>
      </span>

      <Container className="flex flex-col items-center justify-center rounded-xl h-auto p-4 gap-3 w-full md:w-[350px]">
        <p className="text-center">
          Could not find package or cannot reach assigned courier?
        </p>
        <div className="w-full flex items-center justify-center gap-2 ">

        <Link href={'tel:+233291546476'} className="max-w-w-1/3 flex items-center justify-center">
        <Button variant={"outline"} className="hover:bg-primary-color hover:text-white">
          <MdOutlineLocalPhone className="text-lg " /> Call
        </Button>
        </Link>

      <Link href={'https://wa.me/+233291546476'} className="max-w-2/3 flex items-center justify-center ">
        <Button className=" hover:bg-green-500 hover:text-white text-green-500 bg-white border border-green-500">
          <FaWhatsapp className="text-lg " /> WhatsApp
        </Button>
      </Link>
        </div>
      </Container>
    </>
  );
}
