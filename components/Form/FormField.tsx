"use client"
import { useFormContext, Controller } from 'react-hook-form';
import { Input } from "../ui/input";
import { FormFieldProps } from "./FormTypes";
import { SelectDate } from "../Order/SelectDate";
import { useEffect } from 'react';

 export const CalendarField:React.FC<FormFieldProps> = ({
    defaultValue,
    name,
    datePurpose,
}) => { 
    
    const {  formState } = useFormContext();
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
    disabled,
    ...props
}) => { 
    
    const { register, formState, setValue, } = useFormContext();
//The useEffect is used to manually set the value on change
    useEffect(()=> {
        if (defaultValue !== undefined) {
            setValue(name, defaultValue)
        }
    }, [defaultValue, name, setValue])
    return (<>
    
        {/* will change it to shadcn input later after fixing why it is failing to register defaultValue */}
    <Input
    type={type}
    
    {...register(name,)}
    className={`flex h-10 w-full rounded-xl border border-slate-500 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-amber-00 dark:border-opacity-30 dark:bg-primary-dark dark:ring-offset-slate-950 dark:placeholder:text-slate-100 dark:placeholder:text-opacity-20 dark:focus-visible:ring-slate-300 ${className}`}
    defaultValue={defaultValue}
    disabled = {disabled}
    value={value}
    
    {...props}
    />
    
    
    {formState?.errors?.[name] && <span className="flex gap-1 items-center text-[14px] text-red-500 ease-in-out ">
     {formState?.errors?.[name]?.message?.toString()}
    </span>}
    </>)
}

export default FormField