import styled from 'styled-components';
import Avatar from '../avatar/Avatar';

function Message({ scrollRef, message, sended, image, width }) {
    return (
        <Container theme={{ width: width }} ref={scrollRef} className={`${sended ? 'sended' : 'recieved'}`}>
            <div className="avatar-img">
                {image && <Avatar image={image} size={"4rem"} className="img" />}
            </div>
            <div className="content">
                <p>{message}</p>
            </div>
        </Container>
    );
}
const Container = styled.div`
    display: flex;
    align-items: center;
    .avatar-img {
        width: 3rem;
        margin-right: 2rem;

    }
    .content {
        max-width: ${(props) => props.theme.width || '45%'};
        overflow-wrap: break-word;
        font-size: 1.1rem;
        border-radius: 0.8rem;
        line-height: 1.5;
        color: #d1d1d1;
        p {
            font-size: 1.6rem;
            width: fit-content;
            padding: 0.8rem 1.6rem;
            border-radius: 1.4rem;
        }
    }
    &.sended {
        justify-content: flex-end;
        .content p {
            background-color: var(--main-color);
            float: right;
        }
    }
    &.recieved {
        justify-content: flex-start;
        align-items: flex-start;
        .content p {
            background-color: #9900ff20;
            float: left;
        }
    }
`;
export default Message;
