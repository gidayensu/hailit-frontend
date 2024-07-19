//icons

import { BsPhone, BsPhoneFill } from "react-icons/bs";
import { HiCash, HiOutlineCash } from "react-icons/hi";


//redux
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";


import { setPaymentMethod } from "@/lib/store/slice/deliveryChoicesSlice";
import { ItemsSelector } from "../Shared/ItemsSelector";
import { PaymentMethod } from "./types/Types";


export default function PaymentMethods () {
  
  const {  payment_method } = useAppSelector(state=>state.deliveryChoices);

  const dispatch = useAppDispatch();

  const handlepaymentMethod = (paymentMethod:PaymentMethod)=> {
    
    dispatch(setPaymentMethod(paymentMethod))
  }
    return (
        <div className="w-full flex   gap-3 max-w-sm   md:justify-between">
          <ItemsSelector
            itemDetails = {{
               itemCategory: "Payments",
                item: "Cash on Delivery"}
            }
            FillIcon={HiCash}
            LightIcon={HiOutlineCash}
            selectedItem={payment_method}
            setSelectedItem={handlepaymentMethod}
            width="half"
          />
          <ItemsSelector
            FillIcon={BsPhoneFill}
            LightIcon={BsPhone}
            itemDetails = {{
              itemCategory: "Payments",
               item: "MoMo on Delivery"}
           }
            selectedItem={payment_method}
            setSelectedItem={handlepaymentMethod}
            width="half"
          />
          
          
        </div>
    )
}

