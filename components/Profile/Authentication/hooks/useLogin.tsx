import { useRouter } from "next/navigation";

// redux
import { useLazyGetUserQuery } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch } from "@/lib/store/hooks";
import { setAuthState } from "@/lib/store/slice/authSlice";
import { setUser } from "@/lib/store/slice/userSlice";

// react
import { useEffect, useState } from "react";

// react-hook-forms
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

import { SignInForm, SignInSchema } from "@/components/Form/FormTypes";
// supabase
import { supabaseSignIn } from "@/lib/supabaseAuth";



export const useLogin=()=> {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [getUser, { data: userData, error: getUserError }] = useLazyGetUserQuery();
  const [dataFetchError, setDataFetchError] = useState({
    error: false,
    errorDescription: ''
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  
  // Form
  const formMethods = useForm<SignInForm>({
    resolver: zodResolver(SignInSchema)
  });
  const { handleSubmit, formState: {errors}, setError } = formMethods;

  const googleSignIn:any = (OAuthUserId:string)=> getUser(OAuthUserId)
  // sign in form submission
  const onSignInSubmit: SubmitHandler<SignInForm> = async (data) => {
    setIsLoading(true);
    const signInData = await supabaseSignIn(data);
    if (signInData.error) {
      setIsLoading(false);
      setDataFetchError(()=> ({ 
          error: true, 
          errorDescription: signInData.error  
      }));
    } else if (signInData.user_id) {
      getUser(`${signInData.user_id}`);
    }
  };

  

  useEffect(() => {
    if (userData) {

      const { user } = userData;
      dispatch(
        setUser({
          user_id: user.user_id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          user_role: user.user_role,
          onboard: user.onboard,
        })
      );

      dispatch(setAuthState(true));
      const onboard = user.onboard;
      if(onboard) {
        user.user_role === "admin" ? router.push("/dashboard") : router.push("/")
      } else {
        router.push("/onboarding");
      }
      
    }

    if (getUserError) {
      setDataFetchError(()=>({
        error: true, 
        errorDescription: 'Sorry! Server Error. Try Again!'
      }));
      setIsLoading(false);
    }
  }, [userData, getUserError, dispatch, router]);
  
  
  
  return {handleSubmit, onSignInSubmit, googleSignIn, dataFetchError, isLoading, formMethods }

}
