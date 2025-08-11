import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const PrivateRoute = ({children}) => {
    const location=useLocation();
    const {loader,user}=useContext(AuthContext)
     if(user){
        return children;
    }
    if(loader){
        return <span className="loading loading-spinner text-error"></span>
    }

    return (
      <Navigate to='/signIn' state={{from:location}} replace></Navigate>
    );
};

export default PrivateRoute;