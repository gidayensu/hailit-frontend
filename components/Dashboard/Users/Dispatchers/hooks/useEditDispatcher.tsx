"use client";
import { User, UserSchema } from "@/components/Form/FormTypes";
import { useUpdateUserMutation } from "@/lib/store/apiSlice/hailitApi";
import { CustomerDetails } from "@/lib/store/slice/onBoardingSlice";
import { UserRole } from "@/lib/store/slice/userSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";


export const useEditDispatcher = (dispatcher: any) => {
  const [userRole, setUserRole] = useState<UserRole>("customer");
  const [isError, setIsError] = useState<boolean>(false);
  const [available, setAvailable] = useState<boolean>(false);
  const [newUserRole, setNewUserRole] = useState<string>(dispatcher.user_role);
  
  const handleAvailable = () => {
    setAvailable(() => !available);
  };

  useEffect(() => {
    setAvailable(dispatcher.available);
  }, [setAvailable, dispatcher]);

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
      const userDetails = { ...formData, user_role: userRole };

      await updateUser({ userId: dispatcher.user_id, userDetails });
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
    setAvailable,
    available,
    handleAvailable,
    modalRef,
    closeModal,
  };
};
