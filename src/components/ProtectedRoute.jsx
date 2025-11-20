import { useUser } from '@clerk/clerk-react';
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({children}) => {

  // const { isLoaded, isSignedIn, user } = useUser();
  // // const navigate = useNavigate();
  // const { pathname } = useLocation();

  // if(isLoaded && !isSignedIn && isSignedIn !== undefined){
  //   return <Navigate to="/?sign-in=true" replace />;
  // }

  // if(
  //   !user?.unsafeMetadata?.role &&
  //   user !== undefined &&
  //   pathname !== '/onboarding'
  // ) {
  //     return <Navigate to="/onboarding" replace />
  //   }

  return children;
}

export default ProtectedRoute;