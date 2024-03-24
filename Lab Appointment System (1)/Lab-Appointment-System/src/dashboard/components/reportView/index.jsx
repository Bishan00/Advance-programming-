import React from 'react'
import useAuth from '../../../libs/hooks/UseAuth';
import Admin from './components/admin';
import Patient from './components/Patient';

function Report() {
  const { setAuth, auth } = useAuth()
  if (auth.userRole === "USER") {
    return <Patient />;
  } else if (auth.userRole === "ADMIN") {
    return <Admin />;
  }
}

export default Report