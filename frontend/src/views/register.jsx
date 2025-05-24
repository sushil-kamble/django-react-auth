import { useEffect, useState } from 'react';
import { register } from '../utils/auth';
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

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const allUserData = useAuthStore((state) => state.allUserData);
    const navigate = useNavigate();

    useEffect(() => {
        if (allUserData !== null) {
            navigate('/');
        }
    }, [allUserData, navigate]);

    const resetForm = () => {
        setUsername('');
        setPassword('');
        setPassword2('');
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Client-side validation
        if (password !== password2) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            setIsLoading(false);
            return;
        }

        const { error } = await register(username, password, password2);
        if (error) {
            setError(typeof error === 'string' ? error : JSON.stringify(error));
        } else {
            navigate('/');
            resetForm();
        }
        setIsLoading(false);
    };

    const passwordsMatch = password === password2;
    const showPasswordMismatch = password2.length > 0 && !passwordsMatch;

    return (
        <div className="container mx-auto flex flex-col items-center justify-center mt-10">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <Card>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
                            Create an account
                        </CardTitle>
                        <CardDescription className="text-center">
                            Enter your details to create a new account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
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
                                    placeholder="Choose a username"
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
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    disabled={isLoading}
                                    required
                                />
                                {password.length > 0 && password.length < 6 && (
                                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                                        Password must be at least 6 characters
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label
                                    htmlFor="confirm-password"
                                    className="flex items-center gap-2"
                                >
                                    Confirm Password
                                </Label>
                                <Input
                                    id="confirm-password"
                                    name="confirm-password"
                                    type="password"
                                    placeholder="Confirm your password"
                                    value={password2}
                                    onChange={(e) =>
                                        setPassword2(e.target.value)
                                    }
                                    disabled={isLoading}
                                    required
                                />
                                {showPasswordMismatch && (
                                    <p className="text-xs text-destructive flex items-center gap-1">
                                        Passwords do not match
                                    </p>
                                )}
                                {passwordsMatch && password2.length > 0 && (
                                    <p className="text-xs text-green-600 flex items-center gap-1">
                                        Passwords match
                                    </p>
                                )}
                            </div>
                            {error && (
                                <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md flex items-center gap-2">
                                    <i className="bx bx-error-circle"></i>
                                    {error}
                                </div>
                            )}
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={
                                    isLoading ||
                                    !passwordsMatch ||
                                    password.length < 6
                                }
                            >
                                {isLoading ? (
                                    <>
                                        <i className="bx bx-loader-alt animate-spin"></i>
                                        Creating account...
                                    </>
                                ) : (
                                    <>
                                        <i className="bx bx-user-plus"></i>
                                        Create account
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <div className="text-center text-sm text-muted-foreground w-full flex items-center justify-center gap-2">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="font-medium text-primary hover:underline inline-flex items-center gap-1"
                            >
                                Login here
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}

export default Register;
