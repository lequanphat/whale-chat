import styled from 'styled-components';
import { GoHome } from 'react-icons/go';
import { RiSettings3Line, RiRobot2Line  } from 'react-icons/ri';
import { LuUsers } from 'react-icons/lu';
import { PiUsersThreeBold } from 'react-icons/pi';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const items = [
    {
        icon: <GoHome />,
        to: "/"
    },
    {
        icon: <LuUsers />,
        to: "/temp"
    },
    {
        icon: <PiUsersThreeBold />,
        to: "/temp"
    },
    {
        icon: <RiRobot2Line />,
        to: "/ai-chat"
    },
    {
        icon: <RiSettings3Line />,
        to: "/temp"
    },
];
function SideBar() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(0);
    const [avatarImage, setAvatarImage] = useState(null);

    useEffect(() => {
        setAvatarImage(JSON.parse(localStorage.getItem('chat-app-user'))?.avatarImage);
    }, [])
    return (
        <Container>
            <div>
                <div className="logo">
                    <img src="logo.png" alt="avatar" />
                </div>
                <ul className="menu">
                    {items.map((item, index) => (
                        <Link to={item.to} key={index} className={ ` menu-item ${index === selected ? 'active' : ''}`} onClick={() => {setSelected(index)}}>
                            <span className="icon">{item.icon}</span>
                        </Link>
                    ))}
                    
                </ul>
            </div>
            <div className="footer">
                <button className="user" onClick={() => { navigate("/profile")} }>
                    <img src={`http://localhost:2411/storage/${avatarImage}`} alt="avatar" />
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
            width: 3.6rem;
            height: 3.4rem;
            border-radius: 10px;
        }
    }
    .menu {
        .menu-item {
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
            width: 2.8rem;
            height: 2.8rem;
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
