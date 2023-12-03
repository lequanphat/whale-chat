/* eslint-disable no-unused-expressions */
import { useEffect, useState } from 'react';
import { autoLogin } from '../api/internal';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/userSlice';
const useAutoLogin = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // IIFE
        (async function autoLoginApi() {
            try {
                const response = await autoLogin();
                console.log(response);
                if (response.status === 200) {
                    const user = {
                        id: response.data.user._id,
                        email: response.data.user.email,
                        username: response.data.user.username,
                        avatar: response.data.user.avatarImage,
                        auth: true,
                    };
                    dispatch(setUser(user));

                }
            } catch (error) {

            }
            setLoading(false);
        })();
    }, []);

    return loading;
};
export default useAutoLogin;
