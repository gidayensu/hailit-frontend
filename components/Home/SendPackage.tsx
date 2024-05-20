'use client'
import { useState } from "react"
import Container from "../ui/container"
import { AiFillCar } from "react-icons/ai"
import { BsFillPinMapFill } from "react-icons/bs"
import { FaMotorcycle } from "react-icons/fa"
import { RiMapPinRangeLine, RiTreasureMapFill, RiTimerFlashFill, RiTimer2Fill, RiCalendarScheduleFill, RiCaravanFill } from "react-icons/ri"
import { FiCheck } from "react-icons/fi"

export default function SendPackage () {
    const [packageDestination, setPackageDestination] = useState('');
    const [deliveryDay, setDeliveryDay] = useState('');
    const [deliveryMedium, setDeliveryMedium] = useState('')

    const handlePackageDestination = (destination:string)=> {
        setPackageDestination(destination)
    }

    const handleDeliveryDay = (day:string)=> {
        setDeliveryDay(day)
    }

    const handleDeliveryMedium = (medium:string)=> {
        setDeliveryMedium(medium)
    }
    return (
        <>
                  <div className="mt-5 flex flex-col items-center justify-center md:4/6 w-5/6 rounded-2xl gap-3">
            
            <h2 className="font-bold text-xl text-center mb-2"> SELECT PACKAGE DESTINATION</h2>
            <div className="flex flex-col md:flex-row md:w-4/6 w-full items-center justify-center gap-2 md:items-start">
              <div  className="w-full md:w-1/3" onClick={()=>handlePackageDestination("Accra")}>
                <Container className={`flex flex-col  justify-center items-center gap-3  h-40  md:h-44  rounded-xl  cursor-pointer ${packageDestination === 'Accra' || !packageDestination  ? '': 'text-slate-300 opacity-60'}`}>
                  
                  <BsFillPinMapFill className={`text-4xl ${packageDestination === 'Accra' || !packageDestination  ? 'text-blue-500': 'text-slate-300'}`}/>
                    <p className="font-bold md:text-lg">ACCRA</p>
                    <p className="text-sm md:text-md relative">Accra or Tema suburb</p>
                    <span
                      className={`flex items-center justify-center -mt-2  border border-rose-500   md:h-8 md:w-8 h-6 w-6 rounded-full    ${
                        packageDestination === 'Accra'
                          ? "bg-rose-500 text-white"
                          : "hidden"
                      }`}
                    >
                      <FiCheck className={`${packageDestination !== 'Accra' && 'hidden'}`} />
                    </span>
                  
                </Container>
              </div>

              <div className="w-full md:w-2/3 flex gap-3" >
              <div className="w-full md:w-1/2" onClick={()=>handlePackageDestination("Kumasi")}>
                <Container className={`flex flex-col justify-center items-center  gap-3 w-full  h-40 md:h-44 rounded-xl cursor-pointer ${packageDestination === 'Kumasi' || !packageDestination  ? '': 'text-slate-300 opacity-60'}`}>
                  <RiMapPinRangeLine className={`text-4xl ${packageDestination === 'Kumasi' || !packageDestination  ? 'text-blue-500': 'text-slate-300'}`}/>
                    <p className="font-bold md:text-lg">KUMASI</p>
                    <p className="text-sm md:text-md">Abuakwa, Ejisu, etc</p>
                    <span
                      className={`flex items-center justify-center -mt-2  border border-rose-500   md:h-8 md:w-8 h-6 w-6 rounded-full    ${
                        packageDestination === 'Kumasi'
                          ? "bg-rose-500 text-white"
                          : "hidden"
                      }`}
                    >
                      <FiCheck className={`${packageDestination !== 'Kumasi' && 'hidden'}`} />
                    </span>
                </Container>
                </div>
                <div className="w-full md:w-1/2" onClick={()=>handlePackageDestination("Inter city")}>

                <Container className={`flex flex-col justify-center items-center  gap-3 w-full  h-40 md:h-44 rounded-xl ${packageDestination === 'Inter city' || !packageDestination  ? '': 'text-slate-300 opacity-60'} cursor-pointer`}>
                    <RiTreasureMapFill className={`text-4xl ${packageDestination === 'Inter city' || !packageDestination  ? 'text-blue-500': 'text-slate-300'}`}/>
                    <p className="font-bold md:text-lg">INTERCITY</p>
                    <p className="text-sm md:text-md">Accra - Kumasi</p>
                    <span
                      className={`flex items-center justify-center -mt-2  border border-rose-500   md:h-8 md:w-8 h-6 w-6 rounded-full    ${
                        packageDestination === 'Inter city'
                          ? "bg-rose-500 text-white"
                          : "hidden"
                      }`}
                    >
                      <FiCheck className={`${packageDestination !== 'Inter city' && 'hidden'}`} />
                    </span>
                  
                </Container>
                </div>
              </div>
              
            </div>
          </div>

          {/* Delivery Day */}
            
            { packageDestination && 
            <>
            <div className="mt-5 flex flex-col items-center justify-center md:4/6 w-5/6 rounded-2xl gap-3">
            <h2 className="font-bold text-xl text-center my-2"> SELECT DELIVERY DAY</h2>


            <div className="flex w-full md:flex-row md:w-4/6 items-center justify-center gap-2 md:items-start">

                <div className="w-full" onClick={()=>handleDeliveryDay("Today")}>

              <Container className={`flex flex-col items-center justify-center w-full h-[150px] md:h-40  rounded-lg p-3 ${deliveryDay === 'Today' || !deliveryDay  ? '': 'text-slate-300 opacity-60'} cursor-pointer`}>
                <RiTimerFlashFill className={`text-3xl mb-2 ${deliveryDay === 'Today' || !deliveryDay  ? 'text-blue-600': 'text-slate-300'}`}/>
                <p className="font-bold text-[12px] md:text-sm">TODAY</p>
                <p className="text-[12px] md:text-lg">
                  from <b>GHS 30</b>
                </p>
                <span
                      className={`flex items-center justify-center mt-1  border border-rose-500 md:h-8 md:w-8 h-6 w-6 rounded-full    ${
                        deliveryDay === 'Today'
                          ? "bg-rose-500 text-white"
                          : "hidden"
                      }`}
                    >
                      <FiCheck className={`${deliveryDay !== 'Today' && 'hidden'}`} />
                    </span>
              </Container>
                </div>
                <div className="w-full" onClick={()=>handleDeliveryDay("Tomorrow")}>
              <Container className={`flex flex-col items-center justify-center w-full h-[150px] md:h-40  rounded-lg p-3 ${deliveryDay === 'Tomorrow' || !deliveryDay  ? '': 'text-slate-300 opacity-60'} cursor-pointer`}>
                <RiTimer2Fill className={`text-3xl mb-2 ${deliveryDay === 'Tomorrow' || !deliveryDay  ? 'text-blue-600': 'text-slate-300'}`}/>
                <p className="font-bold text-[12px] md:text-sm">MORRO</p>
                <p className="text-[12px] md:text-lg">
                  from <strong>GHS 20</strong>
                </p>
                <span
                      className={`flex items-center justify-center mt-1  border border-rose-500 md:h-8 md:w-8 h-6 w-6 rounded-full    ${
                        deliveryDay === 'Tomorrow'
                          ? "bg-rose-500 text-white"
                          : "hidden"
                      }`}
                    >
                      <FiCheck className={`${deliveryDay !== 'Tomorrow' && 'hidden'}`} />
                    </span>
              </Container>
            </div>
            
            <div className="w-full" onClick={()=>handleDeliveryDay("Schedule")}>
              <Container className={`flex flex-col items-center justify-center w-full h-[150px] md:h-40  rounded-lg p-3 ${deliveryDay === 'Schedule' || !deliveryDay  ? '': 'text-slate-300 opacity-60'} cursor-pointer`}>
                <RiCalendarScheduleFill className={`text-3xl mb-2 ${deliveryDay === 'Schedule' || !deliveryDay  ? 'text-blue-600': 'text-slate-300'}`}/>
                <p className="font-bold text-[12px] md:text-sm">SCHEDULE</p>
                <p className="text-[12px] md:text-lg">
                  from <strong>GHS 20</strong>
                </p>
                <span
                      className={`flex items-center justify-center mt-1  border border-rose-500 md:h-8 md:w-8 h-6 w-6 rounded-full    ${
                        deliveryDay === 'Schedule'
                          ? "bg-rose-500 text-white"
                          : "hidden"
                      }`}
                    >
                      <FiCheck className={`${deliveryDay !== 'Schedule' && 'hidden'}`} />
                    </span>
              </Container>
              </div>
            </div>
          </div >
          </>}

          {/* Delivery Medium */}
          {deliveryDay && <>
          <div className="mt-5 flex flex-col items-center justify-center md:4/6 w-5/6 rounded-2xl gap-3">
            <h2 className="font-bold text-xl text-center my-2"> SELECT DELIVERY MODE</h2>
            <div className="flex w-full md:flex-row md:w-4/6 items-center justify-center gap-2 md:items-start">

            <div className="w-full" onClick={()=>handleDeliveryMedium("Truck")}>
              <Container className="flex flex-col items-center justify-center w-full h-[150px] md:h-40  rounded-lg p-3">
                <RiCaravanFill className={`text-3xl mb-2 ${deliveryMedium === 'Truck' || !deliveryMedium  ? 'text-blue-600': 'text-slate-300'}`}/>
                <p className="font-bold text-[12px] md:text-sm">TRUCK</p>
                <span
                      className={`flex items-center justify-center mt-1  border border-rose-500 md:h-8 md:w-8 h-6 w-6 rounded-full    ${
                        deliveryMedium === 'Truck'
                          ? "bg-rose-500 text-white"
                          : "hidden"
                      }`}
                    >
                      <FiCheck className={`${deliveryMedium !== 'Truck' && 'hidden'}`} />
                    </span>
              </Container>
              </div>
            
              <div className="w-full" onClick={()=>handleDeliveryMedium("Car")}>
              <Container className="flex flex-col items-center justify-center w-full h-[150px] md:h-40  rounded-lg p-3">
                <AiFillCar className={`text-3xl mb-2 ${deliveryMedium === 'Car' || !deliveryMedium  ? 'text-blue-600': 'text-slate-300'}`}/>
                <p className="font-bold text-[12px] md:text-sm">CAR</p>
                <span
                      className={`flex items-center justify-center mt-1  border border-rose-500 md:h-8 md:w-8 h-6 w-6 rounded-full    ${
                        deliveryMedium === 'Car'
                          ? "bg-rose-500 text-white"
                          : "hidden"
                      }`}
                    >
                      <FiCheck className={`${deliveryMedium !== 'Car' && 'hidden'}`} />
                    </span>
              </Container>
              </div>

              <div className="w-full" onClick={()=>handleDeliveryMedium("Motor")}>
              <Container className="flex flex-col items-center justify-center w-full h-[150px] md:h-40  rounded-lg p-3">
                <FaMotorcycle className={`text-3xl mb-2 ${deliveryMedium === 'Motor' || !deliveryMedium  ? 'text-blue-600': 'text-slate-300'}`}/>
                <p className="font-bold text-[12px] md:text-sm">MOTOR</p>
                <span
                      className={`flex items-center justify-center mt-1  border border-rose-500 md:h-8 md:w-8 h-6 w-6 rounded-full    ${
                        deliveryMedium === 'Motor'
                          ? "bg-rose-500 text-white"
                          : "hidden"
                      }`}
                    >
                      <FiCheck className={`${deliveryMedium !== 'Motor' && 'hidden'}`} />
                    </span>
              </Container>
              </div>
            </div>
          </div>
          </>}
          </>
    )
}