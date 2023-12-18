import { Box, IconButton, Link, Menu, MenuItem, Stack, Typography, useTheme } from '@mui/material';
import avatar from '../../assets/quanphat.jpg';
import { MdOutlineFileDownload } from 'react-icons/md';
import { PiDotsThreeVerticalBold } from 'react-icons/pi';
import React, { useState } from 'react';
import default_img from '../../assets/default-img.jpg';
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

export const MessagesOption = () => {
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
                    {Message_Option.map((item, index) => {
                        return (
                            <MenuItem key={index} onClick={handleClose} sx={{ fontSize: 14, fontWeight: 400 }}>
                                {item.title}
                            </MenuItem>
                        );
                    })}
                </Stack>
            </Menu>
        </>
    );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TextMessage = React.forwardRef((props: { msg: any; fromSelf: boolean }, ref) => {
    const theme = useTheme();
    return (
        <Stack direction="row" justifyContent={props.fromSelf ? 'end' : 'start'}>
            <Box
                ref={ref}
                sx={{
                    backgroundColor: props.fromSelf ? theme.palette.primary.main : theme.palette.background.paper,
                    borderRadius: 1.8,
                    width: 'max-content',
                    p: '10px 16px',
                }}
            >
                <Typography variant="body1" color={props.fromSelf ? '#fff' : theme.palette.text.primary}>
                    {props.msg.text}
                </Typography>
            </Box>
        </Stack>
    );
});

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
                    <Typography variant="body1">document.png</Typography>
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
                        <Typography variant="subtitle2">{msg.message}</Typography>
                        <Typography variant="body1" component={Link} href={'https://www.youtube.com'}>
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
                        <Typography variant="body1" color={!msg.incoming ? theme.palette.text.primary : '#fff'}>
                            {msg.message}
                        </Typography>
                    </Stack>
                    <Typography variant="body1" color={msg.incoming ? theme.palette.text.primary : '#fff'}>
                        {msg.reply}
                    </Typography>
                </Stack>
            </Box>
        </Stack>
    );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MediaMessage = React.forwardRef((props: { msg: any; fromSelf: boolean }, ref) => {
    const theme = useTheme();
    const [imageLink, setImageLink] = useState(props.msg.image);
    return (
        <Stack direction="row" justifyContent={props.fromSelf ? 'end' : 'start'}>
            <Box
                ref={ref}
                p={props.msg.text ? 1.5 : 0}
                sx={{
                    backgroundColor: props.msg.text ? props.fromSelf ? theme.palette.primary.main : theme.palette.background.paper : 'transparent',
                    borderRadius: '10px',
                    width: 'max-content',
                }}
            >
                <Stack spacing={1}>
                    <img
                        src={imageLink}
                        alt={'image'}
                        style={{ maxHeight: 210, borderRadius: '10px' }}
                        onError={() => {
                            setImageLink(default_img);
                        }}
                    />
                    {props.msg.text && (
                        <Typography variant="body1" color={props.fromSelf ? '#fff' : theme.palette.text.primary}>
                            {props.msg.text}
                        </Typography>
                    )}
                </Stack>
            </Box>
        </Stack>
    );
});

const TimeLine = ({ text }) => {
    const theme = useTheme();
    return (
        <Stack direction="row" alignItems="center" justifyContent="center">
            <Typography
                variant="body1"
                fontSize="12px"
                sx={{
                    color: theme.palette.text.primary,
                    bgcolor: theme.palette.background.paper,
                    borderRadius: '999px',
                    p: '4px 16px',
                    opacity: 0.8,
                }}
            >
                {text}
            </Typography>
        </Stack>
    );
};

export { TimeLine, TextMessage, MediaMessage, ReplyMessage, LinkMessage, DocMessage };
