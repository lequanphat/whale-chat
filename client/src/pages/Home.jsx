/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import Contact from '../components/contacts/Contact';
import ChatContainer from '../components/chat/ChatContainer';
import { useSelector } from 'react-redux';
import { contactsLoadingSelector } from '../store/selectors/contactSelector';
import Loading from '../components/loading/Loading';
import { userSelector } from '../store/selector';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Home() {
    const navigate = useNavigate();
    const isLoading = useSelector(contactsLoadingSelector);
    const user = useSelector(userSelector);
    useEffect(() => {
        if (!user.auth) {
            navigate('/login');
        }
    }, []);
    return (
        <Container>
            <Contact />
            <ChatContainer />
            {isLoading && <Loading />}
        </Container>
    );
}
const Container = styled.div`
    background-color: var(--bg-color);
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 540px) and (max-width: 960px) {
        grid-template-columns: 40% 60%;
    }
`;
export default Home;
