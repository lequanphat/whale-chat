import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { FiUser } from 'react-icons/fi';
import { MdLogout } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { userLogout } from '../../store/slices/authSlice.js';

function ProfileSideBar({ currentUser }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
        const response = await dispatch(userLogout());
        console.log(response);
        navigate('/login');
    };
    return (
        <Container>
            <h1 className="header">Profile</h1>
            <div className="avatar">
                <img src={currentUser?.avatar} alt="avatar" />
            </div>
            <h1 className="username">{currentUser?.username}</h1>
            <p className="about">
                You’ve gotta dance like there’s nobody watching, love like you’ll never be hurt, sing like there’s
                nobody listening, and live like it’s heaven on earth.
            </p>
            <ul className="profile-menu">
                <li>
                    <span className="icon">
                        <FiUser />
                    </span>
                    <span>Information</span>
                </li>
                <li>
                    <span className="icon">
                        <RiLockPasswordLine />
                    </span>
                    <span>Password</span>
                </li>
                <li onClick={handleLogout}>
                    <span className="icon">
                        <MdLogout />
                    </span>
                    <span>Logout</span>
                </li>
            </ul>
        </Container>
    );
}
const Container = styled.div`
    background-color: var(--second-bg-color);
    width: 25%;
    border-right: 1px solid #273c75;
    padding: 1rem;
    color: #bdc3c7;
    .header {
        font-size: 1.4rem;
        margin-bottom: 2.4rem;
    }
    .avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        img {
            width: 4.6rem;
            height: 4.6rem;
            border-radius: 100%;
            border: 4px solid #0d193f;
            object-fit: cover;
        }
    }
    .username {
        font-size: 1.2rem;
        text-align: center;
        margin-top: 0.8rem;
    }
    .about {
        font-size: 1.1rem;
        line-height: 1.5;
        text-align: center;
        margin-top: 0.8rem;
    }
    .profile-menu {
        list-style: none;
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin-top: 2.6rem;
    }
    li {
        width: 30%;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 1rem;
        margin-bottom: 4rem;
        .icon {
            font-size: 1.2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 2.8rem;
            height: 2.8rem;
            border: 1px solid #ccc;
            border-radius: 100%;
            margin-bottom: 1rem;
            cursor: pointer;
            &:hover {
                border: 2px solid white;
                color: white;
                background-color: #0d193f;
            }
        }
    }
`;
export default ProfileSideBar;
