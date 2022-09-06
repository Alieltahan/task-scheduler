import React, { useEffect, useState } from 'react';
import { auth } from '../../Firebase';
import Loader from '../Loader/loader';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    });
  }, []);

  if (pending) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
