import styled from 'styled-components';
import { GoHome } from 'react-icons/go';
import { RiSettings3Line } from 'react-icons/ri';
import { LuUsers, LuLogOut } from 'react-icons/lu';
import { PiUsersThreeBold } from 'react-icons/pi';
import { BiMessageSquareCheck } from 'react-icons/bi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../api/internal';

const items = [
    <GoHome />,,
    <BiMessageSquareCheck />,
    <LuUsers />,
    <PiUsersThreeBold />,
    <RiSettings3Line />
];
function SideBar() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(0);
    // const handleLogout = async () => {
    //     localStorage.removeItem('chat-app-user');
    //     const response = await logout();
    //     console.log('logout: ' +response.data.msg);
    //     navigate('/login');
    // };
    return (
        <Container>
            <div>
                <div className="logo">
                    <img src="logo.jpg" alt="avatar" />
                </div>
                <ul className="menu">
                    {items.map((item, index) => (
                        <li key={index} className={ index === selected ? 'active' : ''} onClick={() => {setSelected(index)}}>
                            <span className="icon">{item}</span>
                        </li>
                    ))}
                    
                </ul>
            </div>
            <div className="footer">
                <button className="user">
                    <img src="http://localhost:2411/storage/avatar_1.jpg" alt="avatar" />
                </button>
            </div>
        </Container>
    );
}

const Container = styled.div`
    
    background-color: #080420;
    height: 100vh;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .logo {
        text-align: center;
        margin: 1rem 0 2.4rem 0;
        img {
            width: 3rem;
            height: 3rem;
            border-radius: 10px;
        }
    }
    .menu {
        li {
            width: 3.6rem;
            height: 3.6rem;
            color: #95a5a6;
            font-size: 1.2rem;
            margin: 0.8rem 0;
            transition: 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 10px;
            &:hover {
                background-color: #0d193f;
            }
        }
        .active {
            color: white;
            background-color: #0d193f;
        }
    }
    .footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.8rem 2rem;
        margin-bottom: 0.5rem;
        img {
            width: 2.4rem;
            height: 2.4rem;
            border-radius: 100%;
        }
        .user {
            display: flex;
            align-items: center;
            color: #95a5a6;
            font-size: 1.1rem;
            border-radius: 100%;
            outline: none;
            border: 3px solid #0d193f;
            background-color: transparent;
            cursor: pointer;
        }
    }
`;
export default SideBar;
