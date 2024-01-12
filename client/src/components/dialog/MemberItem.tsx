import { Avatar, Radio, Stack, Typography } from '@mui/material';
import { User } from './types';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MemberItem = ({ user, selected, handleChoose }: { user: User; selected: boolean; handleChoose: any }) => {
  // handle
  const handleChange = () => {
    if (!selected) {
      handleChoose(user._id, 'add');
    } else {
      handleChoose(user._id, 'remove');
    }
  };
  // render
  return (
    <Stack px={3} direction="row" alignItems="center" justifyContent="space-between">
      <Stack direction="row" alignItems="center" spacing={1.4}>
        <Avatar src={user.avatar} />
        <Stack>
          <Typography variant="body2" fontSize={15}>
            {user.displayName}
          </Typography>
          <Typography variant="body1" fontSize={15} sx={{ opacity: 0.8 }}>
            {user.email}
          </Typography>
        </Stack>
      </Stack>
      <Radio
        checked={selected}
        onClick={handleChange}
        value="a"
        name="radio-buttons"
        inputProps={{ 'aria-label': 'A' }}
      />
    </Stack>
  );
};
