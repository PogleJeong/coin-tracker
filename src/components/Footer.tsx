import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    justify-content: right;
    align-items: center;
    height: 100px;
    max-width: 80%;
    
    margin: 0 auto;
    padding: 0px 20px;
`

const Copyright = styled.h2`
    text-align: right;
    font-size: 20px;
    font-weight: bold;
`


function Footer() {
    return (
    <Wrapper>
        <Copyright>@copyright pogleJeong, {new Date().getFullYear()}</Copyright>
    </Wrapper>
    )
}

export default Footer;