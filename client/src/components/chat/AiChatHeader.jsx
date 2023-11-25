import styled from "styled-components";

function AiChatHeader() {
    return ( <Container><h1>ChatGPT 5.0</h1></Container> );
}
const Container = styled.div`
    background-color: rgba(19,19,36,0.5);
    display: flex;
    align-items: center;
    border-bottom: 1px solid #273c75;
    h1{
        margin-left: 1rem;
        font-size: 1.1rem;
    }
`;
export default AiChatHeader;