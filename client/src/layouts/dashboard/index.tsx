import { Stack } from '@mui/material';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { stateType } from '../../store/interface';
import { useEffect } from 'react';
import { getUser } from '../../store/slices/authSlice';
import Loading from '../../components/loading/Loading';

const DashboardLayout = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dispatch = useDispatch<any>();
    const { auth, isLoading } = useSelector((state: stateType) => state.auth);
    if (!auth) {
        return <Navigate to="/auth/login" />;
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        dispatch(getUser());
    }, []);
    return (
        <Stack direction="row">
            <Sidebar />
            {isLoading ? <Loading /> : <Outlet />}
        </Stack>
    );
};

export default DashboardLayout;
