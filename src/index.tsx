import React from 'react';
import ReactDOM from 'react-dom/client';
// provider 구조!!
// ThemeProvider 를 통해 모든 파일에서 theme 에 접근가능
// QueryClientProvider 를 통해 모든 파일에서 queryClient 에 접근가능
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
// recoil : index.js (루트컴포넌트)에 감싸준다
import { RecoilRoot } from 'recoil';

import router from './Router';


const queryClient = new QueryClient

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}/>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);

// 어떤 컴포넌트를 ThemeProvider 안에 넣게 된다면 그 안의 모든 컴포넌트는 ThemeProvider에 접근 가능
