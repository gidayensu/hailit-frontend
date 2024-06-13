'use client'
import { useAppSelector } from "@/lib/store/hooks";
import { RxCross2 } from "react-icons/rx";
import { LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LegacyRef } from "react";
import Image from "next/image";
import current_location from '../../public/svg/current-location.svg'
import { LocationType } from "./hook/useMap";

export default function MapModal({modalRef, closeModal, handleSelectedLocation, loading, locationType}: {modalRef: undefined | LegacyRef<HTMLDialogElement>, closeModal: ()=>void, handleSelectedLocation: ()=>void, loading: boolean, locationType:LocationType }) {

  const {dropOffLocationName, pickUpLocationName}  = useAppSelector(state=>state.map);
  return (
    
      <dialog ref={modalRef} className="animate-in zoom-in duration-100  ease-in-out    w-2/3 md:w-1/4  rounded-2xl h-[250px] md:h-[360px] p-4  backdrop:bg-secondary-dark backdrop:opacity-80">
        <div className="w-full flex items-end justify-end">

        <div className="fontbold cursor-pointer  flex justify-center items-center h-6 w-6 rounded-full bg-red-200 text-red-400" onClick={closeModal}><RxCross2 />
        </div>
        </div>
        <div>
        <div className = "flex items-center justify-center mb-2 -mt-4 md:-mt-0">

        <Image
        src={current_location}
        width = {80}
        
        alt=""
        
        />
    </div>
    <div className = "flex items-center justify-center">


        <div className="flex flex-col  gap-2 w-full">
          <div className="">

          <h2 className="text-center leading-5 text-sm mb-2 animate-in slide-in-from-bottom duration-100">Set <b>{locationType === "drop off" ? dropOffLocationName : pickUpLocationName }</b> as your {locationType} location</h2>
          <h3 className="text-center text-[12px] text-slate-500 animate-in slide-in-from-bottom duration-150">This is where your item will be {locationType === "drop off" ? 'delivered': 'picked up'}</h3>
          {/* <LoaderCircle className="animate-spin "/> */}
          </div>
          <div className="mt-4 w-full flex flex-col gap-2 items-center justify-center">

          <Button variant={'default'} className="animate-in slide-in-from-bottom delay-50 w-full" onClick={handleSelectedLocation} disabled={loading}> {loading ? <LoaderCircle className="animate-spin text-white dark:text-secondary-dark "/> : 'Confirm'} </Button>
          <Button variant={'outline'} className="animate-in slide-in-from-bottom delay-75 w-full" onClick={closeModal}> Cancel </Button>
          </div>
        </div>
        </div>
        </div>

      </dialog>

  );
}
