"use client";
//ui components + icons
import FirstStage from "@/components/Onboarding/FirstStage/FirstStage";
import LastStage from "@/components/Onboarding/LastStage";
import SecondStage from "@/components/Onboarding/SecondStage";
import Loader from "@/components/Shared/Loader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import OnboardingStagesCheck from "@/components/Onboarding/OnboardingStagesCheck";
import { FiArrowLeft } from "react-icons/fi";

//hook
import { useOnboarding } from "@/components/Onboarding/hook/useOnboarding";
import {  useState } from "react";
import ErrorComponent from "../Shared/ErrorComponent";

export default function OnboardingStages() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLoading = ()=> {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  
  const {authenticationState, chosenRole, stageOne, stageTwo, stageThree,  loading, onboard, userOnboard, handleOnboardStage} = useOnboarding();
    
  
  return (
    <>
      {(!authenticationState || userOnboard ) && (
        <ErrorComponent errorCode={404} errorMessage="Page Not Found" url="/" />
      )}
      {authenticationState && !onboard && (
        <main className="flex flex-col  items-center w-full  p-5 md:justify-center bg-slate-50 mb-20 dark:bg-primary-dark">
          {/* Onboarding stages 1 - 3 starts here */}
          <div className="flex items-center justify-center md:w-1/2">
            <OnboardingStagesCheck />
          </div>

          {/* Onboarding stage 1 */}
          {stageOne && !stageTwo && !stageThree && (
            <>
              <div className="grid  grid-cols-1 w-full min-h-[300px] p-5 gap-2 justify-between -mt-3 md:w-1/2">
                <FirstStage />
                
                  <Button
                    className="w-full bottom-0 row-start-6 "
                    onClick={() => {
                      handleOnboardStage("Second");
                    }}
                    disabled = {!chosenRole || loading}
                  >
                    {loading ? <Loader /> : "Next"}
                  </Button>
                
              </div>
            </>
          )}
          {/* Onboarding stage 2 */}
          {stageOne && stageTwo && !stageThree && (
            <>
              <SecondStage />

              <div className="flex md:w-1/3 w-full gap-4 px-4 md:p-0 ">
                <Button
                  variant={"outline"}
                  className="w-1/3"
                  
                  onClick={() => {
                    handleOnboardStage("First");
                  }}
                >
                  <FiArrowLeft />
                </Button>
                
                {/* This component does not render when the form is submitted hence it does not indicate loading state. setting disabled with the local state
                prevents the form submission. Two buttons are used to create the same effect */}
                 
                 <Button
                  className="w-full"
                  //connected to the customer profile update form
                  form="customerProfileUpdate"
                  type="submit"
                  disabled = {loading}
                  onClick={handleLoading}
                >
                  {loading ? <Loader/> : 'Next'}
                </Button>
                 
                 
                
              </div>
            </>
          )}
          {/* Onboarding stage 3 */}
          {stageOne && stageTwo && stageThree && (
            <>
              <LastStage />

              <div className="w-full md:w-2/4 p-5 flex  items-center justify-center gap-4">
                <Button
                  className="w-full"
                  onClick={() => {
                    handleOnboardStage("Complete");
                  }}
                >
                  {
                  chosenRole === "Rider" ? "Start Earning" :
                  'Send a Package'
                  }
                </Button>
              </div>
            </>
          )}
        </main>
      )}
    </>
  );
}


