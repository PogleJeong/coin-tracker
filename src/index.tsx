import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import router from './Router';

// provider 구조!!
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';


// ThemeProvider 를 통해 모든 파일에서 theme 에 접근가능
// QueryClientProvider 를 통해 모든 파일에서 queryClient 에 접근가능
const queryClient = new QueryClient

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <RouterProvider router={router}/>
      </ThemeProvider>
    </QueryClientProvider>
    
  </React.StrictMode>
);

// 어떤 컴포넌트를 ThemeProvider 안에 넣게 된다면 그 안의 모든 컴포넌트는 ThemeProvider에 접근 가능
