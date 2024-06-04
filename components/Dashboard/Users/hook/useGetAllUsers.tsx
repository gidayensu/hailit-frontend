import { useGetAllUsersQuery } from "@/lib/store/apiSlice/hailitApi";

export const useGetAllUsers = () => {
  const { data, isLoading, error } = useGetAllUsersQuery(`users?limit=7`);
  const users = data?.users;

  return { users, isLoading, error };
};
