import { useEffect, useState } from "react";
import { fetchUserRides } from "../lib/AllDB";
import { useAuthContext } from "./useAuthContext";

export default function useUserRides() {
  const { user } = useAuthContext();
  const [userRides, setUserRides] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setError(null);
    setIsPending(true);
    (async function () {
      if (user) {
        try {
          const {
            data: { data },
          } = await fetchUserRides();
          setUserRides(data);
          setIsPending(false);
        } catch (err) {
          console.log(err);
          setError(err.response?.data?.message);
          setIsPending(false);
        }
      }
    })();
  }, [user?._id]);
  return { userRides, isPending, error };
}
