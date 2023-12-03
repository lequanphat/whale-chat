import styled from 'styled-components';

function Loading() {
    return (
        <Container>
            <svg>
                <circle cx="70" cy="70" r="70"></circle>
            </svg>
        </Container>
    );
}
const Container = styled.div`
    position: fixed;
    top: 0;
    left:0;
    right:0;
    bottom:0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    svg {
        position: relative;
        height: 150px;
        width: 150px;
        animation: rotate 2s linear infinite;
    }
    svg circle {
        width: 100%;
        height: 100%;
        fill: none;
        stroke-width: 10;
        stroke: #00a1ff;
        transform: translate(5px, 5px);
        stroke-linecap: round;
        stroke-dashoffset: 440;
        stroke-dasharray: 440;
        animation: animate 4s linear infinite;
    }
    @keyframes animate {
        0%,
        100% {
            stroke-dashoffset: 440;
        }
        50% {
            stroke-dashoffset: 0;
        }
        50.1% {
            stroke-dashoffset: 880;
        }
    }
    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;
export default Loading;
