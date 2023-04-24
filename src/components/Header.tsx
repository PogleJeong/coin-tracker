import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();

    const gotoPart1 = () => {
        navigate("/styled-component")
    }
    const gotoPart2 = () => {
        navigate("/typescript");
    }
    const gotoPart3 = () => {
        navigate("/users");
    }
    const gotoCoinTracker = () => {
        navigate("/coin-tracker");
    }
    return(
        <div>
            <h1>Pogle's react practice</h1>
            <button onClick={gotoPart1}>styled component part</button><br/>
            <button onClick={gotoPart2}>typescript part</button><br/>
            <button onClick={gotoPart3}>user info</button><br/>
            <button onClick={gotoCoinTracker}>Coin Tracker</button>

        </div>
    )
}

export default Header;