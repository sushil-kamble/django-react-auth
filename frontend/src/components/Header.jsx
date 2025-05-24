import { useAuthStore } from '../store/auth';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

const Header = () => {
    const allUserData = useAuthStore((state) => state.allUserData);
    const navigate = useNavigate();

    const handleAuthAction = (path) => {
        navigate(path);
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex items-center py-4">
                <div className="mr-4 hidden md:flex">
                    <Link to="/" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block">
                            Django React Auth
                        </span>
                    </Link>
                </div>

                {/* Mobile menu */}
                <div className="mr-4 flex md:hidden">
                    <Link to="/" className="mr-6 flex items-center space-x-2">
                        <span className="font-bold">DRA</span>
                    </Link>
                </div>

                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        {/* Search or other content can go here */}
                    </div>

                    <nav className="flex items-center gap-4">
                        {allUserData ? (
                            <>
                                <span className="hidden text-sm text-muted-foreground md:inline-flex items-center gap-2">
                                    <i className="bx bx-user text-base"></i>
                                    Welcome, {allUserData.username}
                                </span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => navigate('/private')}
                                >
                                    <i className="bx bx-grid-plus"></i>
                                    Dashboard
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleAuthAction('/logout')}
                                >
                                    <i className="bx bx-arrow-out-right-square-half"></i>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    variant="outline"
                                    onClick={() => handleAuthAction('/login')}
                                >
                                    <i className="bx bx-arrow-in-right-square-half"></i>
                                    Login
                                </Button>
                                <Button
                                    onClick={() =>
                                        handleAuthAction('/register')
                                    }
                                >
                                    <i className="bx bx-user-plus"></i>
                                    Register
                                </Button>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
