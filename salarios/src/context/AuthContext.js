import React, { useContext, useState, useEffect } from 'react';
import 'firebase/auth';
import firebase, { auth } from '../Firebase';

//Permite que toda la aplicación tenga acceso a la data
const AuthContext = React.createContext();

//Función para utilizar Context
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  //Maneja el estado del componente, con la data del usuario actual
  const [currentUser, setCurrentUser] = useState();

  const [loading, setLoading] = useState(true);

  //Utiliza Auth para crear un nuevo usuario
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  //Solo se necesita que se active al montarse el componente
  useEffect(() => {
    //Esta función es propia de react para poder establecer el usuario
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  //Contiene los datos que se comparten en todos los componentes hijos
  const value = {
    currentUser,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
