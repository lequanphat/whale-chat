import styled from 'styled-components';
import ContactItem from './ContactItem';
import { useState } from 'react';
import Avatar from '../avatar/Avatar';

function Contact({ contacts, changeChat }) {
    const [currentSelected, setCurrentSelected] = useState(undefined);
    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    };
    return (
        <Container>
            <div className="header">
                <h1>Chats</h1>
                <input type="text" placeholder="Search your friends..." />
            </div>

            <div className="online-users">
                <Avatar image={`http://localhost:2411/storage/avatar_1.jpg`} online />
                <Avatar image={`http://localhost:2411/storage/avatar_2.jpg`} online />
                <Avatar image={`http://localhost:2411/storage/avatar_3.jpg`} online />
                <Avatar image={`http://localhost:2411/storage/avatar_4.jpg`} online />
                <Avatar image={`http://localhost:2411/storage/avatar_5.jpg`} online />
            </div>
            <div className="chat-users">
                {contacts &&
                    contacts.map((contact, index) => (
                        <ContactItem
                            selected={index === currentSelected}
                            key={contact._id}
                            username={contact.username}
                            image={contact.avatarImage}
                            onClick={() => {
                                changeCurrentChat(index, contact);
                            }}
                        />
                    ))}
            </div>
        </Container>
    );
}
const Container = styled.div`
    background-color: #131324;
    color: white;
    height: 100vh;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #273c75;
    .header {
        padding: 1.4rem;

        h1 {
            font-size: 2rem;
            margin-bottom: 1.4rem;
        }
    }
    input {
        font-size: 1.6rem;
        width: 100%;
        padding: 1rem;
        outline: none;
        background-color: #ffffff34;
        background-color: transparent;
        border: 1px solid #273c75;
        border-radius: 8px;
        color: white;
    }
    .online-users {
        padding: 1rem 1.4rem;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #273c75;
        padding-bottom: 1rem;
    }
    .chat-users {
        display: flex;
        flex-direction: column;
        overflow: auto;

        &::-webkit-scrollbar {
            width: 0.3rem;
            &-thumb {
                background-color: #ffffff39;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }
    }
`;
export default Contact;
