import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { allUsersRoute } from '../utils/ApiRoutes';
import Contact from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from './ChatContainer';

import {io} from 'socket.io-client'

function Chat() {
    const socket = useRef();
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);
    const getContacts = async () => {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
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
        console.log('call api');
    }, [currentUser]);

    useEffect(() => {
        if(currentUser){
            socket.current = io("http://localhost:2411");
            socket.current.emit("add-user", currentUser._id);
        }
    }, [currentUser])
    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    };
    return (
        <Container>
            <div className="container">
                <Contact contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />

                {currentChat === undefined ? <Welcome currentUser={currentUser} /> : 
                <ChatContainer socket={socket}   currentChat={currentChat} currentUser={currentUser}/>}
            </div>
        </Container>
    );
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    background-color: #131324;
    .container {
        height: 90vh;
        width: 95vw;
        background-color: #00000076;
        display: flex;
        
        @media screen and (min-width: 720px) and (max-width: 1080px) {
        }
    }
`;
export default Chat;
