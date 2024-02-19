import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Role, stateType } from '../../store/types';

export const AdminLayout = () => {
  const { auth, role } = useSelector((state: stateType) => state.auth);

  if (!auth || role !== Role.ADMIN) {
    return <Navigate to="/auth/login" />;
  }
  return <div>admin layout</div>;
};
