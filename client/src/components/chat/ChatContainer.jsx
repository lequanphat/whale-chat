import styled from 'styled-components';
import ChatInput from './ChatInput';
import { useEffect, useRef, useState } from 'react';
import { getAllMessages, sendMessage } from '../../api/internal';
import ChatHeader from './ChatHeader';
import Message from './Message';
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
        const handleGetAllMessages = async () => {
            const respone = await getAllMessages({
                from: currentUser._id,
                to: currentChat._id,
            });
            for (let i = 1; i < respone.data.length; i++) {
                if (respone.data[i - 1].fromSelf === true && respone.data[i].fromSelf === false) {
                    respone.data[i].image = currentChat.avatarImage;
                }
            }
            if (respone.data[0]?.fromSelf === false) {
                respone.data[0].image = currentChat.avatarImage;
            }
            setMessages(respone.data);
        };
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

            <ChatInput handleSendMsg={handleSendMsg} usingIcon/>
        </Container>
    );
}
const Container = styled.div`
    height: 100vh;
    display: grid;
    grid-template-rows: 10% 80% 10%;
    .chat-messages {
        padding: 1rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
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
