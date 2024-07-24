"use client";
import movers from "../../public/images/bulk.png";
import custom from "../../public/images/custom.png";
import express from "../../public/images/express.png";
import intercity from "../../public/images/intercity.png";
import { HomeOptions } from "./HomeOptions";
import { useHomeOrder } from "./hooks/useHomeOrder";
import { workPeriod } from "@/lib/utils";
export default function QuickOrder() {
  const {handleLoading, loading, selected} = useHomeOrder();
  return (
    <main className="md:w-5/6 w-full flex flex-col items-center justify-center my-3">
      <section className="w-5/6 md:w-4/6">
        <span className="w-full font-bold">
          <p>Quick Delivery</p>
        </span>
        <section className="grid  grid-cols-2 grid-rows-2 gap-3 w-full mt-2">
          <HomeOptions
            image={express}
            title="Express"
            handleLoading={handleLoading}
            selected={selected}
            loading={loading}
            disabled = {!workPeriod()}
          />
          <HomeOptions
            image={intercity}
            title="Inter City"
            handleLoading={handleLoading}
            selected={selected}
            loading={loading}
          />
          <HomeOptions
            image={movers}
            title="Movers"
            handleLoading={handleLoading}
            selected={selected}
            loading={loading}
          />
          <HomeOptions
            image={custom}
            title="Custom"
            handleLoading={handleLoading}
            selected={selected}
            loading={loading}
          />
        </section>
      </section>
    </main>
  );
}
