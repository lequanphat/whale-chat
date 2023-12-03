/* eslint-disable no-unused-expressions */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../store/slices/userSlice';
const useAutoLogin = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // IIFE
        (async function autoLoginApi() {
            try {
                const response = await dispatch(getUser());
                console.log(response);
            } catch (error) {}
            setLoading(false);
        })();
    }, []);

    return loading;
};
export default useAutoLogin;
