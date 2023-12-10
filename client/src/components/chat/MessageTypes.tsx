import { useTheme } from '@emotion/react';
import { Box, Divider, IconButton, Link, Menu, MenuItem, Stack, Typography } from '@mui/material';
import avatar from '../../assets/quanphat.jpg';
import { MdOutlineFileDownload } from 'react-icons/md';
import { PiDotsThreeVerticalBold } from 'react-icons/pi';
import { useState } from 'react';

const Message_Option = [
    {
        title: 'Reply',
    },
    {
        title: 'React to message',
    },
    {
        title: 'Forward message',
    },
    {
        title: 'Report',
    },
    {
        title: 'Delete',
    },
];

const MessagesOption = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <PiDotsThreeVerticalBold
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            />
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <Stack spacing={1} px={1}>
                    {Message_Option.map((item) => {
                        return <MenuItem onClick={handleClose}>{item.title}</MenuItem>;
                    })}
                </Stack>
            </Menu>
        </>
    );
};

const TextMessage = ({ msg }) => {
    const theme = useTheme();
    return (
        <Stack direction="row" justifyContent={msg.incoming ? 'start' : 'end'}>
            <Box
                p={1.4}
                sx={{
                    backgroundColor: msg.incoming ? theme.palette.background.paper : theme.palette.primary.main,
                    borderRadius: 1.2,
                    width: 'max-content',
                }}
            >
                <Typography variant="body1" color={msg.incoming ? theme.palette.text : '#fff'}>
                    {msg.message}
                </Typography>
            </Box>
            <MessagesOption />
        </Stack>
    );
};

const DocMessage = ({ msg }) => {
    const theme = useTheme();
    return (
        <Stack direction="row" justifyContent={msg.incoming ? 'start' : 'end'}>
            <Box
                p={1.5}
                sx={{
                    backgroundColor: msg.incoming ? theme.palette.background.paper : theme.palette.primary.main,
                    borderRadius: 1.2,
                    width: 'max-content',
                }}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={3}
                    sx={{ backgroundColor: theme.palette.background.paper }}
                >
                    <img src={avatar} alt="123" style={{ maxHeight: 50 }} />
                    <Typography variant="h7">document.png</Typography>
                    <IconButton>
                        <MdOutlineFileDownload />
                    </IconButton>
                </Stack>
            </Box>
        </Stack>
    );
};

const LinkMessage = ({ msg }) => {
    const theme = useTheme();
    return (
        <Stack direction="row" justifyContent={msg.incoming ? 'start' : 'end'}>
            <Box
                p={1.5}
                sx={{
                    backgroundColor: msg.incoming ? theme.palette.background.paper : theme.palette.primary.main,
                    borderRadius: 1.2,
                    width: 'max-content',
                }}
            >
                <Stack spacing={2}>
                    <Stack
                        alignItems="center"
                        sx={{ backgroundColor: theme.palette.background.paper, borderRadius: 1 }}
                    >
                        <img src={msg.preview} alt={msg.message} style={{ maxHeight: 210 }} />
                    </Stack>
                    <Stack spacing={0.4}>
                        <Typography variant="subtitle2">Create chat app hello</Typography>
                        <Typography variant="body1" component={Link} to={'//https://www.youtube.com'}>
                            www.youtube.com
                        </Typography>
                    </Stack>
                </Stack>
            </Box>
        </Stack>
    );
};

const ReplyMessage = ({ msg }) => {
    const theme = useTheme();
    return (
        <Stack direction="row" justifyContent={msg.incoming ? 'start' : 'end'}>
            <Box
                p={1.5}
                sx={{
                    backgroundColor: msg.incoming ? theme.palette.background.paper : theme.palette.primary.main,
                    borderRadius: 1.2,
                    width: 'max-content',
                }}
            >
                <Stack spacing={2}>
                    <Stack
                        p={2}
                        direction="column"
                        alignItems="center"
                        sx={{
                            backgroundColor: msg.incoming ? theme.palette.primary.main : theme.palette.background.paper,
                            borderRadius: 1,
                        }}
                    >
                        <Typography variant="body1" color={!msg.incoming ? theme.palette.text : '#fff'}>
                            {msg.message}
                        </Typography>
                    </Stack>
                    <Typography variant="body1" color={msg.incoming ? theme.palette.text : '#fff'}>
                        {msg.reply}
                    </Typography>
                </Stack>
            </Box>
        </Stack>
    );
};

const MediaMessage = ({ msg }) => {
    const theme = useTheme();
    return (
        <Stack direction="row" justifyContent={msg.incoming ? 'start' : 'end'}>
            <Box
                p={1.5}
                sx={{
                    backgroundColor: msg.incoming ? theme.palette.background.paper : theme.palette.primary.main,
                    borderRadius: 1.2,
                    width: 'max-content',
                }}
            >
                <Stack spacing={1}>
                    <img src={msg.img} alt={msg.message} style={{ maxHeight: 210, borderRadius: '10px' }} />
                    <Typography variant="body1">{msg.message}</Typography>
                </Stack>
            </Box>
        </Stack>
    );
};

const TimeLine = ({ text }) => {
    const theme = useTheme();
    console.log(theme);
    return (
        <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Divider width="46%" />
            <Typography variant="caption" sx={{ color: theme.palette.text }}>
                {text}
            </Typography>
            <Divider width="46%" />
        </Stack>
    );
};

export { TimeLine, TextMessage, MediaMessage, ReplyMessage, LinkMessage, DocMessage };
