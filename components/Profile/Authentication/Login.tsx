'use client'
import { googleSupabaseSignIn } from "@/lib/supabaseAuth";
import { FcGoogle } from "react-icons/fc";
import Loader from "../../Shared/Loader";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Separator } from "../../ui/separator";
import GuestModal from "./GuestModal";
// next

// react

// react-hook-forms
import FormField from "@/components/Form/FormField";
import { FormProvider } from 'react-hook-form';


import Container from "@/components/ui/container";
import { useLogin } from "./hooks/useLogin";
// supabase


export default function Login( ) {
  const  {handleSubmit, onSignInSubmit, dataFetchError, isLoading, formMethods, setLoginDetail, loginDetail } = useLogin();
    
  return (
      <div className="w-full">
        <div className="flex gap-2 items-center justify-center mb-2">
          
          <p>Login as:</p>
        </div>
        <div className="flex gap-2 mb-4 w-full">
          <Button
            variant={"outline"}
            className="w-full"
            onClick={() => setLoginDetail("admin@hailit.vercel.app")}
          >
            Admin
          </Button>
          <Button
            variant={"outline"}
            className="w-full"
            onClick={() => setLoginDetail("customer@hailit.vercel.app")}
          >
            Customer
          </Button>
          <Button
            variant={"outline"}
            className="w-full"
            onClick={() => setLoginDetail("rider@hailit.vercel.app")}
          >
            Rider
          </Button>
        </div>
        <Container className="rounded-2xl w-full p-6 flex flex-col gap-3"> 
          <div>
            <p className="font-semibold text-3xl">Login</p>
          </div>
          <div className="space-y-2 ">
            <FormProvider {...formMethods}>
              <form
                onSubmit={handleSubmit(onSignInSubmit)}
                className="space-y-3"
              >
                <div className="space-y-1">
                  <Label htmlFor="name">Email</Label>

                  <FormField
                    name="email"
                    placeholder="example@email.com"
                    type="email"
                    className="h-12"
                    defaultValue={loginDetail}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Password</Label>
                  <FormField
                    placeholder="Password"
                    type="password"
                    name="password"
                    className="h-12"
                    defaultValue={loginDetail}
                  />
                </div>
                <div className="space-y-2 mt-2">
                  <Button
                    className="w-full h-12"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? <Loader /> : "Login"}
                  </Button>
                </div>
                {dataFetchError.error && (
                  <div className="flex items-center justify-center w-full text-red-500">
                    <span>{dataFetchError.errorDescription}</span>
                  </div>
                )}
              </form>
            </FormProvider>
          </div>
          <div className="flex flex-col gap-2 mt-2">
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
              {isLoading ? (
                <Loader color="#3b82f6" />
              ) : (
                <p className="flex items-center justify-center gap-2">
                  <FcGoogle className="text-2xl" /> Continue with Google
                </p>
              )}
            </Button>
            <GuestModal/>
            
          </div>
        </Container>
      </div>
    
  );
}
