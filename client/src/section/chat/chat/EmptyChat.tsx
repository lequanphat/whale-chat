import { memo } from 'react';
import { Stack } from '@mui/material';

const EmptyChat = ({ ...other }) => {
  return (
    <Stack flexGrow={1} {...other} alignItems="center" justifyContent="center">
      Empty chat
    </Stack>
  );
};

export default memo(EmptyChat);
