import React from 'react';
import { styled } from '@mui/system';
import EmojiPicker from 'emoji-picker-react';
import { useTheme } from '@mui/material';

const StyledEmojiPicker = ({ handleEmojiClick }) => {
    const theme = useTheme();

    return (
        <StyledPicker theme={theme}>
            <EmojiPicker onEmojiClick={handleEmojiClick} />
        </StyledPicker>
    );
};

const StyledPicker = styled('div')(({ theme }) => ({
    position: 'absolute',
    top: '-390px',
    right: 0,
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
    borderRadius: '10px',
    '.EmojiPickerReact': {
        width: '320px !important',
        height: '374px !important',
        paddingBottom: '10px',
        backgroundColor: theme.palette.background.default,
        '.epr-body::-webkit-scrollbar': {
            backgroundColor: theme.palette.background.paper,
            width: '5px',
            '&-thumb': {
                backgroundColor: theme.palette.background.default,
            },
        },
        '.epr-emoji-category-label': {
            display: 'none !important',
        },
        '.epr-preview': {
            display: 'none',
        },
        '.epr-search-container input.epr-search': {
            backgroundColor: theme.palette.background.paper,
        },
    },
}));

export default React.memo(StyledEmojiPicker);
