//ui + icons
import {  TabsContent } from "@/components/ui/tabs";
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
import { useLazyGetUserQuery } from "@/lib/store/apiSlice/hailitApi";

//react
import { useState, useEffect } from "react";

//react-hook-forms
import { useForm, SubmitHandler } from "react-hook-form";

//supabase

import { supabaseSignIn } from "@/lib/supabaseAuth";
//types
import type { Inputs } from "@/lib/supabaseAuth";

export default function Login () {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [getUser, {data:userData, error:getUserError}] = useLazyGetUserQuery();
    const [dataFetchError, setDataFetchError] = useState<boolean>(false);
  const [isLoading, setIsLoading] =
    useState<boolean>(false);
    
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        setDataFetchError(false);
      }, 2000);
  
      return () => clearTimeout(timeoutId);
    }, [dataFetchError]);
    //Form
    const { register, handleSubmit } = useForm<Inputs>();
    
    //sign in form submission
    const onSignInSubmit: SubmitHandler<Inputs> = async (data) => {
        
      setIsLoading(true);
        const signInData = await supabaseSignIn(data);
        if (signInData.error) {
          setIsLoading(false);
          setDataFetchError(true);
        }
        
        if (signInData.user_id) {
          getUser(`${signInData.user_id}`)
        }
      }
      if(getUserError) {
        return {error: 'Error occurred', errorMessage: "Could not fetch user"}
      } 
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
      
      const onboard = user.onboard;
      dispatch(setAuthState(true));
  
   onboard ? router.push("/profile") : router.push("/onboarding");
    };
    return (
        <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Log into your account here</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <form onSubmit={handleSubmit(onSignInSubmit)}>
              <div className="space-y-1">
                <Label htmlFor="name">Email</Label>
                <Input
                  id="name"
                  placeholder="example@email.com"
                  type="email"
                  {...register("email")}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Password</Label>
                <Input
                  id="username"
                  placeholder="Password"
                  type="password"
                  {...register("password")}
                  required
                />
              </div>
              <Button className="w-full h-12 mt-4" type="submit">
                {isLoading ? <Loader color="red" /> : "Login"}
              </Button>
              {dataFetchError && (
                <div className="flex items-center justify-center w-full  text-red-500">
                  <p>Error Occurred!</p>
                </div>
              )}
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-2">
            <div className="flex gap-4 justify-center items-center">
              <Separator className="w-32" />
              <p className="text-sm">or</p>
              <Separator className="w-32" />
            </div>
            <Button
              variant="outline"
              className="w-full border border-slate-300 h-12 flex gap-4"
              
            >
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
    )
}