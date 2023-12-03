import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { setAvatar } from '../api/internal';

function SetAvatar() {
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const fetchData = async () => {
        const data = [
            'avatar_1.jpg',
            'avatar_2.jpg',
            'avatar_3.jpg',
            'avatar_4.jpg',
            'avatar_5.jpg',
            'avatar_6.jpg',
            'avatar_7.jpg',
        ];
        setAvatars(data);
        setSelectedAvatar(0);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSetAvatar = async () => {
        const user = JSON.parse(localStorage.getItem('chat-app-user'));
        const { data } = await setAvatar(user._id, {
            avatar: `http://localhost:2411/storage/${avatars[selectedAvatar]}`,
        });
        if (data.status === false) {
            alert(data.msg);
            return;
        }
        localStorage.setItem('chat-app-user', JSON.stringify(data.user));
        navigate('/');
    };

    return isLoading ? (
        <Loading>
            <img className="loading" src="loading.gif" alt="loading" />
        </Loading>
    ) : (
        <Container>
            <div className="title-container">
                <h1>Pick an avatar as your profile picture</h1>
            </div>
            <div className="avatars">
                {avatars.map((avatar, index) => {
                    return (
                        <div key={index} className={`avatar ${selectedAvatar === index ? 'selected' : ''}`}>
                            <img
                                src={`http://localhost:2411/storage/${avatar}`}
                                alt="avt"
                                onClick={() => setSelectedAvatar(index)}
                            />
                        </div>
                    );
                })}
            </div>
            <button
                className="submit-btn"
                onClick={() => {
                    handleSetAvatar();
                }}
            >
                Set as Profile Picture
            </button>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    background-color: #131324;
    height: 100vh;
    width: 100vw;
    .loader {
        max-inline-size: 100%;
    }
    .title-container {
        h1 {
            color: white;
        }
    }
    .avatars {
        display: flex;
        gap: 2rem;
        .avatar {
            border: 0.2rem solid transparent;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.3s ease-in-out;
            border-radius: 100%;
            cursor: pointer;
            img {
                border-radius: 100%;
                height: 6rem;
                width: 6rem;
            }
        }
        .selected {
            border: 0.2rem solid #1abc9c;
        }
    }
    .submit-btn {
        background-color: #1abc9c;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        font-size: 1rem;
        text-transform: uppercase;
        border-radius: 0.4rem;
        &:hover {
            background-color: #16a085;
        }
    }
`;

const Loading = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    background-color: #131324;
    height: 100vh;
    width: 100vw;
    .loading {
        width: 10rem;
        height: 10rem;
    }
`;

export default SetAvatar;
