//icons

import { IoDocumentText, IoDocumentTextOutline, IoShirtOutline, IoShirt } from "react-icons/io5";
import { MdLineWeight, MdOutlineLineWeight } from "react-icons/md";
import {
  PiMonitorFill,
  PiMonitorLight,
  PiPackageFill,
  PiPackageLight,
  PiWineFill,
  PiWineLight,
} from "react-icons/pi";
import { RiArchiveStackFill, RiArchiveStackLine } from "react-icons/ri";

//redux
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setPackageType } from "@/lib/store/slice/deliveryChoicesSlice";

import { ItemsSelector } from "../../../Shared/ItemsSelector";
export default function PackageTypes () {
  
  const { package_type } = useAppSelector(state=>state.deliveryChoices);

  const dispatch = useAppDispatch();

  const handlePackageType = (packageType:string)=> {
    dispatch(setPackageType(packageType))
  }
    return (
        <>
          <ItemsSelector
            FillIcon={PiMonitorFill}
            LightIcon={PiMonitorLight}
            itemType="Electronics"
            selectedItemType={package_type}
            onClickFunc={handlePackageType}
            width="w-24"
          />
          <ItemsSelector
            FillIcon={IoDocumentText}
            LightIcon={IoDocumentTextOutline}
            itemType="Documents"
            selectedItemType={package_type}
            onClickFunc={handlePackageType}
            width="w-24"
          />
          <ItemsSelector
            FillIcon={IoShirt}
            LightIcon={IoShirtOutline}
            itemType="Clothes"
            selectedItemType={package_type}
            onClickFunc={handlePackageType}
            width="w-24"
          />
          <ItemsSelector
            FillIcon={MdLineWeight}
            LightIcon={MdOutlineLineWeight}
            itemType="Bulky Items"
            selectedItemType={package_type}
            onClickFunc={handlePackageType}
            width="w-24"
          />
          <ItemsSelector
            FillIcon={PiWineFill}
            LightIcon={PiWineLight}
            itemType="Fragile"
            selectedItemType={package_type}
            onClickFunc={handlePackageType}
            width="w-24"
          />
          <ItemsSelector
            FillIcon={PiPackageFill}
            LightIcon={PiPackageLight}
            itemType="Others"
            selectedItemType={package_type}
            onClickFunc={handlePackageType}
            width="w-24"
          />

        </>
    )
}

