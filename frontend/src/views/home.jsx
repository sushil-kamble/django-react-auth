import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

const Home = () => {
    const allUserData = useAuthStore((state) => state.allUserData);
    
    const isLoggedIn = allUserData !== null;
    const user = allUserData ? {
        user_id: allUserData.user_id,
        username: allUserData.username,
    } : null;
    
    return (
        <div>
            {isLoggedIn ? <LoggedInView user={user} /> : <LoggedOutView />}
        </div>
    );
};

const LoggedInView = ({ user }) => {
    return (
        <div>
            <h1>Welcome {user.username}</h1>
            <Link to="/private">
                <button>Private</button>
            </Link>
            <Link to="/logout">
                <button>Logout</button>
            </Link>
        </div>
    );
};

export const LoggedOutView = ({ title = 'Home' }) => {
    return (
        <div>
            <h1>{title}</h1>
            <Link to="/login">
                <button>Login</button>
            </Link>
            <Link to="/register">
                <button>Register</button>
            </Link>
        </div>
    );
};

export default Home;
