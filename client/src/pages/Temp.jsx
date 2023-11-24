import styled from 'styled-components';

function Temp() {
    return <Container>
        <div className='container'>
            <img src='robot.gif' alt='logo'/>
            <h1>Coming Soon</h1>
            <h2>Thanks for visit this site. See you soon!</h2>
        </div>
    </Container>;
}
const Container = styled.div`
    height: 100%;
    background-color: #131324;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    img{
        width: 20rem;
    }
    h1{
        color: #1abc9c;
        margin-bottom: 1rem;
    }
    h2{
        color:#ccc;
    }
`;
export default Temp;
