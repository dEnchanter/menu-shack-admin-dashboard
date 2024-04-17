import useSWR from "swr";
import { Endpoint } from "@/util/constants";
import instance from "../util/axios";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export function useUserDetails() { 

  const router = useRouter();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    setUserId(storedUserId);
  }, []);

  const { data: user, error, ...rest } = useSWR(userId ? `${Endpoint.FETCH_USER_DETAIL}?id=${userId}` : null, userFetcher);

  async function userFetcher(url) {
    try {
      const response = await instance.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // useEffect(() => {
  //   // If user is not logged in and a redirectTo path is provided, redirect to that path
  //   if (redirectTo && !user) {
  //     router.push(redirectTo);
  //   }
  
  //   // If user is logged in and redirectIfFound is true, redirect to the path provided in redirectIfFound or some default path
  //   if (redirectIfFound && user) {
  //     router.push(redirectIfFound === true ? '/' : redirectIfFound); // Assuming '/' as a default redirect path
  //   }
  // }, [user, redirectTo, redirectIfFound]);

  return { user, ...rest };
}
