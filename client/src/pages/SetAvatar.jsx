import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Buffer from 'buffer';
function SetAvatar() {
    const api = 'http://api.multiavatar.com/45678945';
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const fetchData = async () => {
        const data = [];
        for (let i = 0; i < 4; i++) {
            try {
                const response = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
                console.log(`${api}/${Math.round(Math.random() * 1000)}`);
                const buffer = new Buffer.from(response.data);
                data.push(buffer.toString('base64'));
            } catch (error) {
                console.error('Error fetching image', error);
            }
        }
        setAvatars(data);
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
                                <img
                                    src={`data:image/svg+xml;base64,${avatar}`}
                                    alt="avt"
                                    onClick={() => setSelectedAvatar(index)}
                                />
                            </div>
                        );
                    })}
                </div>
            </Container>
        </div>
    );
}

const Container = styled.div``;

export default SetAvatar;
