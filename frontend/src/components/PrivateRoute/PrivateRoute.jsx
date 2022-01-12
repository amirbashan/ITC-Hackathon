import React from 'react';
import { useNavigate,Navigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const PrivateRoute = ({ children, redirectTo }) => {
  const { user } = useUser()
  const { navigate } = useNavigate()
  return <>{user && user.token ? children : <Navigate to={redirectTo} />}</>;
}

export default PrivateRoute;