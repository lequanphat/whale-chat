import styled from 'styled-components';
import Contact from '../components/contacts/Contact';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllContacts } from '../api/internal';
import Welcome from '../components/Welcome';
import { io } from 'socket.io-client';
import ChatContainer from '../components/chat/ChatContainer';

function Home() {
    const socket = useRef();
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);

    const getContacts = async () => {
        const data = await getAllContacts(currentUser._id);
        setContacts(data.data);
    };

    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    };

    useEffect(() => {
        if (!localStorage.getItem('chat-app-user')) {
            navigate('/login');
        } else {
            setCurrentUser(JSON.parse(localStorage.getItem('chat-app-user')));
        }
    }, []);

    useEffect(() => {
        if (currentUser) {
            getContacts();
        }
    }, [currentUser]);

    useEffect(() => {
        if (currentUser) {
            socket.current = io('http://localhost:2411');
            socket.current.emit('add-user', currentUser._id);
        }
    }, [currentUser]);

    return (
        <Container>
            <div className="container">
                <div className="contacts-frame">
                    <Contact contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
                </div>
                <div className="chat-frame">
                    {currentChat === undefined ? (
                        <Welcome currentUser={currentUser} />
                    ) : (
                        <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
                    )}
                </div>
            </div>
        </Container>
    );
}
const Container = styled.div`
    background-color: #131324;
    .container {
        display: flex;
    }
    .contacts-frame {
        width: 25%;
    }
    .chat-frame {
        flex: 1;
    }
    @media screen and (min-width: 540px) and (max-width: 960px) {
        .contacts-frame {
            width: 40%;
        }
    }
`;
export default Home;
