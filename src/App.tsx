import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { createGlobalStyle } from "styled-components";

// React Query 를 통해 저장된 캐시값을 보기 위함
import { ReactQueryDevtools } from "react-query/devtools";

/*
Outlet은 하위 경로 요소를 렌더링하기 위해 상위 경로 요소에서 사용합니다.
이렇게 하면 하위 경로가 렌더링될 때 중첩된 UI가 표시될 수 있습니다. 
상위 경로가 정확히 일치하면 하위 index 경로를 렌더링하거나 
index 경로가 없으면 아무것도 렌더링하지 않습니다
*/

/*
useOutletContext

종종 상위 경로는 하위 경로와 state 또는 기타 값을 공유합니다.
원하는 경우 context provider를 만들 수 있지만 Outlet에 기본 제공되는 context를 사용할 수도 있습니다.
*/

// Reset CSS : https://github.com/zacanger/styled-reset/blob/master/src/index.ts
// Google Fonts : https://fonts.google.com
const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
      display: none;
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }


  * {
    box-sizing: border-box;
  }
  body {
    font-family: 'Source Sans Pro', sans-serif;
    background-color: ${props => props.theme.bgColor};
    color: ${props => props.theme.textColor};
  }
  a {
    text-decoration: none;
    color: inherit;
  }

`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Outlet />
      <Footer />
      {/* ReactQuery 에 의해 저장된 캐시데이터를 볼 수 있음! 
      개발자 도구처럼 편하게 이용가능! */}
      <ReactQueryDevtools initialIsOpen={true}/>
    </>
  );
}

export default App;
