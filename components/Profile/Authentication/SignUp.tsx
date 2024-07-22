'use client'
//ui + icons
import { FcGoogle } from "react-icons/fc";
import Loader from "../../Shared/Loader";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Separator } from "../../ui/separator";

// react-hook-forms
import FormField from "@/components/Form/FormField";
import { FormProvider } from "react-hook-form";

import Container from "@/components/ui/container";
import Link from "next/link";
import { useSignUp } from "./hooks/useSignUp";

export default function SignUp() {
  const {
    onSignUpSubmit,
    formMethods,
    handleSubmit,
    dataFetchError,
    isLoading,
    googleSupabaseSignIn,
    demoSignUpDetail,
    handleRandomSignUp
  } = useSignUp();


  
  
  return (
    <div className="w-full ">
      
    <div className="flex gap-2 mb-4 w-full">
            <Button variant={'outline'} className="w-full" onClick={handleRandomSignUp}>
              Generate random signup details
            </Button>
            
      </div>
      <Container className="rounded-2xl w-full p-6 flex flex-col gap-3"> 
        <div>
        <p className="font-semibold text-3xl">Sign Up</p>
          {/* <span>
            Create an Account to request for delivery
          </span> */}
        </div>
        <div className="space-y-2 mt-2">
          <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onSignUpSubmit)} className="space-y-3">
              <div className="space-y-1">
                <Label>Email</Label>

                <FormField
                  placeholder="example@email.com"
                  type="email"
                  className="h-12 "
                  name="email"
                  defaultValue={demoSignUpDetail}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">Password</Label>

                <FormField
                  placeholder="Password"
                  type="password"
                  name="password"
                  className="h-12"
                  defaultValue={demoSignUpDetail}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="new">Confirm Password</Label>

                <FormField
                  placeholder="Confirm Password"
                  type="password"
                  name="confirm_password"
                  className="h-12 "
                  defaultValue={demoSignUpDetail}
                />
              </div>

              <Button
                className="w-full h-12 mt-4"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <Loader /> : "Sign Up"}
              </Button>

              {dataFetchError.error && (
                <div className="flex items-center justify-center w-full text-red-500">
                  <span>{dataFetchError.errorDescription}</span>
                </div>
              )}
            </form>
          </FormProvider>
        </div>
        <div className="flex flex-col gap-4 mt-3">
          <div className="flex gap-4 justify-center items-center">
            <Separator className="w-32" />
            <p className="text-sm">or</p>
            <Separator className="w-32" />
          </div>
          
          <Button
            variant="outline"
            className="w-full border border-slate-300 h-12 flex gap-4"
            onClick={googleSupabaseSignIn}
          >
            <FcGoogle className="text-2xl" /> Continue with Google
          </Button>
          <Link href={'/order'} className="w-full">
          <Button
            variant="outline"
            className="w-full border border-slate-300 h-12 flex gap-4"
            
          >
            Continue as Guest
          </Button>
          </Link>
        </div>

      </Container>
    </div>
  );
}

