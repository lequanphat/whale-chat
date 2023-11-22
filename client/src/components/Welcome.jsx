import styled from "styled-components";

function Welcome({currentUser}) {
    return <Container>
        <img src="robot.gif" alt=""></img>
        <h1>Welcome, <span>{currentUser?.username}!</span></h1>
        <h3>Please select a chat to Start Messaging...</h3>
    </Container>;
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    width: 100%;
    img {
        width: 20rem;
        height: 20rem;
    }
    span{
        color: #1abc9c;
    }

`;
export default Welcome;
