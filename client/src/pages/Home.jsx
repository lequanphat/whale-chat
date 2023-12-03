import styled from 'styled-components';
import Contact from '../components/contacts/Contact';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllContacts, getUser } from '../api/internal';
import { io } from 'socket.io-client';
import ChatContainer from '../components/chat/ChatContainer';
import Temp from './errors/Temp';
import { useSelector } from 'react-redux';
import { userSelector } from '../store/selector';
function Home() {
    const socket = useRef();
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const currentUser = useSelector(userSelector);
    const [currentChat, setCurrentChat] = useState(undefined);

    const getContacts = async () => {
        const data = await getAllContacts(currentUser.id);
        setContacts(data.data);
    };

    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    };


    useEffect(() => {
        if (currentUser) {
            getContacts();
        }
    }, []);

    useEffect(() => {
        if (currentUser) {
            socket.current = io('http://localhost:2411');
            socket.current.emit('add-user', currentUser.id);
        }
    }, [currentUser]);

    return (
        <Container>
            <div className="container">
                <div className="contacts-frame">
                    <Contact contacts={contacts} changeChat={handleChatChange} />
                </div>
                <div className="chat-frame">
                    {currentChat === undefined ? (
                        <Temp
                            title={currentUser?.username}
                            subTitle={'Welcome, '}
                            content={'Please choose a friend to start chatting...'}
                        />
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
        width: 24%;
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
