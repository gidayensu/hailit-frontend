"use client";
import { User, UserSchema } from "@/components/Form/FormTypes";
import { useUpdateUserMutation } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch } from "@/lib/store/hooks";
import { setSelectedUserId } from "@/lib/store/slice/dashboardSlice";
import { CustomerDetails } from "@/lib/store/slice/onBoardingSlice";
import { UserRole } from "@/lib/store/slice/userSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUserProfile } from "./useUserProfile";


export const useEditUser = () => {
  const {  selectedUser } = useUserProfile();
  const [userRole, setUserRole] = useState<UserRole>(selectedUser?.user_role)
  const [onboard, setOnboard] = useState<boolean>(selectedUser?.onboard);
  const dispatch = useAppDispatch();

  const handleOnboard = () => {
    setOnboard(() => !onboard);
  };

  
  const [updateUser, { isSuccess, isLoading, error, reset }] = useUpdateUserMutation();
  //SecondaryModal ref
  const edituserModalRef = useRef<any>(null);
  const userModal = edituserModalRef.current;

  
  const openUserModal = () => {
    userModal?.showModal();
  };
  const closeUserModal = () => {
    userModal?.close();
    reset()
  };


  

  const handleUserRoleSelection = (userRole:UserRole)=> {
      setUserRole(userRole)
  }

  //form submission
  const formMethods = useForm<User>({
    resolver: zodResolver(UserSchema),
  });
  const {
    
    handleSubmit,
    
    
  } = formMethods;

  const onCustomerFormSubmit: SubmitHandler<CustomerDetails> = async (
    formData
  ) => {
    try {
      const userDetails = { ...formData, onboard, user_role: userRole };

      await updateUser({ userId: selectedUser?.user_id, userDetails });
    } catch (err) {


      return { error: err };
    }
  };

  
if(isSuccess || error) {
  openUserModal();
  
  
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
    edituserModalRef,
    closeUserModal,
    handleUserRoleSelection,
    userRole,
    selectedUser
  };
};
