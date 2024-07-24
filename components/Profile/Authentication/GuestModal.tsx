"use client";
import { Modal } from "@/components/Shared/Modal";
import { Button } from "../../ui/button";

// next
import Link from "next/link";

export default function GuestModal() {
  return (
    <Modal
      dialogTriggerElement={
        <div className="mt-2 border w-full border-slate-300  rounded-xl flex items-center justify-center h-12  text-primary-color bg-white hover:bg-blue-100 hover:text-blue-900 dark:border-2 dark:text-primary-color dark:border-primary-color dark:bg-transparent dark:hover:bg-primary-medium dark:hover:text-slate-50">
          Continue as Guest
        </div>
      }
    >
      <div className="flex flex-col gap-2 mt-4">
        <Link href={"/order"} className="w-full ">
          <Button
            
            className="w-full border border-slate-300 h-12 flex gap-4"
          >
            New Delivery
          </Button>
        </Link>
        <Link href={"/track"} className="w-full ">
          <Button
            variant="outline"
            className="w-full border border-slate-300 h-12 flex gap-4"
          >
            Track Order
          </Button>
        </Link>
      </div>
    </Modal>
  );
}
