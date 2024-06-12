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

export default function Onboarding() {
  const {authenticationState, chosenRole, isLoading, stageOne, stageTwo, stageThree, onboard, handleOnboardStage} = useOnboarding();
  return (
    <>
      {(!authenticationState || onboard) && (
        <section className="flex flex-col items-center justify-center bg-slate-50 dark:bg-primary-dark min-h-screen gap-4">
          <h2 className="font-bold text-2xl">Page Not Found</h2>
          <Link href={"/"}>
            
            <Button>Return Home </Button>
          </Link>
        </section>
      )}
      {authenticationState && !onboard && (
        <main className="flex flex-col  items-center w-full h-screen p-5 md:justify-center bg-slate-50 mb-20 dark:bg-primary-dark">
          {/* Onboarding stages 1 - 3 starts here */}
          <div className="flex items-center justify-center md:w-1/2">
            <OnboardingStagesCheck />
          </div>

          {/* Onboarding stage 1 */}
          {stageOne && !stageTwo && !stageThree && (
            <>
              <div className="grid  grid-cols-1 w-full min-h-[300px] p-5 gap-2 justify-between -mt-3 md:w-1/2">
                <FirstStage />
                {chosenRole && !isLoading && (
                  <Button
                    className="w-full bottom-0 row-start-6 "
                    onClick={() => {
                      handleOnboardStage("Second");
                    }}
                    disabled = {!chosenRole || isLoading}
                  >
                    {isLoading ? <Loader /> : "Next"}
                  </Button>
                )}                
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
                 <Button
                  className="w-full"
                  form="customerProfileUpdate"
                  type="submit"
                  disabled = {isLoading}
                >
                  {isLoading ? <Loader />:'Next'}
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
                  chosenRole === "rider" ? "Start Earning" :
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


