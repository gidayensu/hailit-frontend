import { RiMapPinLine } from "react-icons/ri";
import { FaAngleRight } from "react-icons/fa6";
import { MdChevronRight } from "react-icons/md";
export default function SearchItem ({item}: {item:any}) {
    const formatedItem = splitLocationData(item);
    return (
        <div className="w-full grid grid-cols-8 cursor-pointer p-1 mt-1">
            <div className="col-span-1 flex items-center justify-center">
                <RiMapPinLine className="text-lg"/>
            </div>
            <div className="col-span-6 leading-4 flex flex-col items-start justify-center">
                <p className="font-bold">{formatedItem[0]}</p>
                <span className=" text-[12px] text-gray-500">{formatedItem[1]}</span>
            </div>
            <div className="col-span-1 flex items-center justify-center">
            <MdChevronRight className="text-lg text-gray-500"/>
            </div>
        </div>
    )
}


function splitLocationData(item:string) {
    let parts = item.split(", ");
    return [parts[0] + ", " + parts[1], parts[parts.length - 1]];
}