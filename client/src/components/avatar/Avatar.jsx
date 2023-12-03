import styled from 'styled-components';

function Avatar({ image, online, size, loading, ...props }) {
    return (
        <Container theme={{ size: size }} {...props} className={`${loading && 'loading'}`}>
            <img src={image} alt="avatar" />
            <div className={`${online ? 'online' : ''}`}></div>
        </Container>
    );
}
const Container = styled.div`
    position: relative;
    width: ${(props) => props.theme.size || '4.2rem'};
    height: ${(props) => props.theme.size || '4.2rem'};
    margin-right: 0.8rem;
    overflow: hidden;
    img {
        width: 100%;
        height: 100%;
        border-radius: 100%;
        object-fit: cover;
    }
    .online {
        position: absolute;
        bottom: 2px;
        right: 2px;
        width: 1rem;
        height: 1rem;
        border-radius: 100%;
        background-color: #4cd137;
    }
    &.loading {
        &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 110%;
            height: 100%;
            background: linear-gradient(to right, grey, white 50%, grey);
            animation: skeletonLoading 1s infinite;
        }
        &::before {
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

export default Avatar;
