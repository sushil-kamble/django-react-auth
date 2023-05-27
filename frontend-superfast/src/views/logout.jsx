import { useEffect } from 'react';
import { LoggedOutView } from './home';
import { logout } from '../utils/auth';

const Logout = () => {
    useEffect(() => {
        logout();
    }, []);
    return <LoggedOutView title="You have been logged out" />;
};

export default Logout;
