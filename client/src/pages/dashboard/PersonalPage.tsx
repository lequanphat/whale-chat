import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/internal';
import { Stack } from '@mui/material';

const PersonalPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  useEffect(() => {
    (async () => {
      const response = await api.get(`/users/user/${userId}`);
      if (response) {
        setUser(response.data);
      }
    })();
  }, [userId]);
  return <Stack>{user ? JSON.stringify(user) : 'User not found'}</Stack>;
};

export default PersonalPage;
