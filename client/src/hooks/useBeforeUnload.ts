import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useBeforeUnload = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dispatch = useDispatch<any>();

    useEffect(() => {
        // const handleBeforeUnload = async (event) => {
        //     const isRefresh = !event.clientY;
        //     if (isRefresh) {
        //         console.log('page is refresh');
        //         return;
        //     }
        //     console.log('page is closed');
        //     try {
        //         dispatch(userLogout());
        //     } catch (error) {
        //         console.error('Error during logout:', error);
        //     }
        //     event.returnValue = 'useBeforeUnload';
        // };
        // window.addEventListener('beforeunload', handleBeforeUnload);
        // return () => {
        //     window.removeEventListener('beforeunload', handleBeforeUnload);
        // };
        // => Giải pháp không khả thi :))
    }, [dispatch]);
};

export default useBeforeUnload;
