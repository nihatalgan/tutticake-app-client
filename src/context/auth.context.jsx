import React, { useState, useEffect } from "react";

import authService from "../services/auth.service";
import orderService from "../services/order.service";
import usersService from "../services/users.service";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [cartItemCount, setCartItemCount] = useState(0);
  
  const storeToken = (token) => {      
    localStorage.setItem('authToken', token);
  }

  const authenticateUser = () => {     
    setIsLoading(true);

    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem('authToken');
    
    // If the token exists in the localStorage
    if (storedToken) {
      // We must send the JWT token in the request's "Authorization" Headers
      authService
      .verify()
      .then((response) => {
        // If the server verifies that the JWT token is valid  
        const user = response.data;
        orderService.getCartDetails()
          .then((resp) => {
            if (resp.data && resp.data.cakes) {
              const count = resp.data.cakes.length
              setCartItemCount(count);
            }
          })
          .catch((error) => {
            console.log(error);
          })
        // Update state variables        
        getUserDetails();        
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.log(error);
        // If the server sends an error response (invalid token) 
        // Update state variables         
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);        
      });      
    } else {
      // If the token is not available (or is removed)
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);      
    }   
  }

  const removeToken = () => {                   
    // Upon logout, remove the token from the localStorage
    localStorage.removeItem("authToken");
  }
 
 
  const getUserDetails = () => {    
    setIsLoading(true);
    usersService
    .getUserDetails()
    .then((response) => {
      const user = response.data;
      setIsLoading(false);
      setUser(user);        
    })
    .catch((error) => {
      // If the server sends an error response (invalid token) 
      // Update state variables         
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);        
    }); 
  }  


 const logOutUser = () => {                      
    // To log out the user, remove the token
    removeToken();
    // and update the state variables    
    authenticateUser();
  }  

  
 
  
  useEffect(() => {                                                 
    authenticateUser();
  }, []);
 
  return (                                                   
    <AuthContext.Provider 
      value={{ 
        isLoggedIn,
        isLoading,
        user,
        setUser,
        getUserDetails,
        storeToken, 
        authenticateUser,
        logOutUser,
        cartItemCount,
        setCartItemCount,   
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthProviderWrapper, AuthContext };