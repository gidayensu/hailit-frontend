'use client'
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import {useForm, SubmitHandler} from 'react-hook-form';
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { CustomerDetails } from "@/lib/store/slice/onBoardingSlice";
import { setOnboardingStages } from "@/lib/store/slice/onBoardingSlice";
import { setUserState } from "@/lib/store/slice/userSlice";
import { useLazyUpdateUserQuery } from "@/lib/store/apiSlice/hailitApi";


export default function CustomerProfile() {
  
  const [isError, setIsError] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const path = usePathname();
  const {register, handleSubmit } = useForm<CustomerDetails>();
  const inputAndLabeClass = "w-full max-w-sm items-center";
  const labelClass = "text-sm font-medium mb-1";

  const {email, user_id, user_role} = useAppSelector(state=>state.user);
  const {chosenRole} = useAppSelector(state=>state.onBoarding);

  const [updateUser, {data, isLoading, error}] = useLazyUpdateUserQuery();
  
  const onCustomerFormSubmit:SubmitHandler<CustomerDetails> = async (formData)=> {
    try {
      console.log('formData:', formData)
      let userRole = user_role;
      if (chosenRole && chosenRole ==='dispatcher') {
        userRole = 'rider';
      }
      console.log('Chosen Role:', chosenRole)
      const newUserData = {...formData, onboard:true, user_role: userRole}
      const oldUserData = {...formData, user_role}
      
      if(!path.startsWith('/onboarding')){
         updateUser({userId: user_id, userDetails: oldUserData});}
      
      if (path.startsWith('/onboarding')) {
         updateUser({userId: user_id, userDetails: newUserData});
      }
  
      // console.log('update User', updateUser({userId: user_id, userDetails: newUserData}))
  
      if (error) {
        return {error: "error occurred"}
      } 
      
      
      
    } catch (err) {
      
      setIsError(true)
      console.log('error:', err)
    }
  }
  if(data && data.user) {
    console.log('data2:', data)
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
    console.log('data3:', data.error)
  }


  return (
    <form className="w-full flex flex-col items-center justify-center " id="customerProfileUpdate" onSubmit={handleSubmit(onCustomerFormSubmit)}>
      
        <div className={inputAndLabeClass}>
          <h3 className={labelClass}>First Name</h3>
          <Input type="text" placeholder="First Name" className="h-14 " {...register("first_name")} required />
        </div>
        <div className={inputAndLabeClass}>
          <h3 className={labelClass}>Last Name</h3>
          <Input type="text" placeholder="Last Name" className="h-14" {...register("last_name")} required />
          
        </div>
      
      <div className={inputAndLabeClass}>
        <h3 className={labelClass}>Email</h3>
        <Input type="email" placeholder="email@example.com" className="h-14" defaultValue={email} required/>
      </div>
      <div className={inputAndLabeClass}>
        <h3 className={labelClass}>Phone Number</h3>
        <Input type="text" placeholder="024 123 4567" className="h-14" {...register("phone_number")} required />
      </div>
      {isError && <p className="text-red"> Error Occurred</p>}
      
      
                  
    </form>
  );
}
