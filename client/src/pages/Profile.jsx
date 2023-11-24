import styled from 'styled-components';
import ProfileSideBar from '../components/profiles/ProfileSideBar';

function Profile() {
    return (
        <Container>
            <ProfileSideBar />
            <div>123</div>
        </Container>
    );
}
const Container = styled.div`
    height: 100vh;
    display: flex;
    background-color: #131324;
    color: #ffffff;
`;
export default Profile;
