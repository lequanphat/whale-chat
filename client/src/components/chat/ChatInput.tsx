import { Box, Fab, IconButton, InputAdornment, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import StyledInput from '../input/StyledInput';
import { HiOutlineLink } from 'react-icons/hi';
import { MdOutlineInsertEmoticon } from 'react-icons/md';
import StyledEmojiPicker from './StyledEmojiPicker';
import { ChangeEvent, MouseEvent, useCallback, useRef, useState } from 'react';
import { IoImageOutline, IoCameraOutline, IoReaderOutline, IoPersonOutline, IoMicOutline } from 'react-icons/io5';
import { EmojiClickData } from 'emoji-picker-react';
import { useDispatch, useSelector } from 'react-redux';
import { stateType } from '../../store/interface';
import { addIcon, resetDoc, resetImage, setDoc, setImage, setMessage } from '../../store/slices/chatSlice';
import { IoCloseOutline } from 'react-icons/io5';
import getFileImage from '../../utils/getFileImage';


const Actions = [
    {
        color: '#4da5fe',
        icon: <IoImageOutline size={22} />,
        title: 'Photo/Video',
    },
    {
        color: '#4da5fe',
        icon: <IoCameraOutline size={22} />,
        title: 'Camera',
    },
    {
        color: '#4da5fe',
        icon: <IoReaderOutline size={22} />,
        title: 'Document',
    },
    {
        color: '#4da5fe',
        icon: <IoMicOutline size={24} />,
        title: 'Voice',
    },

    {
        color: '#4da5fe',
        icon: <IoPersonOutline size={22} />,
        title: 'Contact',
    },
];

function ChatInput() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dispatch = useDispatch<any>();
    const theme = useTheme();
    const { text, image, doc } = useSelector((state: stateType) => state.chat);
    const [openPicker, setOpenPicker] = useState(false);
    const [openActions, setOpenActions] = useState(false);
    const imageInputRef = useRef(null);
    const documentInputRef = useRef(null);
    const handleEmojiClick = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (emojiData: EmojiClickData, _event: MouseEvent) => {
            dispatch(addIcon(emojiData.emoji));
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );
    const handleChooseAction = (index: number) => {
        setOpenActions(false);
        if (!imageInputRef.current) {
            return;
        }
        switch (index) {
            case 0:
                imageInputRef.current.click();
                break;
            case 1:
                alert('Camera feature');
                break;
            case 2:
                documentInputRef.current.click();
                break;
            case 3:
                alert('Voice feature');
                break;
            case 4:
                alert('Contacts feature');
                break;

            default:
                break;
        }
    };
    
    const handleChooseImageFile = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files[0]);
        // call api here
        dispatch(setImage(e.target.files[0]));
        e.target.value = '';
    };
    const handleResetChooseImage = () => {
        dispatch(resetImage());
    };
    const handleResetChooseDoc = () => {
        dispatch(resetDoc());
    };
    const handleChooseDocFile = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files[0]);
        dispatch(setDoc(e.target.files[0]));
        e.target.value = '';
    };
    return (
        <Box width="100%" position="relative" p={0}>
            {(image || doc) && (
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    position="absolute"
                    spacing={8}
                    sx={{
                        top: '-90px',
                        left: 0,
                        p: '12px 12px',
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: 1,
                        boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
                    }}
                >
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <img
                            src={image ? URL.createObjectURL(image) : getFileImage(doc.name)}
                            alt="pre-view"
                            style={{ height: '60px' }}
                        />
                        <Typography
                            variant="body1"
                            maxWidth="200px"
                            sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                        >
                            {image ? image.name : doc.name}
                        </Typography>
                    </Stack>
                    <IconButton onClick={image ? handleResetChooseImage : handleResetChooseDoc}>
                        <IoCloseOutline />
                    </IconButton>
                </Stack>
            )}
            <Box display={openPicker ? 'block' : 'none'}>
                <StyledEmojiPicker handleEmojiClick={handleEmojiClick} />
            </Box>
            <input
                ref={imageInputRef}
                type="file"
                accept="image/*,video/*"
                style={{ display: 'none' }} // Ẩn input element
                onChange={(e) => {
                    handleChooseImageFile(e);
                }}
            />
            <input
                ref={documentInputRef}
                type="file"
                accept="application/pdf,text/*"
                style={{ display: 'none' }} // Ẩn input element
                onChange={(e) => {
                    handleChooseDocFile(e);
                }}
            />
            <StyledInput
                value={text}
                onChange={(e) => {
                    dispatch(setMessage(e.target.value));
                }}
                fullWidth
                placeholder="Write a message..."
                variant="filled"
                autoComplete='off'
                
                InputProps={{
                    disableUnderline: true,

                    startAdornment: (
                        <Stack>
                            {openActions && (
                                <Stack position="relative">
                                    {Actions.map((item, index) => {
                                        return (
                                            <Tooltip key={index} title={item.title} placement="right">
                                                <Fab
                                                    color="primary"
                                                    aria-label="add"
                                                    sx={{
                                                        position: 'absolute',
                                                        top: -(102 + index * 70),
                                                        backgroundColor: item.color,
                                                    }}
                                                    onClick={() => {
                                                        handleChooseAction(index);
                                                    }}
                                                >
                                                    {item.icon}
                                                </Fab>
                                            </Tooltip>
                                        );
                                    })}
                                </Stack>
                            )}
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
