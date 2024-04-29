"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SelectDate } from "@/components/order-components/select-date";
import { SelectDeliveryType } from "@/components/order-components/select-delivery-type";

export default function CustomOrder() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center gap-10 ">
        <div className="flex flex-col items-start justify-center gap-2 w-full h-80 bg-slate-800  p-4 text-white ">
          <span className="text-5xl font-bold">Custom Order</span>
          <p className="text-lg">Schedule your order</p>
        </div>

        <div className="flex flex-col justify-center items-center gap-6 bg-white w-full -mt-20 rounded-tr-[50px] p-10">
          
          <form className="w-full space-y-6">
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <h3 className="mb-4 text-lg font-medium">Pickup Date</h3>
                <SelectDate />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <h3 className="mb-4 text-lg font-medium">Delivery Type</h3>
                <SelectDeliveryType />
            </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <h3 className="mb-4 text-lg font-medium">Pickup Location</h3>
                <Input
                  type="text"
                  placeholder="Enter location for pickup"
                  className="h-14"
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <h3 className="mb-4 text-lg font-medium">Pickup Contact</h3>
                <Input
                  type="text"
                  placeholder="Enter number to call for pickup"
                  className="h-14"
                />
            
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <h3 className="mb-4 text-lg font-medium">
                Destination / Drop off
              </h3>
              <Input
                type="text"
                placeholder="Enter location for drop off"
                className="h-14"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <h3 className="mb-4 text-lg font-medium">Sender Number</h3>
              <Input
                type="number"
                placeholder="Enter number of sender"
                className="h-14"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <h3 className="mb-4 text-lg font-medium">Receiver Number</h3>
              <Input
                type="number"
                placeholder="Enter number of recipient"
                className="h-14"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <h3 className="mb-4 text-lg font-medium">Upload Product Image (optional)</h3>
                <Input id="picture" type="file" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <h3 className="mb-4 text-lg font-medium">Additional Information</h3>
                <Input  type="text" className="h-32"/>
            </div>
            

            <Button type="submit" className="w-full h-14">
              Proceed
            </Button>
          </form>
        </div>
      </main>
    </>
  );
}
