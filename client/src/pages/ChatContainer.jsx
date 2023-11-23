import styled from 'styled-components';
import ChatInput from '../components/ChatInput';
import { getAllMessages, sendMessage } from '../api/internal';
import { useEffect, useRef, useState } from 'react';

function ChatContainer({ currentChat, currentUser, socket }) {
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const scrollRef = useRef();

    console.log('current_chat = '+ currentChat._id);

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
        handleGetAllMessages();
    }, [currentChat]);

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
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <Container>
            <div className="chat-header">
                <div className="user-details">
                    <div className="avatar">
                        <img src={`http://localhost:2411/storage/${currentChat.avatarImage}`} alt="" />
                    </div>
                    <div className="username">
                        <h3>{currentChat.username}</h3>
                    </div>
                </div>
            </div>
            <div className="chat-messages">
                {messages.map((message, index) => {
                    return (
                        <div ref={scrollRef} key={index} className={`message ${message.fromSelf ? 'sended' : 'recieved'}`}>
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
    width: 100%;
    display: grid;
    grid-template-rows: 10% 80% 10%;
    gap: 0.1rem;
    overflow: hidden;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
        grid-template-rows: 15% 70% 15%;
    }
    .chat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 2rem;
        border: 1px solid #131324;
        .user-details {
            display: flex;
            align-items: center;
            gap: 1rem;
            .avatar {
                img {
                    width: 2.8rem;
                    height: 2.8rem;
                    border-radius: 100%;
                }
            }
            .username {
                h3 {
                    color: white;
                }
            }
        }
    }
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
