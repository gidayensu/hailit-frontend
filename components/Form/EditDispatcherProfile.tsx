"use client";
import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import {
  setFormSubmissionError,
  setFormSubmissionLoading,
} from "@/lib/store/slice/formSlice";
import { useLazyUpdateUserQuery } from "@/lib/store/apiSlice/hailitApi";
import { setOnboardingStages } from "@/lib/store/slice/onBoardingSlice";
import { setUserState } from "@/lib/store/slice/userSlice";
import { DispatcherDetails } from "@/lib/store/slice/onBoardingSlice";
import { useState } from "react";

export default function DispatcherProfile() {
  const dispatch = useAppDispatch();
  const path = usePathname();
  const { register, handleSubmit } = useForm<DispatcherDetails>();
  const inputAndLabeClass = "w-full max-w-sm items-center";
  const labelClass = "text-sm font-medium mb-1";

  const { email, user_id } = useAppSelector((state) => state.user);
  const { chosenRole } = useAppSelector((state) => state.onBoarding);

  const [updateUser, { data: updateUserData, error: updateUserError }] =
    useLazyUpdateUserQuery();
  const onCustomerFormSubmit: SubmitHandler<DispatcherDetails> = async (
    data
  ) => {
    let user_role = chosenRole;
    if (chosenRole === "dispatcher") {
      user_role = "rider";
    }
    const newUserData = { ...data, onboard: true, user_role };
    const oldUserData = { ...data, user_role };

    path.startsWith("/onboarding")
      ? updateUser({ userId: user_id, userDetails: newUserData })
      : updateUser({ userId: user_id, userDetails: oldUserData });
  };
  if (updateUserError) {
  }

  if (updateUserData) {
    const { user } = updateUserData;
    dispatch(
      setOnboardingStages({
        stageOne: true,
        stageTwo: true,
        stageThree: true,
      })
    );

    dispatch(
      setUserState({
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        onboard: user.onboard,
        user_id: user.user_id,
        user_role: user.user_role,
      })
    );
  }

  return (
    <form
      className="w-full flex flex-col items-center justify-center gap-3 "
      id="customerProfileUpdate"
      onSubmit={handleSubmit(onCustomerFormSubmit)}
    >
      <div className={inputAndLabeClass}>
        <h3 className={labelClass}>First Name</h3>
        <Input
          type="text"
          placeholder="First Name"
          className="h-14 "
          {...register("first_name")}
          required
        />
      </div>
      <div className={inputAndLabeClass}>
        <h3 className={labelClass}>Last Name</h3>
        <Input
          type="text"
          placeholder="Last Name"
          className="h-14"
          {...register("last_name")}
          required
        />
      </div>

      <div className={inputAndLabeClass}>
        <h3 className={labelClass}>Email</h3>
        <Input
          type="email"
          placeholder="email@example.com"
          className="h-14"
          defaultValue={email}
          required
        />
      </div>
      <div className={inputAndLabeClass}>
        <h3 className={labelClass}>Licence Number</h3>
        <Input
          type="text"
          placeholder="License Number"
          className="h-14"
          {...register("license_number")}
          required
        />
      </div>
      <div className={inputAndLabeClass}>
        <h3 className={labelClass}>Phone Number</h3>
        <Input
          type="text"
          placeholder="024 123 4567"
          className="h-14"
          {...register("phone_number")}
          required
        />
      </div>
    </form>
  );
}
