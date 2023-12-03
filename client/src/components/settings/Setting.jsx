import { useState } from 'react';
import styled from 'styled-components';
import { IoIosClose } from 'react-icons/io';
import { LuSettings2 } from 'react-icons/lu';
import { RiFullscreenFill, RiFullscreenExitFill } from 'react-icons/ri';
import IconButton from '../button/IconButton';
function Setting() {
    const [isShow, setIsShow] = useState(false);
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
            {isShow ? (
                <div className="setting_wrapper">
                    <div className="header">
                        <h1>Settings</h1>
                        <button
                            onClick={() => {
                                setIsShow(!isShow);
                            }}
                        >
                            <IoIosClose />
                        </button>
                    </div>
                    <div className="theme_setting">
                        <h1>Theme</h1>
                        <div className="theme_row">
                            <div className="theme_box"></div>
                            <div className="theme_box"></div>
                        </div>
                    </div>
                    <div className="color_setting">
                        <h1>Color</h1>
                        <div className="color_grid">
                            <div className="color_item"></div>
                            <div className="color_item"></div>
                            <div className="color_item"></div>
                            <div className="color_item"></div>
                            <div className="color_item"></div>
                            <div className="color_item"></div>
                        </div>
                    </div>
                    <IconButton
                        icon={fullscreen ? <RiFullscreenExitFill /> : <RiFullscreenFill />}
                        content={fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                        onClick={toggleFullScreen}
                    />
                </div>
            ) : (
                <div
                    className="setting_button"
                    onClick={() => {
                        setIsShow(!isShow);
                    }}
                >
                    <LuSettings2 />
                </div>
            )}
        </SettingContainer>
    );
}
const SettingContainer = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    background-color: var(--bg-color);
    color: white;
    h1 {
        font-size: 1.5rem;
    }
    .setting_wrapper {
        padding: 1.4rem;
        width: 28rem;
        min-height: 90vh;
        border-radius: 2rem;
    }
    .setting_button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 4rem;
        height: 4rem;
        background-color: var(--bg-color);
        font-size: 2.6rem;
        border-radius: 50%;
        cursor: pointer;
    }
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 1.2rem;
        border-bottom: 1px solid #555;
        margin-bottom: 1rem;

        button {
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
            color: white;
            &:hover {
                background-color: red;
            }
        }
    }
    .theme_setting {
        padding: 1rem 0;
        .theme_row {
            display: grid;
            grid-template-columns: 47% 47%;
            justify-content: space-between;
            margin-top: 1rem;
        }
        .theme_box {
            min-height: 11rem;
            background-color: #ccc;
            border-radius: 0.8rem;
        }
    }
    .color_setting {
        padding: 1rem 0 2rem 0;
        .color_grid {
            display: grid;
            grid-template-columns: 30% 30% 30%;
            row-gap: 1rem;
            column-gap: 1rem;
            justify-content: space-between;
            margin-top: 1rem;
        }
        .color_item {
            height: 5rem;
            background-color: #ccc;
            border-radius: 0.4rem;
        }
    }
`;
export default Setting;
