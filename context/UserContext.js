import React from 'react'

  
// Creating the context object and passing the default values.
const UserContext = React.createContext({user: {email: '', token: ''}});
  
export default UserContext
