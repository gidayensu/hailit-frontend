"use client";
//packages + react + next + redux
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCustomerProfile } from "@/components/Form/hooks/useCustomerProfile";
import { setBoardingCompletion, setOnboardingStages} from "@/lib/store/slice/onBoardingSlice";
import { setUser } from "@/lib/store/slice/userSlice";

export const useOnboarding = ()=> {
  
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { authenticationState } = useAppSelector((state) => state.auth);
  const { onboard, chosenRole, stageOne, stageTwo, stageThree, loading } =
    useAppSelector((state) => state.onBoarding);
  const user = useAppSelector(state=>state.user)
  const handleOnboardStage = (
    stage: Stages
  ) => {
    try {
      
    if (stage === "First") {
      dispatch(
        setOnboardingStages({
          stageOne: true,
          stageTwo: false,
          stageThree: false,
        })
      );
    }

    if (stage === "Second") {
      
      dispatch(
        setOnboardingStages({
          stageOne: true,
          stageTwo: true,
          stageThree: false,
        })
        
      );
      
    }

    if (stage === "Third") {
      
      dispatch(
        setOnboardingStages({
          stageOne: true,
          stageTwo: true,
          stageThree: true,
        })
      );
    }

    if (stage === "Complete") {
      dispatch(setBoardingCompletion(true));
      dispatch(setUser({
        ...user, onboard: true, user_role: chosenRole
      }))
      chosenRole === "Rider" ? router.push("/dispatcher"): router.push("/");
    }
  } catch(err) {
    console.error(err)
  } 
  };

  return {authenticationState, chosenRole,  stageOne, stageTwo, stageThree, onboard, loading, handleOnboardStage}
}

export type Stages = "First" | "Second" | "Third" | "Complete"