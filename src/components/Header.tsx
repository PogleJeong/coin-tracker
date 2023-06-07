import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { DarkMode } from "../Recoil/atoms";

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr); 
    grid-column-start: 2;
    justify-content: center;
    align-items: center;
    background-color: ${(props)=> props.theme.bgColor};
    
    padding: 0px 20px;
    max-width: 80%;
    height: 200px;
    margin: 0 auto;
`

const Title = styled.h1`
    text-align: center;
    font-size: 48px;
    font-weight: bold;
    letter-spacing: 5px;
    color: ${(props)=> props.theme.textColor};
`
const Options = styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
    height: 100px;
    padding: 20px;
`

const HomeBtn = styled.button`
    width: 200px;
    aspect-ratio: 4/1;
    border: none;
    border-radius: 15px;
    background-color: aquamarine;
`

const DarkModeBtn = styled.button`
    width: 200px;
    aspect-ratio: 4/1;
    border: none;
    border-radius: 15px;
    background-color: ${(props)=>props.theme.btnColor};
    color: ${(props)=>props.theme.textColor};
`

function Header() {
    const [darkMode, setDarkMode] = useRecoilState(DarkMode);
    const navigate = useNavigate();
    /*
    const gotoPart1 = () => {
        navigate("/styled-component")
    }
    const gotoPart2 = () => {
        navigate("/typescript");
    }
    const gotoPart3 = () => {
        navigate("/users");
    }
    */

    const toggleDarkMode = () => setDarkMode((prev)=>!prev);
    const gotoCoinTracker = () => {
        navigate("/coin-tracker");
    } 
    return(
        <Wrapper>
            <span></span>
            <Title>Pogle's Coin Tracker</Title>
            <Options>
                <HomeBtn onClick={gotoCoinTracker}>Home</HomeBtn>
                {darkMode ? 
                <DarkModeBtn onClick={toggleDarkMode} >LightMode</DarkModeBtn>    
                :
                <DarkModeBtn onClick={toggleDarkMode}>DarkMode</DarkModeBtn>
                }
                
            </Options>
        </Wrapper>
    )
}

export default Header;