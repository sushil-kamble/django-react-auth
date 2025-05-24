import { useEffect, useState } from 'react';
import { LoggedOutView } from './home';
import { logout } from '../utils/auth';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

const Logout = () => {
    const [isLoggingOut, setIsLoggingOut] = useState(true);

    useEffect(() => {
        const performLogout = async () => {
            setIsLoggingOut(true);
            // Add a small delay to show the loading state
            await new Promise((resolve) => setTimeout(resolve, 1000));
            logout();
            setIsLoggingOut(false);
        };
        performLogout();
    }, []);

    if (isLoggingOut) {
        return (
            <div className="container mx-auto flex flex-col items-center justify-center min-h-[70vh] px-4">
                <Card className="w-full max-w-2xl mx-auto shadow-lg border-2">
                    <CardHeader className="text-center py-8">
                        <CardTitle className="flex items-center justify-center gap-3 text-2xl mb-2">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                            Logging out...
                        </CardTitle>
                        <CardDescription className="text-lg">
                            Please wait while we securely log you out
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center pb-8">
                        <div className="flex items-center justify-center gap-3 text-muted-foreground">
                            <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                                <div
                                    className="w-2 h-2 bg-primary rounded-full animate-bounce"
                                    style={{ animationDelay: '0.1s' }}
                                ></div>
                                <div
                                    className="w-2 h-2 bg-primary rounded-full animate-bounce"
                                    style={{ animationDelay: '0.2s' }}
                                ></div>
                            </div>
                            <span className="text-base">
                                Clearing your session...
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="max-w-5xl mx-auto space-y-12 text-center">
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-xl">Successfully Logged Out</h1>
                        <p className="text-2xl sm:text-3xl text-muted-foreground flex items-center justify-center gap-3 max-w-3xl mx-auto leading-relaxed">
                            Thank you for using Django React Auth
                        </p>
                    </div>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary/50 to-primary mx-auto rounded-full"></div>
                </div>
                <div className="bg-gradient-to-br from-background to-muted/20 rounded-2xl p-8 shadow-xl border">
                    <LoggedOutView title="" />
                </div>
            </div>
        </div>
    );
};

export default Logout;
