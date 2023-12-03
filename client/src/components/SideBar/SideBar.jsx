import styled from 'styled-components';
import { GoHome } from 'react-icons/go';
import { RiSettings3Line, RiRobot2Line } from 'react-icons/ri';
import { LuUsers } from 'react-icons/lu';
import { PiUsersThreeBold } from 'react-icons/pi';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '../avatar/Avatar';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/selector';
const items = [
    {
        icon: <GoHome />,
        to: '/',
    },
    {
        icon: <LuUsers />,
        to: '/temp',
    },
    {
        icon: <PiUsersThreeBold />,
        to: '/temp',
    },
    {
        icon: <RiRobot2Line />,
        to: '/ai-chat',
    },
    {
        icon: <RiSettings3Line />,
        to: '/temp',
    },
];
function SideBar() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(0);
    const user = useSelector(userSelector);
    return (
        <Container>
            <div>
                <div className="logo">
                    <img src="logo.png" alt="avatar" />
                </div>
                <ul className="menu">
                    {items.map((item, index) => (
                        <Link
                            to={item.to}
                            key={index}
                            className={` menu-item ${index === selected ? 'active' : ''}`}
                            onClick={() => {
                                setSelected(index);
                            }}
                        >
                            <span className="icon">{item.icon}</span>
                        </Link>
                    ))}
                </ul>
            </div>
            <div className="footer">
                <Avatar
                    image={user.avatar}
                    onClick={() => {
                        navigate('/profile');
                    }}
                />
            </div>
        </Container>
    );
}

const Container = styled.div`
    background-color: var(--bg-color);
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
            width: 5.4rem;
            height: 5rem;
            border-radius: 10px;
        }
    }
    .menu {
        .menu-item {
            width: 5rem;
            height: 5rem;
            color: #95a5a6;
            font-size: 1.7rem;
            margin: 0.8rem 0;
            transition: 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 10px;
            transition: 0.2s;
            &:hover {
                background-color: var(--main-color);
            }
        }
        .active {
            color: white;
            background-color: var(--main-color);
        }
    }
    .footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem;
        margin-bottom: 0.5rem;
        .user {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #95a5a6;
            border-radius: 50%;
            outline: none;
            border: 3px solid #0d193f;
            background-color: transparent;
            cursor: pointer;
        }
    }
`;
export default SideBar;
