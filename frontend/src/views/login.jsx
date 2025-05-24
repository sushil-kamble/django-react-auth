import { useEffect, useState } from 'react';
import { login } from '../utils/auth';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const allUserData = useAuthStore((state) => state.allUserData);

    useEffect(() => {
        if (allUserData !== null) {
            navigate('/');
        }
    }, [allUserData, navigate]);

    const resetForm = () => {
        setUsername('');
        setPassword('');
        setError('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const { error } = await login(username, password);
        if (error) {
            setError(
                typeof error === 'string'
                    ? error
                    : 'Login failed. Please try again.'
            );
        } else {
            navigate('/');
            resetForm();
        }
        setIsLoading(false);
    };

    return (
        <div className="container mx-auto flex flex-col items-center justify-center mt-10">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <Card>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
                            Welcome back
                        </CardTitle>
                        <CardDescription className="text-center">
                            Enter your credentials to access your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label
                                    htmlFor="username"
                                    className="flex items-center gap-2"
                                >
                                    Username
                                </Label>
                                <Input
                                    id="username"
                                    name="username"
                                    type="text"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    disabled={isLoading}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label
                                    htmlFor="password"
                                    className="flex items-center gap-2"
                                >
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    disabled={isLoading}
                                    required
                                />
                            </div>
                            {error && (
                                <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md flex items-center gap-2">
                                    {error}
                                </div>
                            )}
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <i className="bx bx-loader-alt animate-spin"></i>
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        <i className="bx bx-arrow-in-right-square-half"></i>
                                        Sign in
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <div className="text-center text-sm text-muted-foreground w-full flex items-center justify-center gap-2">
                            Don&apos;t have an account?{' '}
                            <Link
                                to="/register"
                                className="font-medium text-primary hover:underline inline-flex items-center gap-1"
                            >
                                Register here
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default Login;
