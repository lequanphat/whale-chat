import styled from 'styled-components';
import ContactItem from './ContactItem';
import { useState } from 'react';

function Contact({contacts, changeChat}) {
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

            <div className="online-wrapper">
                <div className="online-users">
                    <img src="http://localhost:2411/storage/avatar_1.jpg" />
                    <img src="http://localhost:2411/storage/avatar_2.jpg" />
                    <img src="http://localhost:2411/storage/avatar_3.jpg" />
                    <img src="http://localhost:2411/storage/avatar_1.jpg" />
                    <img src="http://localhost:2411/storage/avatar_1.jpg" />
                </div>
            </div>
            <div className="chat-users">
            {
                contacts && contacts.map((contact, index) => (
                    <ContactItem selected={index===currentSelected}
                    key={contact._id} 
                    username={contact.username} 
                    image={`http://localhost:2411/storage/${contact.avatarImage}`} 
                    onClick={() => {
                        changeCurrentChat(index, contact);
                    }}
                    />))
            }
                
            </div>
        </Container>
    );
}
const Container = styled.div`
    width: 25%;
    background-color: #131324;
    color: white;
    height: 100vh;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #273c75;
    .header {
        padding: 1rem 1rem;

        h1 {
            font-size: 1.2rem;
            margin-bottom: 1rem;
        }
    }
    input {
        font-size: 1.1rem;
        width: 100%;
        padding: 0.6rem;
        outline: none;
        background-color: #ffffff34;
        background-color: transparent;
        border: 1px solid #273c75;
        border-radius: 8px;
        color: white;
    }
    .online-wrapper {
        border-bottom: 1px solid #273c75;
        .online-users {
            padding: 0rem 1rem 1.4rem 1rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            img {
                width: 3rem;
                height: 3rem;
                border-radius: 100%;
            }
        }
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
