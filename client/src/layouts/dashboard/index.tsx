import { Stack } from '@mui/material';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';
import { stateType } from '../../store/interface';

import Loading from '../../components/loading/Loading';

const DashboardLayout = () => {
    const { auth, isLoading } = useSelector((state: stateType) => state.auth);
    if (!auth) {
        return <Navigate to="/auth/login"></Navigate>;
    }

    return (
        <Stack direction="row">
            <Sidebar />
            {isLoading ? <Loading /> : <Outlet />}
        </Stack>
    );
};

export default DashboardLayout;
