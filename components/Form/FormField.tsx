import { FormFieldProps } from "./FormTypes";
import { Input } from "../ui/input";
import React from "react";
import { useFormContext} from 'react-hook-form'
import { FaInfoCircle } from "react-icons/fa";
import { MdOutlineInfo } from "react-icons/md";

const FormField:React.FC<FormFieldProps> = ({
    type,
    name,
    placeholder, 
    valueAsNumber,
    className,
    defaultValue
}) => { 
    
    const { register, formState } = useFormContext();
    return (<>
    <Input 
    type={type}
    placeholder={placeholder}
    {...register(name, {valueAsNumber})}
    className={`${className}`}
    defaultValue={defaultValue}
    />
    {formState?.errors?.[name] && <span className="flex gap-2 items-center text-[13px] text-red-500 ease-in-out ">
    <MdOutlineInfo className="text-md  mt-1" /> {formState?.errors?.[name]?.message?.toString()}
    </span>}
    </>)
}
    export default FormField