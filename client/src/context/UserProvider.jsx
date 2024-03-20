import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "./AuthProvider";

const UserContext = createContext({});

export const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const { user, auth } = useAuth();
  const [users, setUsers] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [msg, setMsg] = useState("");

  const addUser = async (user) => {
    const { data, error } = await supabase.from("user").insert(user).select();
    if (data) {
      setUsers(data[0]);
      setMsg("User Created Successfully");
    }
    if (error) {
      setErrorMsg(error.message);
    }
  };

  const editUser = async (user, email) => {
    const { data, error } = await supabase
      .from("user")
      .update(user)
      .select()
      .eq("email", email);
    if (error) {
      setErrorMsg(error.message);
      console.error(error);
    }
    if (data) {
      setMsg("User Updated");
      setUsers([]);
      if (auth) {
        fetchUser(user.email);
      }
    }
  };

  const fetchUser = async (email) => {
    const { data, error } = await supabase
      .from("user")
      .select()
      .eq("email", email);
    if (data) {
      setUsers(data[0]);
    }
    if (error) {
      setErrorMsg("Error in Fetching User detail");
      console.error(error);
    }
  };

  const getUserByUsername = async (username) => {
    const { data, error } = await supabase
      .from("user")
      .select()
      .eq("username", username);
    if (data) {
      return(data[0]);
    }
    if (error) {
      setErrorMsg("Error in Fetching User detail");
      console.error(error);
    }
  };

  useEffect(() => {
    if (auth) {
      fetchUser(user.email);
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        fetchUser,
        users,
        addUser,
        getUserByUsername,
        msg,
        setMsg,
        errorMsg,
        setErrorMsg,
        editUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
