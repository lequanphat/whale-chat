import { CircularProgress, Stack } from '@mui/material';

export default function Loading() {
    return (
        <Stack direction="row" alignItems="center" justifyContent="center" width="100%" height="100%">
            <CircularProgress />
        </Stack>
    );
}
