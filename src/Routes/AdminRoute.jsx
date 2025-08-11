import { Navigate, useLocation } from "react-router-dom";
import UseAdmin from "../Hooks/UseAdmin";
import UseAuth from "../Hooks/UseAuth";


const AdminRoute = (children) => {
  const {user,loader}=UseAuth();
  const [isAdmin,adminLoading]=UseAdmin();
  const location=useLocation();
     if(user && isAdmin){
        return children;
    }
    if(loader || adminLoading){
        return <span className="loading loading-spinner text-error"></span>
    }

    return (
      <Navigate to='/signIn' state={{from:location}} replace></Navigate>
    );

};

export default AdminRoute;