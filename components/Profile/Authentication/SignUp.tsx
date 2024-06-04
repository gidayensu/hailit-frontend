"use client";
//ui + icons
import { FaEye, FaEyeSlash, FaApple, FaFacebook } from "react-icons/fa";
import { TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Separator } from "../../ui/separator";
import { Input } from "../../ui/input";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import Loader from "../../Shared/Loader";

//redux
import { useAppDispatch } from "@/lib/store/hooks";
import { setAuthState } from "@/lib/store/slice/authSlice";
import { setUserState } from "@/lib/store/slice/userSlice";
import { useLazyAddUserQuery } from "@/lib/store/apiSlice/hailitApi";

//react
import { useState, useEffect } from "react";

// react-hook-forms
import FormField from "@/components/Form/FormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { SignUpForm, SignUpSchema } from "@/components/Form/FormTypes";
//supabase
import { supabaseSignUp } from "@/lib/supabaseAuth";
//types
import type { Inputs } from "@/lib/supabaseAuth";
import { FiUser } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import { LuMail } from "react-icons/lu";

export default function SignUp() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [isPassword, setIsPassword] = useState<boolean>(true);

  const [addUser, { data, error: addUserError }] = useLazyAddUserQuery();

  const [dataFetchError, setDataFetchError] = useState({
    error: false,
    errorDescription: ''
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDataFetchError((prevState)=>({...prevState, error: false}));
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [dataFetchError]);

  //Form

  const formMethods = useForm<SignUpForm>({
    resolver: zodResolver(SignUpSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
    setError,
  } = formMethods;

  //form submission
  //async is used to await supabaseSignUp
  const onSignUpSubmit: SubmitHandler<Inputs> = async (userData) => {
    try {
      setIsPassword(true);
      setIsLoading(true);
      const signUpData = await supabaseSignUp(userData);
      if (signUpData && signUpData.error) {
        console.log(signUpData.error)
        setIsLoading(false);
        setDataFetchError(()=>({errorDescription: signUpData.error, error: true}));
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
    } catch (err) {
    }
  };
  if (data) {
    const { user } = data;
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

    const onboard = user.onboard;
    dispatch(setAuthState(true));

    onboard ? router.push("/profile") : router.push("/onboarding");
  }

  const isPasswordHandler = () => setIsPassword(() => !isPassword);
  return (
    <TabsContent value="signup">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Create an Account to request for delivery
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onSignUpSubmit)} className="space-y-3">
              <div className="space-y-1">
                <Label>Email</Label>

                <FormField
                  placeholder="example@email.com"
                  type="email"
                  className="h-12 "
                  name="email"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">Password</Label>

                <FormField
                  placeholder="Password"
                  type={isPassword ? "password" : "text"}
                  name="password"
                  className="h-12  relative"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="new">Confirm Password</Label>

                <FormField
                  placeholder="Confirm Password"
                  type={isPassword ? "password" : "text"}
                  name="confirm_password"
                  className="h-12 "
                />
              </div>
              
                <Button className="w-full h-12 mt-4" type="submit" disabled={isLoading}>
                  {isLoading ? <Loader color="red"/>: 'Sign Up'}
                </Button>
              
                {dataFetchError.error && (
              <div className="flex items-center justify-center w-full text-red-500">
                <span>{dataFetchError.errorDescription}</span>
              </div>
            )}
            </form>
          </FormProvider>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="flex gap-4 justify-center items-center">
            <Separator className="w-32" />
            <p className="text-sm">or</p>
            <Separator className="w-32" />
          </div>
          <Button
            variant="outline"
            className="w-full border border-slate-300 h-12 flex gap-4"
          >
            <FcGoogle className="text-2xl" /> Continue with Google
          </Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
}
