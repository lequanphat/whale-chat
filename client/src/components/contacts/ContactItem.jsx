import styled from 'styled-components';
import Avatar from '../avatar/Avatar';

function ContactItem({ image, username, latestMessage, latestChat, selected, loading, ...props }) {
    return (
        <Container {...props} className={`${selected && 'selected'} ${loading && 'loading'}`}>
            <div className="chat-user-info">
                <Avatar image={image} loading={loading} />
                <div className="chat-user-text">
                    <p className="username">{username}</p>
                    <p className="latest-message">Chat with my friends now!</p>
                </div>
            </div>
            <span className="time">04:53pm</span>
        </Container>
    );
}
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.2rem;
    border-radius: 0.6rem;
    transition: .1s;
    
    cursor: pointer;
    &.selected {
        background-color: var(--main-color);
    }
    .chat-user-info {
        display: flex;
        align-items: center;
        flex: 1;
    }
    .chat-user-text {
        .username {
            position: relative;
            width: 100%;
            font-size: 1.6rem;
            font-weight: 600;
            margin-bottom: 0.6rem;
            margin-top: 0.2rem;
            overflow: hidden;
            color: white;
        }
        .latest-message {
            position: relative;
            color: #95a5a6;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 100%;
            font-size: 1.2rem;
        }
    }
    .time {
        position: relative;
        font-size: 1.3rem;
        color: #95a5a6;
        margin-left: 0.5rem;
        overflow: hidden;
    }
    &.loading {
        .latest-message::after,
        .time::after,
        .username::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            /* background-color: red; */
            background: linear-gradient(to right, grey, white 50%, grey);
            animation: skeletonLoading 1s infinite;
        }
        @keyframes skeletonLoading {
            0% {
                left: -100%;
            }
            100% {
                left: 100%;
            }
        }
        .latest-message::before,
        .time::before,
        .username::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: grey;
        }
    }
`;
export default ContactItem;
