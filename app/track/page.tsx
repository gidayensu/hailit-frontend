import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoIosInformationCircle } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import Container from "@/components/ui/container";
import TopSectionContainer from "@/components/Shared/TopSectionContainer";
import MiddleSectionContainer from "@/components/Shared/MiddleSectionContainer";
import { FaWhatsapp } from "react-icons/fa";
import TrackOrder from "@/components/Order/TrackOrder/UserTrackOrder";
export default function TrackDelivery() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 mb-20">
      <TopSectionContainer className="flex flex-col items-start justify-center gap-2 w-full h-80 bg-slate-800  p-4 text-white ">
        <span className="text-7xl font-bold">Track</span>
        <p className="text-3xl">Your Deliveries</p>
      </TopSectionContainer>

      <MiddleSectionContainer className="flex flex-col justify-start items-center  p-5">
          
      
      <TrackOrder/>    </MiddleSectionContainer>
    </main>
  );
}

