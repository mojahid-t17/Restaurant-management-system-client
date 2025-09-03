import { Navigate, useLocation } from "react-router-dom";
import UseAdmin from "../Hooks/UseAdmin";
import UseAuth from "../Hooks/UseAuth";


const AdminRoute = ({children}) => {
  const {user,loader}=UseAuth();
  const [isAdmin,adminLoading]=UseAdmin();
  const location=useLocation();

  if(loader || adminLoading){
        return <span className="loading loading-spinner text-error"></span>
    }
     if(user && isAdmin){
        return children;
    }
    return (
      <Navigate to='/' state={{from:location}} replace></Navigate>
    );

};

export default AdminRoute;