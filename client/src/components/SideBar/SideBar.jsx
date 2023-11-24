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
    {
        icon: <GoHome />,
        text: 'Dashboard',
    },
    {
        icon: <BiMessageSquareCheck />,
        text: 'Messages',
    },
    {
        icon: <LuUsers />,
        text: 'Friends',
    },
    {
        icon: <PiUsersThreeBold />,
        text: 'Groups',
    },
    {
        icon: <RiSettings3Line />,
        text: 'Setting',
    },
];
function SideBar() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(0);
    const handleLogout = async () => {
        localStorage.removeItem('chat-app-user');
        const response = await logout();
        console.log('logout: ' +response.data.msg);
        navigate('/login');
    };
    return (
        <Container>
            <div>
                <div className="logo">
                    <h1>QuanPhat.pro</h1>
                </div>
                <ul className="menu">
                    {items.map((item, index) => (
                        <li key={index} className={ index === selected ? 'active' : ''} onClick={() => {setSelected(index)}}>
                            <span className="icon">{item.icon}</span>
                            <span>{item.text}</span>
                        </li>
                    ))}
                    
                </ul>
            </div>
            <div className="footer">
                <div className="user">
                    <img src="http://localhost:2411/storage/avatar_1.jpg" alt="avatar" />
                    <span>QuanPhatLeQuanPhat</span>
                </div>
                <button className="logout" onClick={handleLogout}>
                    <LuLogOut />
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
    .logo {
        padding: 1rem 2rem 1rem 1rem;
        margin-bottom: 2rem;
        h1 {
            font-size: 1.5rem;
            margin-top: 0.5rem;
            color: white;
        }
    }
    .menu {
        li {
            color: #95a5a6;
            font-size: 1.1rem;
            margin: 0.8rem 0;
            transition: 0.2s;
            .icon {
                margin-right: 0.6rem;
                margin-top: 0.1rem;
            }
            display: flex;
            align-items: center;
            padding: 0.8rem 2rem;
            &:hover {
                background-color: #0d193f;
            }
        }
        .active {
            color: white;
            background-color: #0d193f;
            border-right: 5px solid #2980b9;
        }
    }
    .footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.8rem 2rem;
        margin-bottom: 0.5rem;
        img {
            width: 2.2rem;
            height: 2.2rem;
            border-radius: 100%;
        }
        .icon {
            margin-top: 0.2rem;
            margin-right: 0.6rem;
        }
        .user {
            display: flex;
            align-items: center;
            color: #95a5a6;
            font-size: 1.1rem;
            span {
                overflow: hidden;
                text-overflow: ellipsis;
                width: 6rem;
                margin-top: 0.2rem;
                margin-left: 0.4rem;
                font-size: 1.1rem;
                font-weight: 600;
            }
        }
        .logout {
            cursor: pointer;
            color: #95a5a6;
            font-size: 1.2rem;
            outline: none;
            border: none;
            background-color: transparent;
            margin-top: 0.3rem;
        }
    }
`;
export default SideBar;
