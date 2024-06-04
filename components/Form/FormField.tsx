import React from "react";
import { useFormContext } from 'react-hook-form';
import { Input } from "../ui/input";
import { FormFieldProps } from "./FormTypes";

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
    {formState?.errors?.[name] && <span className="flex gap-1 items-center text-[14px] text-red-500 ease-in-out ">
     {formState?.errors?.[name]?.message?.toString()}
    </span>}
    </>)
}
    export default FormField