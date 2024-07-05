"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useUpdateUserMutation } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  CustomerDetails,
  setOnboardingStages,
} from "@/lib/store/slice/onBoardingSlice";
import { setUser } from "@/lib/store/slice/userSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { User, UserSchema } from "../FormTypes";
import { supabaseSignOut } from "@/lib/supabaseAuth";
import { setLoading } from "@/lib/store/slice/onBoardingSlice";
import { useRouter } from "next/navigation";
import { userLogout } from "@/lib/store/actions";
export const useCustomerProfile = () => {
  
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  
  const path = usePathname();
  const router = useRouter();

  const { email, user_id, user_role, first_name, last_name, phone_number } = useAppSelector((state) => state.user);
  const { chosenRole } = useAppSelector((state) => state.onBoarding);

  const [updateUser, { data, isLoading, error }] = useUpdateUserMutation();


  //form submission
  const formMethods = useForm<User>({
    resolver: zodResolver(UserSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = formMethods;

  const onCustomerFormSubmit: SubmitHandler<CustomerDetails> = async (formData) => {
    try {
      dispatch(setLoading(true))
      
      let userRole = user_role;
      if (chosenRole && chosenRole === "rider") {
        userRole = "rider";
      }
  
      const newUserData = { ...formData, onboard: true, user_role: userRole };
      const oldUserData = { ...formData, user_role };
  
      if (!path.startsWith("/onboarding")) {
        await updateUser({ userId: user_id, userDetails: oldUserData });
      }
  
      if (path.startsWith("/onboarding")) {
        await updateUser({ userId: user_id, userDetails: newUserData });
      }
      setIsSuccess(true)
      if (path.startsWith("/profile/edit-profile")) {
        router.push('/profile')
      }
      
    } catch (err) {
      setIsError(true);
     
      
      return { error: err };
    }
  };

  const user = data?.user;

  useEffect(()=> {
    if (user) {

      dispatch(
        setUser({
          user_id: user.user_id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          user_role: data.user_role,
          phone_number: user.phone_number,
          onboard: user.onboard,
        })
      );
      if(path.startsWith("/onboarding")) {
  
        dispatch(
          setOnboardingStages({
            stageOne: true,
            stageTwo: true,
            stageThree: true,
          })
        );
      
      }
      setIsSuccess(true)
    }

    
  }, [dispatch, user, path])
    

  if(error) {
    dispatch(setLoading(false))
  }

  

  //log user out
  const handleSignOut = () => {
    dispatch(userLogout());
    supabaseSignOut();
    router.push('/')
  };

  return { formMethods, handleSubmit, onCustomerFormSubmit, email, isError, chosenRole,  first_name, last_name, phone_number, isLoading, isSuccess, error, handleSignOut };
};
