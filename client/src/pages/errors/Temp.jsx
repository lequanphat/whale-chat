import styled from 'styled-components';

function Temp({ title,subTitle, content, image }) {
    return (
        <Container>
            <div>
                <img src={image ? image : 'robot.gif'} alt="logo" />
                <div className='title'>
                    <h1 className='sub-title'>{subTitle ? subTitle : ''}</h1>
                    <h1>{title ? title : 'Coming Soon'}</h1>
                </div>
                <h2>{content ? content : 'Thanks for visit this site. See you soon!'}</h2>
            </div>
        </Container>
    );
}
const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    background-color: '#131324';
    align-items: center;
    justify-content: center;
    text-align: center;
    img {
        width: 20rem;
        margin-bottom: 1rem;
    }
    .title{
        display: flex;
        justify-content: center;
    }
    .sub-title{
        color: #ccc;
        margin-right: 0.8rem;
    }
    h1 {
        color: #1abc9c;
        margin-bottom: 1rem;
    }
    h2 {
        color: #ccc;
    }
`;
export default Temp;
