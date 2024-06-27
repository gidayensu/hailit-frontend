export const ItemsSelector = ({itemType, onClickFunc, LightIcon, FillIcon, selectedItemType, width}: {itemType: string, onClickFunc: (itemType:string)=>void, LightIcon: any, FillIcon:any, selectedItemType: string, width:string})=> {
    return (
      <div
        className={`w-24  flex flex-col items-center p-2 group hover:bg-primary-color text-primary-color hover:text-white font-bold rounded-md border border-primary-color hover:border-none cursor-pointer ${
          itemType === selectedItemType
            ? "bg-primary-color  text-white border-none"
            : ""
        }`}
        onClick={() => onClickFunc(itemType)}
      >
        <span className="flex items-center justify-center relative group-hover:text-white   w-14 h-12 rounded-lg border-slate-300">
          <LightIcon
            className={`text-3xl group-hover:opacity-0 ${
              itemType === selectedItemType ? "opacity-0" : ""
            }`}
          />
          <FillIcon
            className={`text-3xl opacity-0 absolute group-hover:opacity-100 ${
              itemType === selectedItemType ? "opacity-100" : ""
            }`}
          />
        </span>
        <p className="text-[13px] group-hover:text-white">{itemType}</p>
      </div>
    );
  }