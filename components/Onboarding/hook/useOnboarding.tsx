"use client";
//packages + react + next + redux
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
    setBoardingCompletion,
    setOnboardingStages,
} from "@/lib/store/slice/onBoardingSlice";
import { setUser } from "@/lib/store/slice/userSlice";

export const useOnboarding = ()=> {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { authenticationState } = useAppSelector((state) => state.auth);
  const { onboard, chosenRole, stageOne, stageTwo, stageThree } =
    useAppSelector((state) => state.onBoarding);
  const user = useAppSelector(state=>state.user)
  const handleOnboardStage = (
    stage: "First" | "Second" | "Third" | "Complete"
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
      setIsLoading(true)
      dispatch(
        setOnboardingStages({
          stageOne: true,
          stageTwo: true,
          stageThree: false,
        })
        
      );
      setIsLoading(false)
    }

    if (stage === "Third") {
      setIsLoading(true)
      dispatch(
        setOnboardingStages({
          stageOne: true,
          stageTwo: true,
          stageThree: true,
        })
      );
      setIsLoading(false)
    }

    if (stage === "Complete") {
      dispatch(setBoardingCompletion(true));
      dispatch(setUser({
        ...user, onboard: true, user_role: chosenRole
      }))
      chosenRole === "rider" ? router.push("/dispatcher"): router.push("/");
    }
  } catch(err) {
    console.error(err)
  } 
  };

  return {authenticationState, chosenRole, isLoading, stageOne, stageTwo, stageThree, onboard, handleOnboardStage}
}