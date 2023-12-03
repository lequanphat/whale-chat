import styled from 'styled-components';

function Avatar({ image, online, size, ...props}) {
    return (
        <Container theme={{ size: size }} {...props}>
            <img src={image} alt="avatar" />
            <div className={`${online ? 'online' : ''}`}></div>
        </Container>
    );
}
const Container = styled.div`
    position: relative;
    width: ${props => props.theme.size || '4.2rem'};
    height: ${props => props.theme.size || '4.2rem'};
    margin-right: 0.8rem;
    img {
        width: 100%;
        height: 100%;
        border-radius: 100%;
        object-fit: cover;
    }
    .online{
        position: absolute;
        bottom: 2px;
        right: 2px;
        width: 1rem;
        height: 1rem;
        border-radius: 100%;
        background-color: #4cd137;
    }
`;

export default Avatar;
