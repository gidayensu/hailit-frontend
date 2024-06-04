"use client";
//packages + react + next + redux
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
    setBoardingCompletion,
    setOnboardingStages,
} from "@/lib/store/slice/onBoardingSlice";
import { setUserOnBoard } from "@/lib/store/slice/userSlice";

export const useOnboarding = ()=> {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { authenticationState } = useAppSelector((state) => state.auth);
  const { onboard, chosenRole, stageOne, stageTwo, stageThree } =
    useAppSelector((state) => state.onBoarding);

  const handleOnboardStage = (
    stage: "First" | "Second" | "Third" | "Complete"
  ) => {
    try {
      setIsLoading(true)
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
      dispatch(setUserOnBoard(true));
      router.push("/");
    }
  } finally {
    setIsLoading(false)
  }
  };

  return {authenticationState, chosenRole, isLoading, stageOne, stageTwo, stageThree, onboard, handleOnboardStage}
}