import styled from 'styled-components';

function Avatar({ image, online, theme }) {
    return (
        <Container theme={theme}>
            <img src={image} alt="avatar" />
            <div className={`${online ? 'online' : ''}`}></div>
        </Container>
    );
}
const Container = styled.div`
    position: relative;
    width: ${props => props.theme.width || '3rem'};
    height: ${props => props.theme.height || '3rem'};
    margin-right: 0.8rem;
    img {
        width: 100%;
        height: 100%;
        border-radius: 100%;
    }

    .online{
        position: absolute;
        bottom: 2px;
        right: 2px;
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 100%;
        background-color: #4cd137;
    }
`;

export default Avatar;
