import styled from 'styled-components';
import { BiPowerOff } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api/internal';
function Logout() {
    const navigate = useNavigate();
    

    const handleLogout = async () => {
        localStorage.removeItem('chat-app-user');
        const response = await logout();
        console.log('logout: ' +response.data.msg);
        navigate('/login');
    };
    return (
        <Container onClick={handleLogout}>
            <BiPowerOff />
        </Container>
    );
}

const Container = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: #27ae60;
    border: none;
    cursor: pointer;
    svg {
        font-size: 1.3rem;
        color: #ebe7ff;
    }
`;
export default Logout;
