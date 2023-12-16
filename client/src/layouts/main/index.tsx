import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { stateType } from '../../store/interface';

export default function MainLayout() {
    const { auth } = useSelector((state: stateType) => state.auth);

    if (auth) {
        return <Navigate to="/app" />;
    }
    return (
        <>
            <Outlet />
        </>
    );
}
