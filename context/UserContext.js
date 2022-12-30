import React from 'react'

  
// Creating the context object and passing the default values.
const UserContext = React.createContext({
    user: {
        email: '', 
        token: '', 
        isPremium: false, 
        isEmailValidated: false, 
        isSMSValidated: false
    }
});
  
export default UserContext
