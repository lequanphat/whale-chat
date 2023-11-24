import styled from 'styled-components';

function Temp({title, content, image}) {
    return <Container>
        <div className={`container`}>
            <img src={image ? image : 'robot.gif'} alt='logo'/>
            <h1>{title ? title : 'Coming Soon'}</h1>
            <h2>{content ? content : 'Thanks for visit this site. See you soon!'}</h2>
        </div>
    </Container>;
}
const Container = styled.div`
    height: 100%;
    display: flex;
    background-color:'#131324';
    align-items: center;
    justify-content: center;
    text-align: center;
    img{
        width: 20rem;
        margin-bottom: 1rem;
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
