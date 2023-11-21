import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Buffer from 'buffer';
function SetAvatar() {
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const fetchData = async () => {
        const data = ['avatar_1.jpg', 'avatar_2.jpg', 'avatar_3.jpg', 'avatar_1.jpg'];
        setAvatars(data);
        setSelectedAvatar(0);
        setIsLoading(false);
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <Container>
                <div className="title-container">
                    <h1>Pick an avatar as your profile picture</h1>
                </div>
                <div className="avatars">
                    {avatars.map((avatar, index) => {
                        return (
                            <div key={index} className={`avatar ${selectedAvatar === index ? 'selected' : ''}`}>
                                <img src={`/images/${avatar}`} alt="avt" onClick={() => setSelectedAvatar(index)} />
                            </div>
                        );
                    })}
                </div>
                <button className="submit-btn">Set as Profile Picture</button>
            </Container>
        </div>
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

export default SetAvatar;
