"use client";
import { User, UserSchema } from "@/components/Form/FormTypes";
import { useUpdateUserMutation } from "@/lib/store/apiSlice/hailitApi";
import { CustomerDetails } from "@/lib/store/slice/onBoardingSlice";
import { UserRole } from "@/lib/store/slice/userSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { User as UserInterface } from "./useGetAllUsers";
import { useAppDispatch } from "@/lib/store/hooks";
import { setSelectedUserId } from "@/lib/store/slice/dashboardSlice";


export const useEditUser = (user: UserInterface) => {
  const dispatch = useAppDispatch();

  const [userRole, setUserRole] = useState<UserRole>(user.user_role)
  const [isError, setIsError] = useState<boolean>(false);
  const [onboard, setOnboard] = useState<boolean>(user.onboard);

  const handleOnboard = () => {
    setOnboard(() => !onboard);
  };

  
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

  

  const handleUserRoleSelection = (userRole:UserRole)=> {
      setUserRole(userRole)
  }

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
    // if user is changed from customer to a different role, that role will not have customerTrips. 
    // There will be an error if the user clicks on the 'back arrrow'. Hence, the selectedUserId is set to empty string to return 
    //the user to All Users table. 
    
    if(userRole !== "Customer") {
      setTimeout(()=> {

        dispatch(setSelectedUserId(''))
      }, 1000)
    }

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
    handleUserRoleSelection,
    userRole
  };
};
