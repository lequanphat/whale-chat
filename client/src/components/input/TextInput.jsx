import styled from 'styled-components';

function TextInput({ title, type, placeholder, error, value, ...props }) {
    return (
        <Container>
            <label>{title}</label>
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
    margin-bottom: 2rem;
    label{
        display: block;
        color:#34495e;
        font-size: 1.6rem;
        margin-bottom: .6rem;
    }
    input {
        background-color: transparent;
        padding: 1.2rem;
        border: 1px solid #1abc9c;
        border-radius: 0.4rem;
        width: 100%;
        font-size: 1.7rem;
        outline: none;
        transition: 0.2s;
        &:focus {
            border: 1px solid #997af0;
        }
        &::placeholder {
            font-size: 1.7rem;
        }

        &.error {
            border: 1px solid #e74c3c;
            background-color: rgba(231, 76, 60, 0.1);
        }
    }
    span{
        display: block;
        margin-top: .6rem;
        font-size: 1.5rem;
        color: rgba(231, 76, 60, 1);
    }
`;
export default TextInput;
