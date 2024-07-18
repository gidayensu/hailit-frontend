import { PackageType, TripArea, TripMedium, PaymentMethod, TripType,  } from "../Order/types/Types";
import { IconType } from "react-icons/lib";
type Categories = "Payments" | "Packages"

type Item = PackageType | PaymentMethod;

interface BaseSelectorTypes {
  
  itemCategory: Categories
}

export interface Packages extends BaseSelectorTypes {
  itemCategory: "Packages"
  item: PackageType
}

export interface Payments extends BaseSelectorTypes {
  itemCategory: "Payments"
  item: PaymentMethod
}

type ItemType = Packages | Payments;

export const ItemsSelector = ({
  
  
  setSelectedItem,
  LightIcon,
  FillIcon,
  selectedItem,
  itemDetails,
  width
}: {
  
  setSelectedItem: (item: any) => void;
  LightIcon: IconType;
  FillIcon: IconType;
  selectedItem: Item | ''
  itemDetails: ItemType
  width?: string
}) => {
  

  return (
    <div
      className={`${width === "half" ? `w-1/2` : width === "one-third" ? 'w-1/3' : 'w-24'}  flex flex-col items-center justify-between p-2 group hover:bg-primary-color text-primary-color hover:text-white font-bold rounded-md border border-primary-color hover:border-none cursor-pointer ${
        itemDetails.item === selectedItem
          ? "bg-primary-color  text-white border-none"
          : ""
      }`}
      onClick={() => setSelectedItem(itemDetails.item)}
    >
      <span className="flex  items-center justify-center relative group-hover:text-white   w-14 h-12 rounded-lg border-slate-300">
        <LightIcon
          className={`text-3xl group-hover:opacity-0 ${
            itemDetails.item === selectedItem ? "opacity-0" : ""
          }`}
        />
        <FillIcon
          className={`text-3xl opacity-0 absolute group-hover:opacity-100 ${
            itemDetails.item === selectedItem ? "opacity-100" : ""
          }`}
        />
      </span>
      <p className="text-[13px] group-hover:text-white text-center">{itemDetails.item}</p>
    </div>
  );
};































// let itemClass = '';
  // switch (item) {
  //   case ("Electronics"): {
  //     itemClass = `${
  //       item === selectedItem ? "bg-teal-600 text-white" : ""
  //     } dark:bg-teal-200 border-teal-500 text-teal-500 hover:bg-teal-600`;
  //   }
  //   break;
  //   case ("Bulky Items"): {
  //     itemClass = `${
  //       item === selectedItem ? "bg-violet-600 text-white" : "text-violet-500 "
  //     } dark:bg-violet-200 border-violet-500 hover:bg-violet-600`;
  //   }
  //   break;

  //   case ("Documents"): {
  //     itemClass = `${
  //       item === selectedItem ? "bg-orange-600 text-white" : "text-orange-500"
  //     } dark:bg-orange-200 border-orange-500  hover:bg-orange-600`;
  //   }
  //   break;
  //   case ("Clothes"): {
  //     itemClass = `${
  //       item === selectedItem ? "bg-cyan-600 text-white" : ""
  //     } dark:bg-cyan-200 border-cyan-500 text-cyan-500 hover:bg-cyan-600`;
  //   }
  //   break;
  //   case ("Others"): {
  //     itemClass = `${
  //       item === selectedItem ? "bg-amber-600 text-white" : ""
  //     } dark:bg-amber-200 border-amber-500 text-amber-500 hover:bg-amber-600`;
  //   }
  //   break;
  //   case ("Fragile"): {
  //     itemClass = `${
  //       item === selectedItem
  //         ? "bg-rose-600 text-white"
  //         : ""
  //     } dark:bg-rose-200 border-rose-500 text-rose-500 hover:bg-rose-600`;
  //   }
  // }