import React, { useState, useContext } from "react";
import { runInNewContext } from "vm";

const defaultValue = {
  user: { name: "", loggedIn: false },
  fn: {
    logUserIn: () => {},
  },
};

const UserContext = React.createContext(defaultValue);

interface IProps {
  children: React.ReactNode;
}

const UserContextProvider: React.FunctionComponent<IProps> = ({ children }) => {
  const [user, setUser] = useState({
    name: "Mu",
    loggedIn: false,
  });
  const logUserIn = () => setUser({ ...user, loggedIn: true });

  return (
    <UserContext.Provider value={{ user, fn: { logUserIn } }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const { user } = useContext(UserContext);
  return user;
};

export const useFns = () => {
  const { fn } = useContext(UserContext);
  return fn;
};

export default UserContextProvider;
