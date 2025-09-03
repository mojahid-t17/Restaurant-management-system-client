import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const UseAuth = () => {
    const {user,loader}=useContext(AuthContext)
    return {user,loader};
};

export default UseAuth;