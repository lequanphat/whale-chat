import styled from 'styled-components';
import ProfileSideBar from '../components/profiles/ProfileSideBar';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../api/internal';
import { useSelector } from 'react-redux';
import { userSelector } from '../store/selector';

function Profile() {
    const navigate = useNavigate();
    const currentUser = useSelector(userSelector);
    
    return (
        <Container>
            <ProfileSideBar currentUser={currentUser}/>
            <div>123</div>
        </Container>
    );
}
const Container = styled.div`
    height: 100vh;
    display: flex;
    background-color: var(--bg-color);
    color: #ffffff;
`;
export default Profile;
