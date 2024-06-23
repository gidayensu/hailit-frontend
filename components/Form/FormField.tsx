import React from "react";
import { useFormContext, Controller } from 'react-hook-form';
import { Input } from "../ui/input";
import { FormFieldProps } from "./FormTypes";
import { SelectDate } from "../Order/SelectDate";
 export const CalendarField:React.FC<FormFieldProps> = ({
    defaultValue,
    name,
    datePurpose,
}) => { 
    
    const { register, formState } = useFormContext();
    return (<>
    <Controller
    name={name}
    
    render={({ field }) => (
        <SelectDate schedule={false} select = {!field.value ? defaultValue: field.value} onSelect = {field.onChange} datePurpose={datePurpose}/>
      )}
    />
    
    {formState?.errors?.[name] && <span className="flex gap-1 items-center text-[14px] text-red-500 ease-in-out ">
     {formState?.errors?.[name]?.message?.toString()}

    
    </span>}
    </>)
}
export  const FormField:React.FC<FormFieldProps> = ({
    type,
    name,
    className,
    defaultValue,
    calendar,
    children,
    value,
    disabled
}) => { 
    
    const { register, formState } = useFormContext();
    return (<>
    
        
    <Input 
    type={type}
    
    {...register(name,)}
    className={`${className}`}
    defaultValue={defaultValue}
    disabled = {disabled}
    value={value}
    />
    
    
    {formState?.errors?.[name] && <span className="flex gap-1 items-center text-[14px] text-red-500 ease-in-out ">
     {formState?.errors?.[name]?.message?.toString()}
    </span>}
    </>)
}

export default FormField