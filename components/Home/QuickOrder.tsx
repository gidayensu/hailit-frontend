'use client'
import Container from "../ui/container";
import Image, { StaticImageData } from "next/image";
import express from '../../public/images/express.png'
import intercity from '../../public/images/intercity.png'
import movers from '../../public/images/bulk.png'
import custom from '../../public/images/custom.png'
import Loader from "../Shared/Loader";
import { useState } from "react";
import { useAppDispatch } from "@/lib/store/hooks";
import { setTripArea,  setTripMedium, setScheduled, setTripType  } from "@/lib/store/slice/deliveryChoicesSlice";
import { useRouter } from "next/navigation";


export default function QuickOrder (){
    const [loading, setLoading] = useState<boolean>(false);
    const [selected, setSelected] = useState<DeliveryOptions>('');

    const router = useRouter();
    const dispatch = useAppDispatch();
    
    const handleLoading = (selected:DeliveryOptions)=> {
        setLoading(true)
        setSelected(selected)
        
        if(selected === "Express") {
            dispatch(setTripMedium("Motor"))
            dispatch(setTripArea("Accra"))
            dispatch(setTripType("Same Day"))
        }
        if(selected === "Inter City") {
            dispatch(setTripMedium("Car"))
            dispatch(setTripArea("Inter City"))
            dispatch(setTripType("Scheduled"))
        }
        if(selected === "Movers") {
            dispatch(setTripArea("Accra"))
            dispatch(setTripMedium("Truck"))
            dispatch(setTripType("Scheduled"))
        }
        router.push('/order/new')
    }
    return (
        <main className="md:w-5/6 w-full flex flex-col items-center justify-center my-3">
            <section className="w-5/6 md:w-4/6">

            <span className="w-full font-bold">
                <p>Quick Delivery</p> 
                </span>
            <section className="grid  grid-cols-2 grid-rows-2 gap-3 w-full mt-2">
                <QuickOrderOptions image={express} title="Express" handleLoading={handleLoading} selected={selected} loading={loading} />
                <QuickOrderOptions image={intercity} title="Inter City"handleLoading={handleLoading} selected={selected} loading={loading} />
                <QuickOrderOptions image={movers} title="Movers" handleLoading={handleLoading} selected={selected} loading={loading} />
                <QuickOrderOptions image={custom} title="Custom" handleLoading={handleLoading} selected={selected} loading={loading} />
                
                
            </section>
            </section>
        </main>
    )
}

type DeliveryOptions = "Express" | "Inter City" | "Custom" | "Movers" | ''

const QuickOrderOptions = ({image, title, selected, loading, handleLoading}:{image:StaticImageData, title:DeliveryOptions, selected: DeliveryOptions, loading:boolean, handleLoading:(selected:DeliveryOptions)=>void})=> {
    return (
        <Container className="flex flex-col items-center justify-end w-full h-36 md:h-52 rounded-xl  hover:opacity-80 cursor-pointer relative font-medium" onClickFunc={()=>handleLoading(title)}>
            {title === selected && loading &&

            <div className="right-0 left-0 top-0 bottom-0 mt-1 ml-1 absolute">

            <Loader color="primary"/>
            </div>
            }

            <div className="md:w-44 w-32 flex items-center justify-center">

                    <Image
                    src={image}
                    alt={`image`}
                    
                    >
                        </Image> 
            </div>
                    <div className="w-full bg-primary-color rounded-xl shadow-md h-10 flex items-center justify-center text-white text-sm">
                           {title}
                    </div>
                </Container>
    )
}