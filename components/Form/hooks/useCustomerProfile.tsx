"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLazyUpdateUserQuery } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  CustomerDetails,
  setOnboardingStages,
} from "@/lib/store/slice/onBoardingSlice";
import { setUser } from "@/lib/store/slice/userSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { User, UserSchema } from "../FormTypes";

export const useCustomerProfile = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const path = usePathname();

  const { email, user_id, user_role } = useAppSelector((state) => state.user);
  const { chosenRole } = useAppSelector((state) => state.onBoarding);

  const [updateUser, { data, isLoading, error }] = useLazyUpdateUserQuery();

  const formMethods = useForm<User>({
    resolver: zodResolver(UserSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = formMethods;

  const onCustomerFormSubmit: SubmitHandler<CustomerDetails> = async (
    formData
  ) => {
    try {
      setLoading(true);
      let userRole = user_role;
      if (chosenRole && chosenRole === "rider") {
        userRole = "rider";
      }

      const newUserData = { ...formData, onboard: true, user_role: userRole };
      const oldUserData = { ...formData, user_role };

      if (!path.startsWith("/onboarding")) {
        updateUser({ userId: user_id, userDetails: oldUserData });
      }

      if (path.startsWith("/onboarding")) {
        updateUser({ userId: user_id, userDetails: newUserData });
      }

      if (error) {
        setLoading(false)
        return { error: "error occurred" };
      }
    } catch (err) {
      setIsError(true);
      setLoading(false)
      return { error: err };
    }
  };

  if (data && data.user) {
    const { user } = data;
    dispatch(
      setUser({
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        user_role: data.user_role,
        onboard: user.onboard,
      })
    );
    dispatch(
      setOnboardingStages({
        stageOne: true,
        stageTwo: true,
        stageThree: true,
      })
    );
  }

  if (data && data.error) {
    setIsError(true);
    setLoading(false)
  }
  return { formMethods, loading, handleSubmit, onCustomerFormSubmit, email, isError, chosenRole };
};
