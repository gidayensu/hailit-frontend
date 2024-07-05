"use client";
import { User, UserSchema } from "@/components/Form/FormTypes";
import { useUpdateUserMutation } from "@/lib/store/apiSlice/hailitApi";
import { CustomerDetails } from "@/lib/store/slice/onBoardingSlice";
import { UserRole } from "@/lib/store/slice/userSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { User as UserInterface } from "./useGetAllUsers";

export const useEditUser = (user: UserInterface) => {
  const [userRole, setUserRole] = useState<UserRole>("customer");
  const [isError, setIsError] = useState<boolean>(false);
  const [onboard, setOnboard] = useState<boolean>(false);

  const handleOnboard = () => {
    setOnboard(() => !onboard);
  };

  useEffect(() => {
    setOnboard(user.onboard);
  }, [setOnboard, user]);

  //DashboardModal ref
  const modalRef = useRef<any>(null);
  const modal = modalRef.current;

  const openModal = () => {
    modal?.showModal();
  };
  const closeModal = () => {
    modal?.close();
  };

  const [updateUser, { isSuccess, isLoading, error }] = useUpdateUserMutation();

  const handleUserRoleSelection = (userRole: UserRole) => {
    setUserRole(userRole);
  };

  //form submission
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
      const userDetails = { ...formData, onboard, user_role: userRole };

      await updateUser({ userId: user.user_id, userDetails });
    } catch (err) {
      setIsError(true);

      return { error: err };
    }
  };

  if(isSuccess || error) {
    openModal();
  }

  return {
    formMethods,
    handleSubmit,
    onCustomerFormSubmit,
    isLoading,
    isSuccess,
    error,
    onboard,
    handleOnboard,
    modalRef,
    closeModal,
  };
};
