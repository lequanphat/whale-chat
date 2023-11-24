import styled from 'styled-components';
import ChatInput from './ChatInput';
import { useEffect, useRef, useState } from 'react';
import { getAllMessages, sendMessage } from '../../api/internal';
import ChatHeader from './ChatHeader';

function ChatContainer({ currentChat, currentUser, socket }) {
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const scrollRef = useRef();

    const handleSendMsg = async (msg) => {
        await sendMessage({
            from: currentUser._id,
            to: currentChat._id,
            message: msg,
        });
        socket.current.emit('send-msg', {
            to: currentChat._id,
            from: currentUser._id,
            message: msg,
        });
        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });
        setMessages(msgs);
    };
    const handleGetAllMessages = async () => {
        const respone = await getAllMessages({
            from: currentUser._id,
            to: currentChat._id,
        });
        setMessages(respone.data);
    };

    useEffect(() => {
        const socketListener = (data) => {
            console.log('from -> ' + data.from);
            console.log('to -> ' + data.to);
            console.log('current chat: ' + currentChat._id);
            if (data.from === currentChat._id) {
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
        console.log('add message');
        if (arrivalMessage) {
            setMessages((prev) => [...prev, arrivalMessage]);
        }
    }, [arrivalMessage]);

    useEffect(() => {
        handleGetAllMessages();
    }, [currentChat]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    return (
        <Container>
            <ChatHeader currentChat={currentChat} />
            <div className="chat-messages">
                {messages.map((message, index) => {
                    return (
                        <div
                            ref={scrollRef}
                            key={index}
                            className={`message ${message.fromSelf ? 'sended' : 'recieved'}`}
                        >
                            <div className="content ">
                                <p>{message.message}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* <Message/> */}
            <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
    );
}
const Container = styled.div`
    height: 100vh;
    display: grid;
    grid-template-rows: 10% 80% 10%;
    gap: 0.1rem;

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
        .message {
            display: flex;
            align-items: center;
            .content {
                max-width: 40%;
                overflow-wrap: break-word;
                padding: 1rem;
                font-size: 1.1rem;
                border-radius: 1rem;
                color: #d1d1d1;
                @media screen and (min-width: 720px) and (max-width: 1080px) {
                    max-width: 70%;
                }
            }
        }
        .sended {
            justify-content: flex-end;
            .content {
                background-color: #4f04ff21;
            }
        }
        .recieved {
            justify-content: flex-start;
            .content {
                background-color: #9900ff20;
            }
        }
    }
`;
export default ChatContainer;
