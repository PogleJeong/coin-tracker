import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// 어떤 컴포넌트를 ThemeProvider 안에 넣게 된다면 그 안의 모든 컴포넌트는 ThemeProvider에 접근 가능
