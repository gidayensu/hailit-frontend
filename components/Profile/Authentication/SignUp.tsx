'use client'
//ui + icons
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

//react-hook-forms
import { useForm, SubmitHandler } from "react-hook-form";


//supabase
import {
  supabaseSignUp,
} from "@/lib/supabaseAuth";
//types
import type { Inputs } from "@/lib/supabaseAuth";

export default function SignUp() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [addUser, {data, error: addUserError}] = useLazyAddUserQuery();
  const [dataFetchError, setDataFetchError] = useState<boolean>(false);
  const [isLoading, setIsLoading] =
    useState<boolean>(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDataFetchError(false);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [dataFetchError]);

  const { register, handleSubmit } = useForm<Inputs>();

  //sign up form submission
  const onSignUpSubmit: SubmitHandler<Inputs> = async (userData) => {
    try {
    setIsLoading(true);
    const signUpData = await supabaseSignUp(userData);
    if (signUpData && signUpData.error) {
      setIsLoading(false);
      setDataFetchError(true);
    }

    if (signUpData.user_id) {
      addUser({
        user_id: signUpData.user_id,
        email: signUpData.email
      })
    
      if(addUserError) {
        return {error: 'Error occurred', errorMessage: "Could not add user to database"}
      } 
    
    }  
    } catch(err) { 
       console.log({error: err})
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
  
    return (
        <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Create an Account to request for delivery
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <form onSubmit={handleSubmit(onSignUpSubmit)}>
              <div className="space-y-1">
                <Label>Email</Label>
                <Input
                  id="current"
                  type="email"
                  {...register("email")}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">Password</Label>
                <Input
                  id="new"
                  type="password"
                  {...register("password")}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">Confirm Password</Label>
                <Input id="new" type="password" />
              </div>
              {!isLoading && <Button className="w-full h-12 mt-4" type="submit">
                Sign Up
              </Button>}
              {
                isLoading && 
                <Button className="w-full h-12 mt-4" disabled>
                <Loader color="red"/>
              </Button>
              }
            </form>
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

    )
}