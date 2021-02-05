import React from "react";
import {useSelector} from 'react-redux';
import { Route, Redirect } from "react-router-dom";


const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector(state => state.authenticate)
return(
  <Route
    {...rest}
    render={(props) => {
        if(auth.isAuthenticated){
          return <Component {...props} />;
        }
        else{
        return <Redirect to="/" />
        }
        }
      
    }
  />
  
)};


export default PrivateRoute;
