//while shadcn's modal/dialog is mainly used, there are cases where auto-matic opening of the dialog is needed. This modal component is used in such situations.
"use client";
import { Button } from "@/components/ui/button";
import { LegacyRef } from "react";
import { MdOutlineError } from "react-icons/md";
import { PiCheckCircleFill } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { TiWarning } from "react-icons/ti";

export default function SecondaryModal({
  modalRef,  closeModal,
  isSuccess,
  error,
  info,
  note
}: {
  modalRef: undefined | LegacyRef<HTMLDialogElement>;
  closeModal: () => void;
  isSuccess?: boolean;
  error?: any;
  note?: boolean,
  info?: string | React.ReactNode;
}) {
  return (
    <dialog
      ref={modalRef}
      className="animate-in zoom-in duration-100  ease-in-out  w-2/3 md:w-1/5  rounded-2xl  max-h-96  p-4  backdrop:bg-secondary-dark backdrop:opacity-80 dark:bg-primary-dark"
    >
      <div className="w-full flex items-end justify-end">
        <div
          className="fontbold cursor-pointer  flex justify-center items-center h-6 w-6 rounded-full hover:dark:bg-secondary-dark dark:text-white text-secondary-dark"
          onClick={closeModal}
        >
          <RxCross2 />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-center mb-2 -mt-4 md:-mt-0"></div>
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center justify-center w-full">
            {isSuccess && (
              <span className="mb-4 flex items-center justify-center h-9 w-9 rounded-full bg-green-200">
                <PiCheckCircleFill className="text-green-500 text-2xl" />
              </span>
            )}
            {note && (
              <span className="mb-4 flex items-center justify-center  rounded-full">
                <TiWarning className="text-amber-500 text-4xl" />
              </span>
            )}
            {error && (
              <span className="mb-4 flex items-center justify-center h-9 w-9 rounded-full bg-red-200">
                <MdOutlineError className="text-red-500 text-2xl" />
              </span>
            )}
            <div className="">
              <p className="text-center  text-sm md:text-md mb-2 animate-in slide-in-from-bottom duration-100">
                {info}
              </p>

              
            </div>
            <div className="mt-4 w-full flex flex-col gap-2 items-center justify-center">
              <Button
                variant={"default"}
                className="animate-in slide-in-from-bottom delay-75 w-1/2 "
                onClick={closeModal}
              >
                
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
