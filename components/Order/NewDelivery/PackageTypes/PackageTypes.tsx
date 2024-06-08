//icons

import { IoDocumentText, IoDocumentTextOutline } from "react-icons/io5";

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

import { PackageType } from "./PackageType";
export default function PackageTypes () {

  const { package_type } = useAppSelector(state=>state.deliveryChoices);

  const dispatch = useAppDispatch();

  const handlePackageType = (packageType:string)=> {
    dispatch(setPackageType(packageType))
  }
    return (
        <>
          <PackageType
            FillIcon={PiMonitorFill}
            LightIcon={PiMonitorLight}
            packageType="Electronics"
            selectedPackageType={package_type}
            onClickFunc={handlePackageType}
          />
          <PackageType
            FillIcon={IoDocumentText}
            LightIcon={IoDocumentTextOutline}
            packageType="Documents"
            selectedPackageType={package_type}
            onClickFunc={handlePackageType}
          />
          <PackageType
            FillIcon={PiPackageFill}
            LightIcon={PiPackageLight}
            packageType="Clothes"
            selectedPackageType={package_type}
            onClickFunc={handlePackageType}
          />
          <PackageType
            FillIcon={RiArchiveStackFill}
            LightIcon={RiArchiveStackLine}
            packageType="Bulky Items"
            selectedPackageType={package_type}
            onClickFunc={handlePackageType}
          />
          <PackageType
            FillIcon={PiWineFill}
            LightIcon={PiWineLight}
            packageType="Fragile"
            selectedPackageType={package_type}
            onClickFunc={handlePackageType}
          />
          <PackageType
            FillIcon={PiPackageFill}
            LightIcon={PiPackageLight}
            packageType="Others"
            selectedPackageType={package_type}
            onClickFunc={handlePackageType}
          />

        </>
    )
}

