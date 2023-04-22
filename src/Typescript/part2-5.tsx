import styled from "styled-components";
import { isExportDeclaration } from "typescript";

/*
    https://styled-components.com/docs/api#typescript

    typescript 의 theme 사용하기
    1. style.d.ts 파일을 생성(d.ts : declaration file)
    2. theme.ts (테마) 생성
    3. index.tsx 에 theme.ts 에 작성한 theme 주입
    4. app.tsx 에서 props 로 받아 사용
 */

// 모든 컴포넌트들은 ThemeProvider 를 통해 props.theme 에 접근가능
const Container = styled.div`
    background-color: ${props => props.theme.bgColor};
`;

const H1 = styled.h1`
    color: ${(props)=> props.theme.textColor};
`;

function styled_App() {
    return <div>
        <Container>
            <H1>HELLO</H1>
        </Container>
    </div>
}

export default styled_App;