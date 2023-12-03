import { useState } from 'react';
import styled from 'styled-components';
import { IoIosClose } from "react-icons/io";
function Setting() {
    const [fullscreen, setFullscreen] = useState(false);

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setFullscreen(true);
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
            setFullscreen(false);
        }
    };
    return (
        <SettingContainer>
            <div className='header'>
                <h1>Settings</h1>
                <button><IoIosClose/></button>
            </div>
            <button onClick={toggleFullScreen}>fullscreen</button>
        </SettingContainer>
    );
}
const SettingContainer = styled.div`
    position: absolute;
    right: 1rem;
    top: 5%;
    width: 30rem;
    height: 90%;
    background-color: var(--bg-color);
    border-radius: 0.4rem;
    padding: 1rem;
    color:white;
    .header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        h1{
            font-size: 1.5rem;
        }
        button{
            width: 3rem;
            height: 3rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            outline: none;
            background-color: transparent;
            border: none;
            font-size: 2.6rem;
            color:white;
            &:hover{
                background-color: red;
            }
        }
    }
`;
export default Setting;
