'use client'
import { RxCross2 } from "react-icons/rx";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRef, useState } from "react";
import current_location from '../../../public/svg/current-location.svg';
export default function SearchLocation() {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDialogElement | null> (null);
  const modal = modalRef.current;
  const handleToast = () => {
    setModalIsOpen(true);
    if(modalIsOpen) {
      modal?.showModal();
    }
    
    
  };
  const closeModal = ()=> {
    if(modalIsOpen) {
      modal?.close()
    }
  }
  return (
    <main className="flex flex-col items-center transition: transform justify-center p-4 ">
      <Button onClick={handleToast}>slkslfdsdf</Button>
      <button className="animate-bounce ease-linear ...">Button A</button>
<button className="animate-bounce ease-in ...">Button B</button>
<button className="animate-bounce ease-out ...">Button C</button>
<button className="animate-in slide-in-from-top  ease-in-out ">Button C</button>
      <dialog ref={modalRef} className="animate-in zoom-in-50  ease-in-out  w-2/3 md:w-1/6  rounded-2xl h-1/3 md:h-[360px] p-4  backdrop:bg-secondary-dark backdrop:opacity-80">
      <div className="w-full flex justify-end items-end">

<div className="fontbold  cursor-pointer  flex justify-center items-center h-6 w-6 rounded-full bg-red-200 text-red-400" onClick={closeModal}>
  <RxCross2 />
</div>
</div>
      <div>

<div className="flex items-center justify-center">

<Image
src={current_location}
width = {80}

alt=""
className=""
/>
</div>

<div className = "flex items-center justify-center">

<div className="flex flex-col  gap-2 w-full">
  <div className="">

  <h2 className="text-center leading-5 text-sm mb-2 animate-in slide-in-from-bottom">Set <b>{`locationType === "drop off" ? dropOffLocationName : pickUpLocationName `}</b> as your {`locationType`} location</h2>
  <h3 className="text-center text-[12px] text-slate-500 animate-in slide-in-from-bottom delay-20">This is where your item will be </h3>
  {/* <LoaderCircle className="animate-spin "/> */}
  </div>
  <div className="mt-2 w-full flex flex-col gap-2 items-center justify-center">

  <Button variant={'default'} className="animate-in slide-in-from-bottom delay-50 w-full" > {`loading `} </Button>
  <Button variant={'outline'} className="animate-in slide-in-from-bottom delay-75 w-full" > Cancel </Button>
  </div>
</div>
</div>

      </div>
</dialog>
    </main>
  );
}
