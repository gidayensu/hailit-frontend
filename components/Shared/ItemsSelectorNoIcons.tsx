export const ItemsSelectorNoIcons = ({itemType, onClickFunc, selectedItemType, className}: {itemType: string, onClickFunc: (itemType:string)=>void,  selectedItemType: string, className:string})=> {
    return (
      <div
        className={`${className} flex flex-col items-center p-2 group hover:bg-primary-color text-primary-color hover:text-white font-bold rounded-md border border-primary-color hover:border-none cursor-pointer ${
          itemType === selectedItemType
            ? "bg-primary-color  text-white border-none"
            : ""
        }`}
        onClick={() => onClickFunc(itemType)}
      >
        
        <p className="text-[13px] group-hover:text-white">{itemType}</p>
      </div>
    );
  }