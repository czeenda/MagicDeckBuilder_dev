import { createContext, useContext, useState, useEffect } from "react";

//import {MyContext} from './../context/MyContext'


import {supabase} from './../supabase/client'

//const { deck, setDeck} = useContext(MyContext)



const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);


const register = async (email, password) => {
  return supabase.auth.signUp({ email, password });
}

const login = async (email, password) => {
  //setDeck(false)
  return supabase.auth.signInWithPassword({ email, password });
}

const logout = async () => {

  return supabase.auth.signOut();
}

// provider komponenta
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session.user);
        setAuth(true);
      }
      if (event === 'SIGNED_OUT') {
        setUser(null);
        setAuth(false);
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, [])



  return (
    <AuthContext.Provider value={{ auth, user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;