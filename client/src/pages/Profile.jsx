import styled from 'styled-components';
import ProfileSideBar from '../components/profiles/ProfileSideBar';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
        if (!localStorage.getItem('chat-app-user')) {
            navigate('/login');
        } else {
            setCurrentUser(JSON.parse(localStorage.getItem('chat-app-user')));
        }
    }, []);
    return (
        <Container>
            <ProfileSideBar currentUser={currentUser}/>
            <div>123</div>
        </Container>
    );
}
const Container = styled.div`
    height: 100vh;
    display: flex;
    background-color: #131324;
    color: #ffffff;
`;
export default Profile;
