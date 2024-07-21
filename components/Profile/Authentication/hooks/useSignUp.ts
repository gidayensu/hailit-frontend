"use client";
//ui + icons
import { useRouter } from "next/navigation";

//redux
import { useLazyAddUserQuery } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch } from "@/lib/store/hooks";
import { setAuthState } from "@/lib/store/slice/authSlice";
import { setUser } from "@/lib/store/slice/userSlice";

//react
import { useState } from "react";

// react-hook-forms
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { SignUpForm, SignUpSchema } from "@/components/Form/FormTypes";
//supabase
import { supabaseSignUp, googleSupabaseSignIn } from "@/lib/supabaseAuth";
//types
import type { Inputs } from "@/lib/supabaseAuth";



export const useSignUp =  () => {
  const [demoSignUpDetail, setDemoSignUpDetail] = useState<string>('');
    const router = useRouter();
    const dispatch = useAppDispatch();
  
    const [addUser, { data:signUpData, error: addUserError }] = useLazyAddUserQuery();
  
    const [dataFetchError, setDataFetchError] = useState({
      error: false,
      errorDescription: "",
    });

    const handleRandomSignUp = () => {
        
        const randomName = defaultNames[Math.ceil(Math.random()*defaultNames.length-1)]
        const randomNumber = Math.ceil(Math.random() * 1000);
        const demoDetail =`${randomName}${randomNumber}@hailit.vercel.app`;
        setDemoSignUpDetail(demoDetail)
        
    }
  
    const [isLoading, setIsLoading] = useState<boolean>(false);
  
    //Google SignUp. Runs only if the user has not been registered in the user table (not auth table)
    const googleSignUp:any = (data:string)=> addUser(data)
  
    //Form
  
    const formMethods = useForm<SignUpForm>({
      resolver: zodResolver(SignUpSchema),
    });
    const {
      handleSubmit,
      
    } = formMethods;
  
    //form submission
    
    const onSignUpSubmit: SubmitHandler<Inputs> = async (userData) => {
      try {
        setIsLoading(true);
        const signUpData = await supabaseSignUp(userData);

        if (signUpData && signUpData.error) {
          
          setIsLoading(false);
          setDataFetchError(() => ({
            errorDescription: signUpData.error,
            error: true,
          }));
        }
  
        if (signUpData.user_id) {
          addUser({
            user_id: signUpData.user_id,
            email: signUpData.email,
          });

          if (addUserError) {
            return {
              error: "Error occurred",
              errorMessage: "Could not add user to database",
            };
          }
        }
      } catch (err) {}
    };
    if (signUpData) {
      const { user } = signUpData;
      dispatch(
        setUser({
          user_id: user.user_id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          user_role: user.user_role,
          onboard: user.onboard,
          phone_number: user.phone_number
        })
      );
      const onboard = user.onboard;
      dispatch(setAuthState(true));
      onboard ? router.push("/") : router.push("/onboarding");
    }

    return {
      onSignUpSubmit,
      formMethods,
      handleSubmit,
      dataFetchError,
      isLoading,
      googleSignUp,
      googleSupabaseSignIn,
      setDemoSignUpDetail,
      demoSignUpDetail,
      handleRandomSignUp
    };
  };
  

  const defaultNames = [
    "user",
    "starter",
    "gery",
    "win",
    "victory",
    "saly",
    "awesome",
    "fun",
    "interest",
    "true",
    "life",
    "trainer",
    "good",
    "great",
    "super",
    "ben",
    "tina",
    "nol",
    "director",
    "mikel",
    "goodman",
    "salute",
    "critical",
    "alumi",
    "peri",
    "eddie",
    "selom",
  ];