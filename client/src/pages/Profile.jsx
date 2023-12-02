import styled from 'styled-components';
import ProfileSideBar from '../components/profiles/ProfileSideBar';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../api/internal';

function Profile() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    
    const getUserLogin = async () => {
        const res = await getUser();
        console.log(res);
        if (res.data !== '') {
            setCurrentUser(res.data);
            return;
        }
        if (localStorage.getItem('chat-app-user')) {
            setCurrentUser(JSON.parse(localStorage.getItem('chat-app-user')));
            return;
        }
        navigate('/login');
    };

    useEffect(() => {
        getUserLogin();
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
