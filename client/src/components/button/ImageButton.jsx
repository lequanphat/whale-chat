import styled from 'styled-components';

function ImageButton({ image, ...props }) {
    return (
        <Container {...props}>
            <img src={image} alt="logo" />
        </Container>
    );
}
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #1abc9c;
    border-radius: 4px;
    padding: 1rem;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
        background-color: rgba(26, 188, 156, 0.1);
    }
    img {
        width: 22px;
        height: 22px;
    }
`;
export default ImageButton;
