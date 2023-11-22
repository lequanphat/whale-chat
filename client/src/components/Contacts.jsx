import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
function Contact({ contacts, currentUser }) {
    const navigate = useNavigate();
    const [currentUserName, setCurrentUserName] = useState('');
    const [currentUserImage, setCurrentUserImage] = useState('');
    const [currentSelected, setCurrentSelected] = useState('');

    useEffect(() => {
        if (currentUser) {
            setCurrentUserImage(currentUser.avatarImage);
            setCurrentUserName(currentUser.username);
        }
    }, [currentUser]);

    const changeCurrentChat = () => {};


    const handleLogout = () => {
        localStorage.removeItem('chat-app-user');
        navigate('/login');
    }
    return (
        <div>
            {currentUserImage && currentUserImage && (
                <Container>
                    <div className="brand">
                        <h3>snappy</h3>
                    </div>
                    <div className="contacts">
                        {contacts.map((contact, index) => {
                            return (
                                <div
                                    key={contact._id}
                                    className={`contact ${index === currentSelected ? 'selected' : ''}`}
                                    onClick={() => changeCurrentChat(index, contact)}
                                >
                                    <div className="avatar">
                                        <img src={`http://localhost:2411/storage/${contact.avatarImage}`} alt="" />
                                    </div>
                                    <div className="username">
                                        <h3>{contact.username}</h3>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="current-user">
                        <div className="avatar">
                            <img src={`http://localhost:2411/storage/${currentUserImage}`} alt="avatar" />
                        </div>
                        <div className="username">
                            <h2>{currentUserName}</h2>
                        </div>
                        <h3 className="logout" onClick={handleLogout}>Logout</h3>
                    </div>
                </Container>
            )}
        </div>
    );
}

const Container = styled.div`
    /* display: grid;
  grid-template-rows: 10% 75% 15%; */
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: #080420;
    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        padding: 10px;
        h3 {
            color: white;
            text-transform: uppercase;
        }
    }
    .contacts {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        gap: 0.8rem;
        &::-webkit-scrollbar {
            width: 0.2rem;
            &-thumb {
                background-color: #ffffff39;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }
        .contact {
            background-color: #ffffff34;
            min-height: 4rem;
            cursor: pointer;
            width: 90%;
            border-radius: 0.2rem;
            padding: 0.4rem;
            display: flex;
            gap: 1rem;
            align-items: center;
            transition: 0.5s ease-in-out;
            .avatar {
                img {
                    height: 3rem;
                    border-radius: 100%;
                }
            }
            .username {
                h3 {
                    color: white;
                }
            }
        }
        .selected {
            background-color: #9a86f3;
        }
    }

    .current-user {
        background-color: #0d0d30;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        padding: 0.4rem;
        .avatar {
            img {
                height: 4rem;
                max-inline-size: 100%;
                border-radius: 100%;
            }
        }
        .username {
            h2 {
                color: white;
            }
        }
        .logout{
            color: red;
            font-size: 1rem;
            cursor: pointer;
        }
        @media screen and (min-width: 720px) and (max-width: 1080px) {
            gap: 0.5rem;
            .username {
                h2 {
                    font-size: 1rem;
                }
            }
        }
    }
`;

export default Contact;
