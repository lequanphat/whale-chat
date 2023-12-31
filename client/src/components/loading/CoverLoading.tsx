import { CircularProgress, Stack } from '@mui/material';

export default function CoverLoading({ ...props }) {
  return (
    <Stack
      {...props}
      direction="row"
      alignItems="center"
      justifyContent="center"
      width="100vw"
      height="100vh"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 999,
        backgroundColor: 'rgba(0,0,0,.2)',
      }}
    >
      <CircularProgress />
    </Stack>
  );
}
