import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const UseAuth = () => {
    const {user}=useContext(AuthContext)
    return {user};
};

export default UseAuth;