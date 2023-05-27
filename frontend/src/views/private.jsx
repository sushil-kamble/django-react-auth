import { useEffect, useState } from 'react';
import useAxios from '../utils/useAxios';

const Private = () => {
    const [res, setRes] = useState('');
    const [posRes, setPostRes] = useState('');
    const api = useAxios();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/test/');
                setRes(response.data.response);
            } catch (error) {
                setPostRes(error.response.data);
            }
        };
        fetchData();
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/test/', {
                text: e.target[0].value,
            });
            setPostRes(response.data.response);
        } catch (error) {
            setPostRes(error.response.data);
        }
    };
    return (
        <section>
            <h1>Private</h1>
            <p>{res}</p>
            <form method="POST" onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter Text" />
                <button type="submit">Submit</button>
            </form>
            {posRes && <p>{posRes}</p>}
        </section>
    );
};

export default Private;
