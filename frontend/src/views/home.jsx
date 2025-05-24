import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

const Home = () => {
    const allUserData = useAuthStore((state) => state.allUserData);

    const isLoggedIn = allUserData !== null;
    const user = allUserData
        ? {
              user_id: allUserData.user_id,
              username: allUserData.username,
          }
        : null;

    return (
        <div className="container mx-auto px-4 py-8">
            {isLoggedIn ? <LoggedInView user={user} /> : <LoggedOutView />}
        </div>
    );
};

const LoggedInView = ({ user }) => {
    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tight flex items-center justify-center gap-3">
                    Welcome back, {user.username}!
                </h1>
                <p className="text-muted-foreground flex items-center justify-center gap-2">
                    You&apos;re successfully logged into Django React Auth
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            Dashboard
                        </CardTitle>
                        <CardDescription>
                            Access your private dashboard and manage your
                            account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Link to="/private">
                            <Button className="w-full">
                                <i className="bx bx-right-arrow-alt"></i>
                                Go to Dashboard
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            Account
                        </CardTitle>
                        <CardDescription>
                            Manage your account settings and preferences
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground flex items-center gap-2">
                                User ID: {user.user_id}
                            </p>
                            <p className="text-sm text-muted-foreground flex items-center gap-2">
                                Username: {user.username}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export const LoggedOutView = ({ title = 'Django React Auth' }) => {
    return (
        <div className="max-w-2xl mx-auto space-y-8 text-center mt-10">
            <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl flex items-center justify-center gap-4">
                    {title}
                </h1>
                <p className="text-xl text-muted-foreground flex items-center justify-center gap-2">
                    A modern authentication system built with Django and React
                </p>
            </div>

            <div className="space-y-4">
                <p className="text-muted-foreground flex items-center justify-center gap-2">
                    Get started by creating an account or logging into your
                    existing one
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/register">
                        <Button size="lg" className="w-full sm:w-auto">
                            <i className="bx bx-user-plus"></i>
                            Get Started
                        </Button>
                    </Link>
                    <Link to="/login">
                        <Button
                            variant="outline"
                            size="lg"
                            className="w-full sm:w-auto"
                        >
                            <i className="bx bx-arrow-in-right-square-half"></i>
                            Login
                        </Button>
                    </Link>
                </div>
            </div>

            <Card className="max-w-md mx-auto">
                <CardHeader>
                    <CardTitle className="text-lg text-center">
                        Features
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="text-sm text-muted-foreground space-y-2 text-left">
                        <li className="flex items-center gap-2">
                            Secure JWT authentication
                        </li>
                        <li className="flex items-center gap-2">
                            Modern React frontend
                        </li>
                        <li className="flex items-center gap-2">
                            Django REST API backend
                        </li>
                        <li className="flex items-center gap-2">
                            Responsive design
                        </li>
                        <li className="flex items-center gap-2">
                            User-friendly interface
                        </li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
};

export default Home;
