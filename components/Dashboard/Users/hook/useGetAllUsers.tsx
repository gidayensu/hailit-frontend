import { useGetAllUsersQuery } from "@/lib/store/apiSlice/hailitApi";

export const useGetAllUsers = ({limit, offset}: {limit?: number, offset?:number}) => {
  let endpoint = 'users';
   offset && limit ? endpoint = `users?limit=${limit}&offset=${offset}` : limit ? endpoint = `users?limit=${limit}` : ''
  const { data, isLoading, error } = useGetAllUsersQuery(endpoint);
  
  
  const users = data?.users;
  const total_number_of_pages = data?.total_number_of_pages

  return { data, users, isLoading, error, total_number_of_pages };
};
