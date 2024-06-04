import { z, ZodType } from 'zod';
import { zPhone } from './phoneValidation';

export const NewOrderSchema:  ZodType<DeliveryDetails>  = z.object({
  pickup_location: z.string().min(2,{message: "Required and must be 2 or more letters"}), 
  drop_off_location: z.string().min(2,{message: "Required and must be 2 or more letters"}), 
  sender_number: zPhone,
  recipient_number: zPhone, 
  package_value: z.optional(z.number().min(1, {message: "Package value should be GHS 1 or more"})),
  additional_information: z.optional(z.string())
})


export const UserSchema: ZodType<User> = z.object({
  first_name: z.string().min(2,{message: "First name required "}), 
  last_name: z.string().min(2,{message: "Last name required"}), 
  email: z.string().email({message: "Invalid email address"}),
  phone_number: zPhone,
  license_number: z.string().min(5, {message: "License number should be five letters or more"}).nullable().optional()
})

export const SignInSchema: ZodType<SignInForm> = z.object({
  email: z.string().email({message: "Invalid email address"}),
  password: z.string().min(1, {message: "Enter password"})
})

export const SignUpSchema: ZodType<SignUpForm> = z.object({
  email: z.string().email({message: "Invalid email address"}),
  password: z.string().min(6, {message: "Minimum of 6 characters"}),
  confirm_password: z.string().min(6, {message: "Minimum of 6 characters"})
}).superRefine(({ confirm_password, password }, ctx) => {
  if (confirm_password !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ['confirm_password']
    });
  }
});

export interface SignUpForm {
    email: string, 
    password: string, 
    confirm_password: string
}

export interface SignInForm {
  email: string, 
  password: string
}

export interface User {
  first_name: string, 
  last_name: string, 
  email: string, 
  phone_number: string,
  license_number?: string | null | undefined
}

export interface DeliveryDetails {

  pickup_location: string,
  drop_off_location: string,
  sender_number: string,     
  recipient_number: string,
  package_value?: number ,
  additional_information?: string 
}

export type ValidFieldNames =
| "email"
| "package_value"
| "additional_information"
| "phone_number"
| "password"
| "drop_off_location"
| "pick_up_location"
| "sender_number"
| "recipient_number"
| "password"
| "license_number"
| "confirm_password";

export type FormFieldProps = {
    type: string;
    placeholder: string;
    name: ValidFieldNames | any;
    valueAsNumber?: boolean;
    className: string;
    defaultValue?: string; 
  };


export interface NewTrip {
  trip_medium: string,
    package_type: string,
    pickup_location: string,
    drop_off_location: string,
    additional_information: string,
    trip_type: string,
    package_value: string,
    sender_number: string,
    recipient_number: string,
}

