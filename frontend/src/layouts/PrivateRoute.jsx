import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

const PrivateRoute = ({ children }) => {
    const allUserData = useAuthStore((state) => state.allUserData);
    const loggedIn = allUserData !== null;
    return loggedIn ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
