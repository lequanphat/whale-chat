import styled from 'styled-components';

function Button({ children, outline, ...props }) {
    return (
        <ButtonContainer {...props} className={`${outline && 'outline'}`}>
            {children}
        </ButtonContainer>
    );
}
const ButtonContainer = styled.button`
    width: 100%;
    padding: 1.2rem;
    background-color: #1abc9c;
    outline: none;
    border: 2px solid #1abc9c;
    border-radius: 4px;
    color: white;
    font-size: 1.6rem;
    text-transform: uppercase;
    font-weight: 500;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
        opacity: .8;
    }
    &.outline {
        background-color: transparent;
        border: 2px solid #1abc9c;
        color: #1abc9c;

        &:hover {
            background-color: #1abc9c;
            color: white;
            opacity: 1;
        }
    }
`;
export default Button;
