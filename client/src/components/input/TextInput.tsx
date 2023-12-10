// @ts-uncheck
import styled from 'styled-components';



function TextInput({ title, type, placeholder, error, value, name, ...props }) {
    return (
        <Container>
            <label htmlFor={name}>{title}</label>
            <input
                {...props}
                value={value}
                type={type || 'text'}
                placeholder={placeholder}
                className={`${error && 'error'}`}
            />
            {error && <span>{error}</span>}
        </Container>
    );
}
const Container = styled.div`
    margin-bottom: 1rem;
    label {
        display: block;
        color: #34495e;
        font-size: 1rem;
        margin-bottom: 0.2rem;
    }
    input {
        background-color: transparent;
        padding: .6rem;
        border: 1px solid #1abc9c;
        border-radius: 0.4rem;
        width: 100%;
        font-size: 1rem;
        outline: none;
        transition: 0.2s;
        &:focus {
            border: 1px solid #997af0;
        }
        &::placeholder {
            font-size: 1rem;
        }

        &.error {
            border: 1px solid #e74c3c;
            background-color: rgba(231, 76, 60, 0.1);
        }
    }
    span {
        display: block;
        margin-top: 0.2rem;
        font-size: 0.9rem;
        color: rgba(231, 76, 60, 1);
    }
`;
export default TextInput;
