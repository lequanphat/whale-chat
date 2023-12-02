import styled from 'styled-components';
import AiChatHeader from '../components/chat/AiChatHeader';
import ChatInput from '../components/chat/ChatInput';
import { useEffect, useRef, useState } from 'react';
import Message from '../components/chat/Message';
import OpenAI from 'openai';
const openai = new OpenAI({
    apiKey:  process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});

function AiChat() {
    const scrollRef = useRef();
    const [messages, setMessages] = useState([]);
    const [resultMessage, setResultMessage] = useState({role: 'assistant',
    content: 'Hi, How can I help you ?',});
    const [pending, setPending] = useState(false);
    const sendMsg = async (msg) => {
        const my_msg = {
            role: 'system',
            content: msg,
        };
        setMessages([...messages, my_msg, { role: 'assistant', content: '...' }]);
        setPending(true);

        try {
            const response = await openai.chat.completions.create({
                messages: [...messages, my_msg],
                model: 'gpt-3.5-turbo',
            });
            setResultMessage(response.choices[0].message);
        } catch (error) {
            setResultMessage({
                role: 'assistant',
                content: 'Bạn hỏi quá nhiều, xin hãy im lặng!',
            });
        }
    };
    useEffect(() => {
        if (resultMessage.content) {
            messages.pop();
            setMessages([...messages, resultMessage]);
            setResultMessage({});
            setPending(false);
        }
    }, [resultMessage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    return (
        <Container>
            <div className="history-chat">
                <h1 className="header">AiChat</h1>
            </div>
            <div className="chat-container">
                <AiChatHeader />
                <div className="messages-container">
                    {messages.map((message, index) => (
                        <Message
                            message={message?.content}
                            sended={message?.role === 'system'}
                            scrollRef={scrollRef}
                            key={index}
                            image={message.role === 'system' ? '' : 'chatbox.png'}
                            width={'80%'}
                        />
                    ))}
                </div>
                <ChatInput handleSendMsg={sendMsg} pending={pending} />
            </div>
        </Container>
    );
}
const Container = styled.div`
    display: flex;
    color: #ccc;
    height: 100vh;
    .history-chat {
        width: 25%;
        padding: 16px;
        border-right: 1px solid #273c75;
        .header {
            font-size: 1.2rem;
        }
    }
    .chat-container {
        flex: 1;
        display: grid;
        grid-template-rows: 6% 84% 10%;
    }
    .messages-container {
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
export default AiChat;
