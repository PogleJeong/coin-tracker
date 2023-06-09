import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
const startAnimation = keyframes`
    0% {
        width: 400px;
        height: 200px;
    }
    50% {
        width: 600px;
        height: 300px;
    }
    100% {
        width: 400px;
        height: 200px;
    }
`;

const StartBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 400px;
    height: 200px;
    font-size: 40px;
    font-weight: bold;
    background-color: greenyellow;
    color: black;
    animation: ${startAnimation} 2s infinite;
`;

function GoToHome() {
    return(
        <Wrapper>
            <Link to="/coin-tracker">
                <StartBox>Let's Go !!</StartBox>
            </Link>
        </Wrapper>
    )
}

export default GoToHome;