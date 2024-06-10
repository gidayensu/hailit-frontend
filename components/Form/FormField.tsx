import React from "react";
import { useFormContext } from 'react-hook-form';
import { Input } from "../ui/input";
import { FormFieldProps } from "./FormTypes";
import { SelectDate } from "../Order/SelectDate";
const FormField:React.FC<FormFieldProps> = ({
    type,
    name,
    placeholder, 
    valueAsNumber,
    className,
    defaultValue,
    calendar,
    children
}) => { 
    
    const { register, formState } = useFormContext();
    return (<>
    
    {!calendar &&     
    <Input 
    type={type}
    placeholder={placeholder}
    {...register(name, {valueAsNumber})}
    className={`${className}`}
    defaultValue={defaultValue}
    
    />}
    {children}
    
    {formState?.errors?.[name] && <span className="flex gap-1 items-center text-[14px] text-red-500 ease-in-out ">
     {formState?.errors?.[name]?.message?.toString()}
    </span>}
    </>)
}
    export default FormField