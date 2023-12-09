import { Box, Fab, IconButton, InputAdornment, Stack, Tooltip } from '@mui/material';
import StyledInput from '../input/StyledInput';
import { HiOutlineLink } from 'react-icons/hi';
import { MdOutlineInsertEmoticon } from 'react-icons/md';
import StyledEmojiPicker from './StyledEmojiPicker';
import { useState } from 'react';
import { IoImageOutline, IoCameraOutline, IoReaderOutline, IoPersonOutline } from 'react-icons/io5';
const Actions = [
    {
        color: '#4da5fe',
        icon: <IoImageOutline size={22} />,
        y: 102,
        title: 'Photo/Video',
    },
    {
        color: '#4da5fe',
        icon: <IoCameraOutline size={22} />,
        y: 172,
        title: 'Image',
    },
    {
        color: '#4da5fe',
        icon: <IoReaderOutline size={22} />,
        y: 242,
        title: 'Document',
    },
    {
        color: '#4da5fe',
        icon: <IoPersonOutline size={22} />,
        y: 312,
        title: 'Contact',
    },
];

function ChatInput() {
    const [openPicker, setOpenPicker] = useState(false);
    const [openActions, setOpenActions] = useState(false);
    // const [msg, setMsg] = useState('');

    // const handleEmojiPickerHideShow = () => {
    //     setShowEmojiPicker(!showEmojiPicker);
    // };

    // const handleEmojiClick = (emojiData, event) => {
    //     console.log(emojiData);
    //     let message = msg;
    //     message += emojiData.emoji;
    //     setMsg(message);
    //     setShowEmojiPicker(false);
    // };
    // const sendChat = (event) => {
    //     event.preventDefault();
    //     if (pending){
    //         return;
    //     }
    //     if (msg.length > 0) {
    //         handleSendMsg(msg.trim());
    //         setMsg('');
    //     }
    // };
    return (
        <Box width="100%" position="relative" p={0}>
            <Box display={openPicker ? 'block' : 'none'}>
                <StyledEmojiPicker />
            </Box>

            <StyledInput
                fullWidth
                placeholder="Write a message..."
                variant="filled"
                InputProps={{
                    disableUnderline: true,

                    startAdornment: (
                        <Stack>
                            <Stack position="relative" display={openActions ? 'block' : 'none'}>
                                {Actions.map((item) => {
                                    return (
                                        <Tooltip title={item.title} placement="right">
                                            <Fab
                                                color="primary"
                                                aria-label="add"
                                                sx={{ position: 'absolute', top: -item.y, backgroundColor: item.color }}
                                            >
                                                {item.icon}
                                            </Fab>
                                        </Tooltip>
                                    );
                                })}
                            </Stack>
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => {
                                        setOpenActions(!openActions);
                                    }}
                                >
                                    <HiOutlineLink />
                                </IconButton>
                            </InputAdornment>
                        </Stack>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => {
                                    setOpenPicker(!openPicker);
                                }}
                            >
                                <MdOutlineInsertEmoticon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    );
}

export default ChatInput;
