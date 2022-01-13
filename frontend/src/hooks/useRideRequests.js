import { useEffect, useState } from "react";
import { fetchrequests, fetchRequestsOfOneRide } from "../lib/AllDB";

export default function useRideRequests(rideId) {
  const [requests, setRequests] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setError(null);
    setIsPending(true);
    (async function () {
      try {
        const {
          data: { data },
        } = await fetchRequestsOfOneRide(rideId);
        setRequests(data);
        setIsPending(false);
      } catch (err) {
        console.log(err);
        setError(err.response?.data?.message);
        setIsPending(false);
      }
    })();
  }, []);
  return { requests, isPending, error };
}
