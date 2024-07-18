//icons

import {
  IoDocumentText,
  IoDocumentTextOutline,
  IoShirt,
  IoShirtOutline,
} from "react-icons/io5";
import { MdLineWeight, MdOutlineLineWeight } from "react-icons/md";
import {
  PiMonitorFill,
  PiMonitorLight,
  PiPackageFill,
  PiPackageLight,
  PiWineFill,
  PiWineLight,
} from "react-icons/pi";

import { PackageType } from "../../OrderSummaryMin";
//redux
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setPackageType } from "@/lib/store/slice/deliveryChoicesSlice";

import { ItemsSelector } from "../../../Shared/ItemsSelector";

export default function PackageTypes() {
  const { package_type } = useAppSelector((state) => state.deliveryChoices);

  const dispatch = useAppDispatch();

  const handlePackageType = (packageType: PackageType) => {
    dispatch(setPackageType(packageType));
  };
  return (
    <>
      <div className="w-full flex gap-3 max-w-sm   md:justify-between">
        <ItemsSelector
          FillIcon={PiMonitorFill}
          LightIcon={PiMonitorLight}
          itemDetails={{
            itemCategory: "Packages",
            item: "Electronics",
          }}
          selectedItem={package_type}
          setSelectedItem={handlePackageType}
          width="one-third"
        />
        <ItemsSelector
          FillIcon={IoDocumentText}
          LightIcon={IoDocumentTextOutline}
          itemDetails={{
            itemCategory: "Packages",
            item: "Documents",
          }}
          selectedItem={package_type}
          setSelectedItem={handlePackageType}
          width="one-third"
        />
        <ItemsSelector
          FillIcon={IoShirt}
          LightIcon={IoShirtOutline}
          itemDetails={{
            itemCategory: "Packages",
            item: "Clothes",
          }}
          selectedItem={package_type}
          setSelectedItem={handlePackageType}
          width="one-third"
        />
      </div>
      <div className="w-full flex   gap-3 max-w-sm   md:justify-between">
        <ItemsSelector
          FillIcon={MdLineWeight}
          LightIcon={MdOutlineLineWeight}
          itemDetails={{
            itemCategory: "Packages",
            item: "Bulky Items",
          }}
          selectedItem={package_type}
          setSelectedItem={handlePackageType}
          width="one-third"
        />
        <ItemsSelector
          FillIcon={PiWineFill}
          LightIcon={PiWineLight}
          itemDetails={{
            itemCategory: "Packages",
            item: "Fragile",
          }}
          selectedItem={package_type}
          setSelectedItem={handlePackageType}
          width="one-third"
        />
        <ItemsSelector
          FillIcon={PiPackageFill}
          LightIcon={PiPackageLight}
          itemDetails={{
            itemCategory: "Packages",
            item: "Others",
          }}
          selectedItem={package_type}
          setSelectedItem={handlePackageType}
          width="one-third"
        />
      </div>
    </>
  );
}
