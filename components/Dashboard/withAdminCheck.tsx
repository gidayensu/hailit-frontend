"use client";
import { useAppSelector } from "@/lib/store/hooks";
import { useGetAdminQuery } from "@/lib/store/apiSlice/hailitApi";
import BigLoader from "../Shared/BigLoader";
import ErrorComponent from "../Shared/ErrorComponent";
import { useRouter } from "next/navigation";
const withAdminCheck = <T extends {}>(
  
  WrappedComponent: React.ComponentType<T>
) => {
  
  const WrapperComponent = (props: T) => {
    const { user_id } = useAppSelector((state) => state.user);
    const { data, isLoading, error } = useGetAdminQuery(user_id);
    const router = useRouter();
    const isAdmin = data?.admin;

    if (!isAdmin && !isLoading && !error) {
      return (
        <ErrorComponent errorCode={403} errorMessage="Forbidden" url="/" />
      ); // or Loading component or Unauthorized component
    }
    if (isLoading) {
      return (
        <div className="w-full flex items-center justify-center">
          <BigLoader />
        </div>
      );
    }
    if (error) {
      router.push('/authentication')
    }
    if(isAdmin) {

      return <WrappedComponent {...props} />;
    }
  };

  return WrapperComponent;
};

export default withAdminCheck;
