import styled from 'styled-components';
import Avatar from '../avatar/Avatar';

function ContactItem({image, username, latestMessage, latestChat, selected, ...props}) {
    return (
        <Container {...props} className={selected?'selected':''}>
            <div className="chat-user-info">
                <Avatar image={image}/>
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
    padding: 1.4rem;
    cursor: pointer;
    &.selected{
        background-color: #0d193f;
    }
    .chat-user-info {
        display: flex;
        align-items: center;
    }
    .chat-user-text {
        .username {
            font-size: 1.6rem;
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
            font-size: 1.2rem;
        }
    }
    .time {
        font-size: 1.4rem;
        color: #95a5a6;
    }
`;
export default ContactItem;
