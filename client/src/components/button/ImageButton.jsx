import styled from 'styled-components';

function ImageButton({ image, name, ...props }) {
    return (
        <Container {...props}>
            <img src={image} alt="logo" />
            <p>{name}</p>
        </Container>
    );
}
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #1abc9c;
    border-radius: 4px;
    padding: 1rem;
    cursor: pointer;
    img {
        width: 22px;
        height: 22px;
        margin-right: 1rem;
    }
    p{
        text-transform: uppercase;
        color:#1abc9c;
        font-size: 1.6rem;
    }
`;
export default ImageButton;
