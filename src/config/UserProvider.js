import { createContext, useContext, useEffect, useState } from 'react';
import { useFirebase } from './FirebaseContext';
import { onAuthStateChanged } from 'firebase/auth';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const { auth } = useFirebase();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};

export default UserProvider;
