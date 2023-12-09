import styled from 'styled-components';
import EmojiPicker from 'emoji-picker-react';
import { useTheme } from '@emotion/react';

const StyledEmojiPicker = () => {
    const theme = useTheme();
    console.log(theme);
    return (
        <StyledPicker theme={theme}>
            <EmojiPicker />
        </StyledPicker>
    );
};
const StyledPicker = styled.div`
    position: absolute;
    top: -390px;
    right: 0;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;;
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
export default StyledEmojiPicker;
