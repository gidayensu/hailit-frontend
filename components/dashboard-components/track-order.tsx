//ui + icons
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { Button } from "../ui/button";
import Container from "../ui/container";
import { GoChecklist, GoX } from "react-icons/go";
import { GrFormCheckmark } from "react-icons/gr";
import { TbArrowsExchange } from "react-icons/tb";
import {  PiArticle, PiCodesandboxLogo } from "react-icons/pi";
import { PiReceiptDuotone } from "react-icons/pi";
import { LiaMotorcycleSolid } from "react-icons/lia";
import { Separator } from "../ui/separator";

// type OrderStatus = "Booked" | "Picked Up" | "In Transit" | "Delivered" | "Cancelled";
type OrderStatus = string;
export default function TrackOrder () {
    const currentOrderStatus:OrderStatus = "Cancelled"
    let currentOrderStage = 1;
    currentOrderStatus === "Booked" ? currentOrderStage : currentOrderStatus === "Picked Up" ? currentOrderStage = 2 : currentOrderStatus === "In Transit" ? currentOrderStage = 3 : currentOrderStatus === "Delivered" ? currentOrderStage = 4 : currentOrderStage
    return (
      <main className="flex flex-col gap-5">
        {/* HEADER */}
        <article className="flex flex-col gap-2">
          <section className="flex gap-2 text-2xl mb-2">
            <h2> Order:</h2>
            <h1 className="font-bold">#92GHS-345</h1>
          </section>
          <section className="flex gap-3">
            
            <Button
              className="flex items-center justify-center gap-2"
              variant={"outline"}
            >
              <AiOutlineEdit className="text-xl" />
              <p>Edit Order</p>
            </Button>
            <Button
              className="flex items-center justify-center gap-2"
              variant={"destructive"}
            >
              <MdDeleteOutline className="text-xl" />
              <p>Deleted Order</p>
            </Button>
          </section>
        </article>

        {/* DELIVERY STATUS */}
        <article className="flex flex-col lg:flex-row w-full gap-4">
          <Container className="flex flex-col  w-full lg:w-3/6 h-52 rounded-lg p-3 gap-2">
            {/* order status */}
            <h3 className="font-bold">ORDER STATUS</h3>
            <h3 className="text-[12px] text-slate-400 -mt-3">
              Current Order Status
            </h3>
            {/* booked */}

            <div className="flex">
              <OrderStatusElement
                orderStatus="Booked"
                currentOrderStage={currentOrderStage}
                orderStage={1}
              >
                <PiArticle className="text-3xl" />
              </OrderStatusElement>

              <OrderStatusElement
                orderStatus="Picked Up"
                currentOrderStage={currentOrderStage}
                orderStage={2}
              >
                <PiCodesandboxLogo className="text-3xl" />
              </OrderStatusElement>

              <OrderStatusElement
                orderStatus="In Transit"
                currentOrderStage={currentOrderStage}
                orderStage={3}
              >
                <LiaMotorcycleSolid className="text-3xl" />
              </OrderStatusElement>

              {currentOrderStatus !== "Cancelled" && (
                <OrderStatusElement
                  orderStatus="Delivered"
                  currentOrderStage={currentOrderStage}
                  orderStage={4}
                >
                  <GoChecklist className="text-3xl" />
                </OrderStatusElement>
              )}

              {currentOrderStatus === "Cancelled" && (
                <OrderStatusElement
                  orderStatus="Cancelled"
                  currentOrderStage={currentOrderStage}
                  orderStage={0}
                >
                  <GoX className="text-3xl text-red-500" />
                </OrderStatusElement>
              )}
            </div>
          </Container>

          {/* Payment */}
          <Container className="flex flex-col  w-full lg:w-2/6  h-52 rounded-lg p-3 gap-2">
            <div className="flex justify-between">
              <div className="">
                <h3 className="font-bold">PAYMENT</h3>
                <h3 className="text-[12px] text-slate-400 -mt-1">
                  Payment Details
                </h3>
              </div>
              <Button variant={'empty'}  className="space-x-1 bg-black text-white  dark:border dark:border-slate-300 dark:text-white dark:bg-transparent">
                <PiReceiptDuotone className="text-xl "/>
                <p>Invoice</p>
                </Button>
            </div>
            <div className="w-full flex flex-col items-start justify-between h-screen rounded-md bg-[#f7f7f7] dark:bg-[#1e1e1e] p-3">
                    <div className="flex w-full items-start justify-between text-[12px]">
                        <div className="spacey-y-2">
                            <ul>Bill amount</ul>
                            <ul>Discount(0%)</ul>
                            <ul>VAT</ul>
                            <ul>NHIL + GETFUND</ul>
                            <ul>COVID Levy</ul>
                        </div>
                        <div className="spacey-y-2 text-right font-semibold">
                            <ul>34.2</ul>
                            <ul>0</ul>
                            <ul>10</ul>
                            <ul>15</ul>
                            <ul>17</ul>
                        </div>
                    </div>

                    <Separator className="dark:bg-slate-50"/>
                    <div className="flex w-full items-start justify-between text-[12px] font-bold mt-1">
                        <p>Total</p>
                        <p>76.2</p>
                        
                    </div>
            </div>
          </Container>
          {/* RIDER */}
          <Container className="flex flex-col  w-full lg:w-2/6  h-52 rounded-lg p-3 gap-2">
            <div className="flex justify-between">
              <div className="">
                <h3 className="font-bold">RIDER</h3>
                <h3 className="text-[12px] text-slate-400 -mt-1">
                  Rider Details
                </h3>
              </div>
              <Button variant={'empty'}  className="space-x-1 bg-black text-white  dark:border dark:border-slate-300 dark:text-white dark:bg-transparent">
                <TbArrowsExchange className="text-xl "/>
                <p>Change</p>
                </Button>
            </div>
          </Container>
        </article>

        <article className="flex flex-col lg:flex-row w-full gap-4">
          {/* PACKAGE DETAILS */}
          <Container className="flex flex-col  w-full lg:w-4/6  h-52 rounded-lg p-3 gap-2">
            <h3 className="font-bold">Package</h3>
            <h3 className="text-[12px] text-slate-400 -mt-3">Rider Details</h3>
          </Container>
          <Container className="flex flex-col  w-full lg:w-2/6 h-52 rounded-lg p-3 gap-2">
            <h3 className="font-bold">Client</h3>
            <h3 className="text-[12px] text-slate-400 -mt-3">Client Details</h3>
          </Container>
        </article>
        {/* PACKAGE DETAILS */}
        <article></article>
        {/* TIMELINE */}
        <article></article>
        {/* CUSTOMER DETAIL */}
      </main>
    );
}


