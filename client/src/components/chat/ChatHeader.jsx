import styled from 'styled-components';
import { IoIosSearch, IoIosArrowDown } from 'react-icons/io';
import { IoVideocamOutline } from 'react-icons/io5';
import { LiaPhoneSolid } from 'react-icons/lia';
import Avatar from '../avatar/Avatar';
import { useState } from 'react';
function ChatHeader({ currentChat, theme }) {
    
    return (
        <Container theme={theme}>
            <div className="user-details">
                <Avatar image={currentChat.avatarImage} online />
                <div className="username">
                    <h3>{currentChat.username}</h3>
                    <p className="status">Online</p>
                </div>
            </div>
            <div className="actions-group">
                <button className="action">
                    <IoVideocamOutline />
                </button>
                <button className="action">
                    <LiaPhoneSolid />
                </button>
                <button className="action">
                    <IoIosSearch />
                </button>
                <button className="action" >
                    <IoIosArrowDown />
                </button>
            </div>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.6rem;
    border-bottom: 1px solid #273c75;
    color: white;
    background-color: ${(props) => props.theme.backgroundColor || 'inherit'};
    .user-details {
        display: flex;
        align-items: center;
        margin-left: 1rem;
    }
    .username {
        h3 {
            font-size: 1.7rem;
            margin-bottom: 0.2rem;
        }
        .status {
            color: #95a5a6;
            font-size: 1.1rem;
        }
    }
    .actions-group {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .action {
            width: 3.8rem;
            height: 3.8rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
            outline: none;
            background-color: transparent;
            color: #dcdde1;
            font-size: 1.8rem;
            border-radius: 100%;
            margin: 0 0.4rem;
            &:hover {
                background-color: #0d193f;
                color: white;
            }
        }
    }
`;
export default ChatHeader;
