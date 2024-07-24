"use client";
//images
import parcel from "../../public/images/parcel.png";
import track from "../../public/images/track.png";
//components
import { HomeOptions } from "./HomeOptions";
import { useHomeOrder } from "./hooks/useHomeOrder";

export default function OtherActions() {
  const {handleLoading, loading, selected} = useHomeOrder();
  return (
    <main className="md:w-5/6 w-full flex flex-col items-center justify-center my-3">
      <section className="w-5/6 md:w-4/6">
        <span className="w-full font-bold">
          <p>Other Actions</p>
        </span>
        <section className="grid  grid-cols-2 gap-3 w-full mt-2">
          <HomeOptions
            image={parcel}
            title="New Delivery"
            handleLoading={handleLoading}
            selected={selected}
            loading={loading}
          />
          <HomeOptions
            image={track}
            title="Track Order"
            handleLoading={handleLoading}
            selected={selected}
            loading={loading}
          />
          
        </section>
      </section>
    </main>
  );
}
