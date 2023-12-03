import styled from 'styled-components';

function IconButton({ icon, content, ...props }) {
    return (
        <Container {...props}>
            {icon}
            <span>{content}</span>
        </Container>
    );
}
const Container = styled.div`
    background-color: #1abc9c;
    padding: 1rem;
    font-size: 1.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.4rem;
    cursor: pointer;
    svg {
        font-size: 2rem;
        margin-right: 0.6rem;
    }
`;
export default IconButton;
