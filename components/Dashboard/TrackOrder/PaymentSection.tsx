
import { Separator } from "@/components/ui/separator"
export default function PaymentSection ({cost, paymentStatus}: {cost:string, paymentStatus: boolean}) {
    
  let discount = 0;
  let serviceFee = 0;
    return (
        <>
        <div className="flex justify-between">
            <div className="">
              <h3 className="font-bold">PAYMENT</h3>
              <h3 className="text-[12px] text-slate-400 -mt-1">
                Details
              </h3>
            </div>
            {/* <Button
              variant={"empty"}
              className="space-x-1 bg-blue-500 hover:bg-blue-600 text-white  hover:dark:bg-slate-100 dark:text-[#1e1e1e] dark:bg-white"
            >
              <PiReceipt className="text-xl " />
              <p>Invoice</p>
            </Button> */}
          </div>
          <div className="w-full flex flex-col items-start justify-between h-3/5 rounded-md bg-[#f7f7f7] dark:bg-[#1e1e1e] p-3">
            <div className="flex w-full items-start justify-between text-sm">
              <div className="spacey-y-2">
                <ul>Bill amount</ul>
                <ul>Discount(0%)</ul>
                <ul>Service Fee</ul>
                
              </div>
              <div className="spacey-y-2 text-right font-semibold">
                <ul>{cost}</ul>
                <ul>{discount}</ul>
                <ul>{serviceFee}</ul>
                
              </div>
            </div>

            <Separator className="dark:bg-slate-50" />
            <div className="flex w-full items-start justify-between text-sm font-bold mt-1">
              <p>Total</p>
              <p>{(parseFloat(cost) + serviceFee + discount).toFixed(2)}</p>
            </div>
          </div>
          <div className=" flex justify-between text-sm px-1 font-semibold">
            <p>Payment status</p>
            <p className={`${paymentStatus ? 'text-green-500': 'text-red-500'}`}>{paymentStatus ? "Paid" : "Not Paid"}</p>
          </div>
          </>
    )
}