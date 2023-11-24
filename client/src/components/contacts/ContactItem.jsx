import styled from 'styled-components';

function ContactItem({image, username, latestMessage, latestChat, selected, ...props}) {
    return (
        <Container {...props} className={selected?'selected':''}>
            <div className="chat-user-info">
                <img src={image} />
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
    padding:1rem;
    &.selected{
        background-color: #0d193f;
    }
    .chat-user-info {
        display: flex;
        align-items: center;
    }
    img {
        width: 3rem;
        height: 3rem;
        border-radius: 100%;
        margin-right: 0.5rem;
    }
    .chat-user-text {
        .username {
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 0.2rem;
            margin-top: 0.2rem;
        }
        .latest-message {
            color: #95a5a6;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 9rem;
        }
    }
    .time {
        font-size: 0.9rem;
        color: #95a5a6;
    }
`;
export default ContactItem;
