import { Avatar, Box, Divider, IconButton, Stack, Typography, useTheme } from '@mui/material';
import StyledBadge from '../avatar/StyledBadge';
import { IoSearchOutline, IoVideocamOutline, IoInformationCircleOutline } from 'react-icons/io5';
import { PiPhoneLight } from 'react-icons/pi';
import { toggleSidebar } from '../../store/slices/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { stateType } from '../../store/interface';
const ChatHeader = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { contacts, currentContact } = useSelector((state: stateType) => state.contacts);
    return (
        <Box
            sx={{
                height: 70,
                width: '100%',
                backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background.paper,
            }}
            p={2}
        >
            <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%" height="100%">
                <Stack direction="row" spacing={2}>
                    <Box>
                        <StyledBadge
                            onClick={() => {
                                dispatch(toggleSidebar());
                            }}
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar alt="Quan Phat" src={contacts[currentContact].avatar} />
                        </StyledBadge>
                    </Box>
                    <Stack spacing={0}>
                        <Typography variant="subtitle2">{contacts[currentContact].displayName}</Typography>
                        <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                            Online
                        </Typography>
                    </Stack>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <IconButton>
                        <IoVideocamOutline size={22} />
                    </IconButton>
                    <IconButton>
                        <PiPhoneLight size={22} />
                    </IconButton>
                    <IconButton>
                        <IoSearchOutline size={22} />
                    </IconButton>
                    <Divider orientation="vertical" flexItem />
                    <IconButton
                        onClick={() => {
                            dispatch(toggleSidebar());
                        }}
                    >
                        <IoInformationCircleOutline />
                    </IconButton>
                </Stack>
            </Stack>
        </Box>
    );
};
export default ChatHeader;
