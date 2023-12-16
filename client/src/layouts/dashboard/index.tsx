import { Stack } from '@mui/material';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';
import { stateType } from '../../store/interface';

const DashboardLayout = () => {
    const { auth } = useSelector((state: stateType) => state.auth);

    if (!auth) {
        return <Navigate to="/auth/login" />;
    }

    return (
        <Stack direction="row">
            <Sidebar />
            <Outlet />
        </Stack>
    );
};

export default DashboardLayout;
