import styled from 'styled-components';
import ContactItem from './ContactItem';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { contactsLoadingSelector, contactsSelector } from '../../store/selectors/contactSelector';
import { userSelector } from '../../store/selector';
import { getAllContacts, setCurrentContact } from '../../store/slices/contactsSlice';

function Contact() {
    const dispatch = useDispatch();
    const user = useSelector(userSelector);
    const contacts = useSelector(contactsSelector);
    const isLoading = useSelector(contactsLoadingSelector);
    const [currentSelected, setCurrentSelected] = useState(undefined);
    const getContacts = async () => {
        await dispatch(getAllContacts(user.id));
    };

    const handleCurrentContact = (index) => {
        setCurrentSelected(index);
        dispatch(
            setCurrentContact({
                id: contacts[index]._id,
                username: contacts[index].username,
                email: contacts[index].email,
                avatar: contacts[index].avatar,
            }),
        );
    };

    useEffect(() => {
        if (user) {
            getContacts();
        }
    }, []);
    return (
        <Container>
            <div className="header">
                <h1>Chats</h1>
                <input type="text" placeholder="Search your friends..." />
            </div>

            <div className="chat-users">
                {isLoading ? (
                    <>
                        <ContactItem loading username="123" />
                        <ContactItem loading username="123" />
                        <ContactItem loading username="123" />
                    </>
                ) : (
                    contacts &&
                    contacts.map((contact, index) => (
                        <ContactItem
                            selected={index === currentSelected}
                            key={contact._id}
                            username={contact.username}
                            image={contact.avatar}
                            onClick={() => {
                                handleCurrentContact(index);
                            }}
                        />
                    ))
                )}
            </div>
        </Container>
    );
}
const Container = styled.div`
    background-color: var(--second-bg-color);
    width: auto;
    height: 100vh;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #273c75;
    .header {
        padding: 1.4rem;
        h1 {
            font-size: 2rem;
            margin-bottom: 1.4rem;
            color: white;
        }
    }
    input {
        font-size: 1.6rem;
        width: 100%;
        padding: 1rem;
        outline: none;
        background-color: #ffffff34;
        background-color: transparent;
        border: 1px solid #273c75;
        border-radius: 8px;
        color: white;
    }
    .chat-users {
        display: flex;
        flex-direction: column;
        overflow: auto;
        padding: 1.4rem;
        &::-webkit-scrollbar {
            width: 0.3rem;
            &-thumb {
                background-color: #ffffff39;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }
    }
`;
export default Contact;