export const OrderStatusElement = ({orderStatus, orderStage, currentOrderStage, children}: {orderStatus: OrderStatus, orderStage:number, currentOrderStage:number, children:React.ReactNode})=> {
    return(
        <div className="flex flex-col items-center justify-center w-1/4 gap-4 relative">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentOrderStage < orderStage ? 'bg-gray-300' : 'bg-black dark:bg-slate-50'} ${ orderStage === 0 ? 'bg-red-500' : ''} `}>
                            { (orderStatus === "Booked" || orderStatus === "In Transit" || orderStatus === "Picked Up")  &&
                                
                                <div>
                                <div className={`absolute w-full h-1 ${currentOrderStage < orderStage ? 'bg-gray-300' : 'bg-black dark:bg-slate-50'}`}>
                                        <p></p>
                                </div>
                            </div>
                            }
                            {currentOrderStage < orderStage || orderStage === 0 ? <GoX className="text-white dark:text-[#1e1e1e] text-lg z-10"/> : <GrFormCheckmark className="text-white text-lg z-10 dark:text-[#1e1e1e]"/>}
                            
                        </div>

                    <div className={`flex flex-col items-center justify-center ${currentOrderStage < orderStage ? 'text-gray-300' : 'text-black dark:text-slate-50'}`}>
                        {children}
                        <div className="flex flex-col items-center justify-center w-full gap-1" >
                            <p className={`text-sm font-semibold ${orderStage === 0 ? 'text-red-500': ''}`}>{orderStatus}</p>
                            
                        </div>
                    </div>
                    </div>
    )
}