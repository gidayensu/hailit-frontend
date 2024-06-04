'use client'
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import {useForm, SubmitHandler, FormProvider} from 'react-hook-form';
import FormField from "./FormField";
import {zodResolver} from '@hookform/resolvers/zod'
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { CustomerDetails } from "@/lib/store/slice/onBoardingSlice";
import { setOnboardingStages } from "@/lib/store/slice/onBoardingSlice";
import { setUserState } from "@/lib/store/slice/userSlice";
import { useLazyUpdateUserQuery } from "@/lib/store/apiSlice/hailitApi";
import { UserSchema, User } from "./FormTypes";

export default function CustomerProfile() {
  
  const [isError, setIsError] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const path = usePathname();
  
  
  
  const {email, user_id, user_role} = useAppSelector(state=>state.user);
  const {chosenRole} = useAppSelector(state=>state.onBoarding);
  
  const [updateUser, {data, isLoading, error}] = useLazyUpdateUserQuery();
  
  const formMethods = useForm<User>({
    resolver: zodResolver(UserSchema)
  });
  const {register, handleSubmit, formState: {errors}, setError } = formMethods;

  const onCustomerFormSubmit:SubmitHandler<CustomerDetails> = async (formData)=> {
    try {
      
      let userRole = user_role;
      if (chosenRole && chosenRole ==='dispatcher') {
        userRole = 'rider';
      }
      
      const newUserData = {...formData, onboard:true, user_role: userRole}
      const oldUserData = {...formData, user_role}
      
      if(!path.startsWith('/onboarding')){
        updateUser({userId: user_id, userDetails: oldUserData});}
        
        if (path.startsWith('/onboarding')) {
          updateUser({userId: user_id, userDetails: newUserData});
        }
        
        
        if (error) {
          return {error: "error occurred"}
        } 
      } catch (err) {  
        setIsError(true)
        return {error: err}
      }
    }

    if(data && data.user) {
      const {user} = data
      dispatch(setUserState({
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        user_role: data.user_role,
        onboard: user.onboard
        
      }))
      dispatch(setOnboardingStages({
        stageOne: true,
        stageTwo: true,
        stageThree: true
      }))
      
    }
    
    if(data && data.error ) {
      
      setIsError(true)
    }
    
    const inputAndLabeClass = "w-full max-w-sm items-center";
    const labelClass = "text-sm font-medium mb-1";
    
    return (
      <FormProvider {...formMethods}>

      
      <form className="w-full flex flex-col items-center justify-center gap-3 " id="customerProfileUpdate" onSubmit={handleSubmit(onCustomerFormSubmit)}>
      
        <div className={inputAndLabeClass}>
          <h3 className={labelClass}>First Name</h3>
          <FormField type="text" placeholder="First Name" className="h-14 " name = "first_name"/>
        </div>
        <div className={inputAndLabeClass}>
          <h3 className={labelClass}>Last Name</h3>
          <FormField type="text" placeholder="Last Name" className="h-14" name = "last_name" />
          
        </div>
      
      <div className={inputAndLabeClass}>
        <h3 className={labelClass}>Email</h3>
        <FormField type="email" placeholder="email@example.com" className="h-14" defaultValue={email} name= "email" />
      </div>
      <div className={inputAndLabeClass}>
        <h3 className={labelClass}>Phone Number</h3>
        <FormField type="text" placeholder="0240 000 000" className="h-14" name="phone_number"/>
      </div>
      {isError && <p className="text-red"> Error Occurred</p>}

      {
        chosenRole === "dispatcher" &&
        <div className={inputAndLabeClass}>
        <h3 className={labelClass}>License Number</h3>
        <FormField
          type="text"
          placeholder="License Number"
          className="h-14"
          name ="license_number"
          
        />
      </div>
      }                 
    </form>
    </FormProvider>
  );
}
