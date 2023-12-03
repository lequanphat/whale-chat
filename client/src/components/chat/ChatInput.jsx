import styled from 'styled-components';

import { IoMdSend, IoMdTime } from 'react-icons/io';
import { BsEmojiSmileFill } from 'react-icons/bs';
import { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';

function ChatInput({ handleSendMsg, usingIcon, pending }) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState('');

    const handleEmojiPickerHideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    const handleEmojiClick = (emojiData, event) => {
        console.log(emojiData);
        let message = msg;
        message += emojiData.emoji;
        setMsg(message);
        setShowEmojiPicker(false);
    };
    const sendChat = (event) => {
        event.preventDefault();
        if (pending){
            return;
        }
        if (msg.length > 0) {
            handleSendMsg(msg.trim());
            setMsg('');
        }
    };
    return (
        <Container>
            {usingIcon && (
                <div className="button-container">
                    <div className="emoji">
                        <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
                        {showEmojiPicker && (
                            <EmojiPicker width="300px" height="380px" onEmojiClick={handleEmojiClick} />
                        )}
                    </div>
                </div>
            )}

            <form className="input-container" onSubmit={(event) => sendChat(event)}>
                <input
                    type="text"
                    placeholder="type your message here"
                    onChange={(e) => setMsg(e.target.value)}
                    value={msg}
                />
                <button type="submit">{pending ? <IoMdTime /> : <IoMdSend />}</button>
            </form>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    align-items: center;
    border-top: 1px solid #273c75;
    padding: 0 2rem;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0 1rem;
        gap: 1rem;
    }
    .button-container {
        padding-right: 2rem;
        display: flex;
        align-items: center;
        color: white;
        gap: 1rem;
        .emoji {
            position: relative;
            svg {
                font-size: 2rem;
                color: #ffff00c8;
                cursor: pointer;
            }
            .EmojiPickerReact {
                position: absolute;
                top: -420px;
                background-color: #080420;
                border-color: #9a86f3;
                .epr-body::-webkit-scrollbar {
                    background-color: #080420;
                    width: 5px;
                    &-thumb {
                        background-color: #95a5a6;
                    }
                }
                .epr-emoji-category-label {
                    display: none;
                }
                .epr-preview {
                    display: none;
                }
            }
        }
    }
    .input-container {
        flex: 1;
        border-radius: 2rem;
        display: flex;
        align-items: center;
        gap: 2rem;
        background-color: #ffffff34;
        input {
            width: 90%;
            height: 60%;
            background-color: transparent;
            color: white;
            border: none;
            padding-left: 1rem;
            font-size: 1.6rem;
            cursor: pointer;
            &::selection {
                background-color: red;
            }
            &:focus {
                outline: none;
            }
        }
        button {
            padding: .6rem 4rem;
            border-radius: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #2ecc71;
            border: none;
            @media screen and (min-width: 720px) and (max-width: 1080px) {
                padding: 0.3rem 1rem;
                svg {
                    font-size: 2rem;
                }
            }
            svg {
                font-size: 2.6rem;
                color: white;
            }
        }
    }
`;

export default ChatInput;
