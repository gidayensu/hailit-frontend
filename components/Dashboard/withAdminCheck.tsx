'use client'
import { useAppSelector } from '@/lib/store/hooks';
import { useGetAdminQuery } from '@/lib/store/apiSlice/hailitApi';
import { useRouter } from 'next/navigation';
import ErrorComponent from '../Shared/ErrorComponent';



const withAdminCheck = <Q extends {}>(WrappedComponent: React.ComponentType<Q>) => {
  const WrapperComponent = (props: Q) => {
    const { user_id } = useAppSelector((state) => state.user);
    const { data, isLoading, error } = useGetAdminQuery(user_id);
  
  const isAdmin = data?.admin;
  
    

    if (!isAdmin) {
      return <ErrorComponent errorCode={404} errorMessage='Page Not Found'  url='/' /> // or Loading component or Unauthorized component
    }

    return <WrappedComponent {...props} />;
  };

  return WrapperComponent;
};

export default withAdminCheck;
