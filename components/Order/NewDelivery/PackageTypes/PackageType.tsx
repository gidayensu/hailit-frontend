export const PackageType = ({packageType, onClickFunc, LightIcon, FillIcon, selectedPackageType}: {packageType: string, onClickFunc: (packageType:string)=>void, LightIcon: any, FillIcon:any, selectedPackageType: string})=> {
    return (
      <div
        className={`flex flex-col items-center p-2 group hover:bg-primary-color text-primary-color hover:text-white font-bold rounded-md border border-primary-color hover:border-none cursor-pointer ${
          packageType === selectedPackageType
            ? "bg-primary-color  text-white border-none"
            : ""
        }`}
        onClick={() => onClickFunc(packageType)}
      >
        <span className="flex items-center justify-center relative group-hover:text-white   w-14 h-12 rounded-lg border-slate-300">
          <LightIcon
            className={`text-3xl group-hover:opacity-0 ${
              packageType === selectedPackageType ? "opacity-0" : ""
            }`}
          />
          <FillIcon
            className={`text-3xl opacity-0 absolute group-hover:opacity-100 ${
              packageType === selectedPackageType ? "opacity-100" : ""
            }`}
          />
        </span>
        <p className="text-[13px] group-hover:text-white">{packageType}</p>
      </div>
    );
  }