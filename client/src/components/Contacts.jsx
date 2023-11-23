import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Logout from './Logout';
function Contact({ contacts, currentUser, changeChat }) {
    const [currentUserName, setCurrentUserName] = useState('');
    const [currentUserImage, setCurrentUserImage] = useState('');
    const [currentSelected, setCurrentSelected] = useState('');

    useEffect(() => {
        if (currentUser) {
            setCurrentUserImage(currentUser.avatarImage);
            setCurrentUserName(currentUser.username);
        }
    }, [currentUser]);

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    };

    return (
        <>
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
                        <div className="user">
                            <div className="avatar">
                                <img src={`http://localhost:2411/storage/${currentUserImage}`} alt="avatar" />
                            </div>
                            <div className="username">
                                <h2>{currentUserName}</h2>
                            </div>
                        </div>
                        <div className="logout"><Logout/></div>
                    </div>
                </Container>
            )}
        </>
    );
}

const Container = styled.div`
    width: 25%;
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
            background-color: #2ecc71;
        }
    }

    .current-user {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #0d0d30;
        padding: 0.4rem 1rem;
        .user {
            display: flex;
            justify-content: center;
            align-items: center;
            .avatar {
                img {
                    width: 3rem;
                    height: 3rem;
                    border-radius: 100%;
                }
            }
            .username {
                h2 {
                    color: white;
                }
            }
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
