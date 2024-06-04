import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import Loader from "../../Shared/Loader";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Separator } from "../../ui/separator";

// redux
import { useLazyGetUserQuery } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch } from "@/lib/store/hooks";
import { setAuthState } from "@/lib/store/slice/authSlice";
import { setUserState } from "@/lib/store/slice/userSlice";

// react
import { useEffect, useState } from "react";

// react-hook-forms
import FormField from "@/components/Form/FormField";
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { SignInForm, SignInSchema } from "@/components/Form/FormTypes";
// supabase
import { supabaseSignIn } from "@/lib/supabaseAuth";

// types

export default function Login() {
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
        setUserState({
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
        errorDescription: 'Sorry! Server Error. Try Again! '
      }));
      setIsLoading(false);
    }
  }, [userData, getUserError, dispatch, router]);

  return (
    <TabsContent value="login">
      <Card className="rounded-2xl"> 
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Log into your account here</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          
          <FormProvider {...formMethods}>
          
          <form onSubmit={handleSubmit(onSignInSubmit)} className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="name">Email</Label>
              <FormField name="email" placeholder="example@email.com" type="email" className="h-12"/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Password</Label>
              <FormField placeholder="Password" type="password" name="password" className="h-12"  />
            </div>
            <div className="space-y-2 mt-2">
            <Button className="w-full h-12" type="submit">
              {isLoading ? <Loader color="red" /> : "Login"}
            </Button>
            </div>
            {dataFetchError.error && (
              <div className="flex items-center justify-center w-full text-red-500">
                <span>{dataFetchError.errorDescription}</span>
              </div>
            )}
          </form>
          </FormProvider>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 -mt-4">
          <div className="flex gap-4 justify-center items-center">
            <Separator className="w-32" />
            <p className="text-sm">or</p>
            <Separator className="w-32" />
          </div>
          <Button variant="outline" className="w-full border border-slate-300 h-12 flex gap-4">
            {isLoading ? (
              <Loader color="#3b82f6" />
            ) : (
              <p className="flex items-center justify-center gap-2">
                <FcGoogle className="text-2xl" /> Continue with Google
              </p>
            )}
          </Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
}
