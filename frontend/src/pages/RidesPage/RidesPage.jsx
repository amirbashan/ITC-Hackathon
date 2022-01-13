import React, { useEffect, useState } from "react";
import RideList from "../../components/RideList";
import useUserRides from "../../hooks/useUserRides";

const RidesPage = (props) => {
  const { userRides } = useUserRides();
  console.log(userRides);
  return <>{userRides && <RideList rides={userRides} />}</>;
};

export default RidesPage;
