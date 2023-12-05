import styled from 'styled-components';
import ChatInput from './ChatInput';
import { useEffect, useRef, useState } from 'react';
import { getAllMessages, sendMessage } from '../../api/internal';
import ChatHeader from './ChatHeader';
import Message from './Message';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/selector';
import { currentContactSelector } from '../../store/selectors/contactSelector';
import Temp from '../../pages/errors/Temp'
function ChatContainer() {
    const user = useSelector(userSelector);
    const currentChat = useSelector(currentContactSelector);
    const socket = useRef();
    const scrollRef = useRef();
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);


    useEffect(() => {
        if (user) {
            socket.current = io('http://localhost:2411');
            socket.current.emit('add-user', user.id);
        }
    }, [user]);

    const handleSendMsg = async (msg) => {
        await sendMessage({
            from: user.id,
            to: currentChat.id,
            message: msg,
        });
        socket.current.emit('send-msg', {
            to: currentChat.id,
            from: user.id,
            message: msg,
        });
        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });
        setMessages(msgs);
    };

    useEffect(() => {
        const socketListener = (data) => {
            console.log('from -> ' + data.from);
            console.log('to -> ' + data.to);
            console.log('current chat: ' + currentChat.id);
            if (data.from === currentChat.id) {
                console.log(data.message);
                setArrivalMessage({ fromSelf: false, message: data.message });
            }
        };

        if (socket.current) {
            socket.current.on('msg-recieve', socketListener);
        }
        // clean up
        return () => {
            if (socket.current) {
                socket.current.off('msg-recieve', socketListener);
            }
        };
    }, [currentChat]);

    useEffect(() => {
        if (arrivalMessage) {
            if (messages[messages.length - 1].fromSelf === true) {
                arrivalMessage.image = currentChat.avatar;
            }
            setMessages((prev) => [...prev, arrivalMessage]);
        }
    }, [arrivalMessage]);

    useEffect(() => {
        const handleGetAllMessages = async () => {
            const respone = await getAllMessages({
                from: user.id,
                to: currentChat?.id,
            });
            for (let i = 1; i < respone.data?.length; i++) {
                if (respone.data[i - 1].fromSelf === true && respone.data[i].fromSelf === false) {
                    respone.data[i].image = currentChat.avatar;
                }
            }
            if (respone?.data[0]?.fromSelf === false) {
                respone.data[0].image = currentChat.avatar;
            }
            setMessages(respone.data);
        };
        handleGetAllMessages();
    }, [currentChat]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    return (
         !currentChat  ? (
            <Temp
                title={user?.username}
                subTitle={'Welcome, '}
                content={'Please choose a friend to start chatting...'}
            />
        ) : (
        <Container>
            <ChatHeader/>
            <div className="chat-messages">
                {messages.map((message, index) => {
                    return (
                        <Message
                            message={message.message}
                            sended={message.fromSelf}
                            scrollRef={scrollRef}
                            key={index}
                            image={message?.image}
                        />
                    );
                })}
            </div>

            <ChatInput handleSendMsg={handleSendMsg} usingIcon />
        </Container>)
    );
}
const Container = styled.div`
    background-color: var(--bg-color);
    height: 100vh;
    display: grid;
    grid-template-rows: 10% 80% 10%;
    .chat-messages {
        padding: 1rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow: auto;
        &::-webkit-scrollbar {
            width: 0.2rem;
            &-thumb {
                background-color: #ffffff39;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }
    }
`;
export default ChatContainer;
