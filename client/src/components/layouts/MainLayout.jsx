import styled from "styled-components";
import SideBar from "../SideBar/SideBar";


function MainLayout({children}) {
    return ( 
    <Container>
        <div className="sidebar"><SideBar/></div>
        <div className="content">{children}</div>
    </Container> 
    );
}

const Container = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    .sidebar{
        width: 16%;
    }
    .content{
        width: 84%;
    }
`;

export default MainLayout;