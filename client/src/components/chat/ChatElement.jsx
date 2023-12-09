import { Badge, Box, Stack, Typography } from '@mui/material';
import { Avatar } from '@mui/material';
import StyledBadge from '../avatar/StyledBadge';
import { useTheme } from '@emotion/react';

const ChatElement = ({ id, name, img, msg, time, unread, online }) => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                width: '100%',
                height: 70,
                borderRadius: 1,
                padding: 2,
                backgroundColor: theme.palette.mode === 'light' ? '#fff' : theme.palette.background.default,
            }}
        >
            <Stack direction="row" alignItems="center" justifyContent="space-between" height="100%">
                <Stack direction="row" spacing={2}>
                    {online ? (
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar alt="Remy Sharp" src={img} />
                        </StyledBadge>
                    ) : (
                        <Avatar alt="Remy Sharp" src={img} />
                    )}

                    <Stack spacing={0.3}>
                        <Typography variant="subtitle2">{name}</Typography>
                        <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                            {msg}
                        </Typography>
                    </Stack>
                </Stack>
                <Stack spacing={2} alignItems="center">
                    <Typography variant="sm" sx={{ fontWeight: 600 }}>
                        9:36
                    </Typography>
                    <Badge color="primary" badgeContent={unread} max={5}></Badge>
                </Stack>
            </Stack>
        </Box>
    );
};

export default ChatElement;
