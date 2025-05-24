import { useEffect, useState } from 'react';
import useAxios from '../utils/useAxios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { useAuthStore } from '../store/auth';

const Private = () => {
    const [res, setRes] = useState('');
    const [posRes, setPostRes] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const api = useAxios();
    const allUserData = useAuthStore((state) => state.allUserData);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await api.get('/test/');
                setRes(response.data.response);
            } catch (error) {
                setRes(
                    'Error loading data: ' +
                        (error.response?.data || error.message)
                );
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Remove api from dependencies to prevent multiple rerenders

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        try {
            setIsSubmitting(true);
            const response = await api.post('/test/', {
                text: inputValue,
            });
            setPostRes(response.data.response);
            setInputValue('');
        } catch (error) {
            setPostRes('Error: ' + (error.response?.data || error.message));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight flex items-center justify-center gap-3">
                        Dashboard
                    </h1>
                    <p className="text-muted-foreground flex items-center justify-center gap-2">
                        Welcome to your private dashboard,{' '}
                        {allUserData?.username}
                    </p>
                </div>

                <div className="grid gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                API Response
                            </CardTitle>
                            <CardDescription>
                                Data fetched from the protected backend endpoint
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                <div className="flex items-center space-x-2">
                                    <span className="text-muted-foreground">
                                        Loading...
                                    </span>
                                </div>
                            ) : (
                                <div className="p-4 bg-muted rounded-md flex items-start gap-2">
                                    <code className="text-sm">{res}</code>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                Test API Endpoint
                            </CardTitle>
                            <CardDescription>
                                Send data to the backend API and see the
                                response
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="text-input"
                                        className="flex items-center gap-2"
                                    >
                                        Enter some text
                                    </Label>
                                    <Input
                                        id="text-input"
                                        type="text"
                                        placeholder="Type something here..."
                                        value={inputValue}
                                        onChange={(e) =>
                                            setInputValue(e.target.value)
                                        }
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    disabled={
                                        isSubmitting || !inputValue.trim()
                                    }
                                    className="w-full sm:w-auto"
                                >
                                    {isSubmitting ? (
                                        <>Sending...</>
                                    ) : (
                                        <>Send to API</>
                                    )}
                                </Button>
                            </form>

                            {posRes && (
                                <div className="mt-4">
                                    <Label className="flex items-center gap-2">
                                        Response:
                                    </Label>
                                    <div className="mt-2 p-4 bg-muted rounded-md flex items-start gap-2">
                                        <code className="text-sm">
                                            {posRes}
                                        </code>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                Account Information
                            </CardTitle>
                            <CardDescription>
                                Your current session details
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium flex items-center gap-2">
                                        Username:
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        {allUserData?.username}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium flex items-center gap-2">
                                        User ID:
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        {allUserData?.user_id}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium flex items-center gap-2">
                                        Status:
                                    </span>
                                    <span className="text-sm text-green-600 flex items-center gap-1">
                                        Authenticated
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Private;
