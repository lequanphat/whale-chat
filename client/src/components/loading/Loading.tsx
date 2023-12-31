import { CircularProgress, Stack } from '@mui/material';

export default function Loading({ ...props }) {
  return (
    <Stack {...props} direction="row" alignItems="center" justifyContent="center" width="100%" height="100%">
      <CircularProgress />
    </Stack>
  );
}
