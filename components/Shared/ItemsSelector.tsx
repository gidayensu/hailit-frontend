export const ItemsSelector = ({itemType, onClickFunc, LightIcon, FillIcon, selectedItemType, width}: {itemType: string, onClickFunc: (itemType:string)=>void, LightIcon: any, FillIcon:any, selectedItemType: string, width:string})=> {
  // let itemTypeClass = '';
  // switch (itemType) {
  //   case ("Electronics"): {
  //     itemTypeClass = `${
  //       itemType === selectedItemType ? "bg-teal-600 text-white" : ""
  //     } dark:bg-teal-200 border-teal-500 text-teal-500 hover:bg-teal-600`;
  //   }
  //   break;
  //   case ("Bulky Items"): {
  //     itemTypeClass = `${
  //       itemType === selectedItemType ? "bg-violet-600 text-white" : "text-violet-500 "
  //     } dark:bg-violet-200 border-violet-500 hover:bg-violet-600`;
  //   }
  //   break;
    
  //   case ("Documents"): {
  //     itemTypeClass = `${
  //       itemType === selectedItemType ? "bg-orange-600 text-white" : "text-orange-500"
  //     } dark:bg-orange-200 border-orange-500  hover:bg-orange-600`;
  //   }
  //   break;
  //   case ("Clothes"): {
  //     itemTypeClass = `${
  //       itemType === selectedItemType ? "bg-cyan-600 text-white" : ""
  //     } dark:bg-cyan-200 border-cyan-500 text-cyan-500 hover:bg-cyan-600`;
  //   }
  //   break;
  //   case ("Others"): {
  //     itemTypeClass = `${
  //       itemType === selectedItemType ? "bg-amber-600 text-white" : ""
  //     } dark:bg-amber-200 border-amber-500 text-amber-500 hover:bg-amber-600`;
  //   }
  //   break;
  //   case ("Fragile"): {
  //     itemTypeClass = `${
  //       itemType === selectedItemType
  //         ? "bg-rose-600 text-white"
  //         : ""
  //     } dark:bg-rose-200 border-rose-500 text-rose-500 hover:bg-rose-600`;
  //   }
  // }
  
  

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