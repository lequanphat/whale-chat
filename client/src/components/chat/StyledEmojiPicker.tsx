import styled from 'styled-components';
import EmojiPicker from 'emoji-picker-react';
import { useTheme } from '@emotion/react';
import React from 'react';

// eslint-disable-next-line react-refresh/only-export-components
const StyledEmojiPicker = ({ handleEmojiClick }) => {
    const theme = useTheme();
    console.log('render emoji click');

    return (
        <StyledPicker theme={theme}>
            <EmojiPicker onEmojiClick={handleEmojiClick} />
        </StyledPicker>
    );
};
// eslint-disable-next-line react-refresh/only-export-components
const StyledPicker = styled.div`
    position: absolute;
    top: -390px;
    right: 0;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border-radius: 10px;
    .EmojiPickerReact {
        width: 320px !important;
        height: 374px !important;
        padding-bottom: 10px;
        background-color: ${(props) => props.theme.palette.background.default};

        .epr-body::-webkit-scrollbar {
            background-color: ${(props) => props.theme.palette.background.paper};
            width: 5px;
            &-thumb {
                background-color: ${(props) => props.theme.palette.background.default};
            }
        }
        .epr-emoji-category-label {
            display: none !important;
        }
        .epr-preview {
            display: none;
        }
        .epr-search-container input.epr-search {
            background-color: ${(props) => props.theme.palette.background.paper};
        }
    }
`;
// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(StyledEmojiPicker);
