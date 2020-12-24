import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './styles/global';

import Routes from './routes';
import { ToastProvider } from './hooks/toast';

const App: React.FC = () => (
  <>
    <ToastProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ToastProvider>
    <GlobalStyle />
  </>
);

export default App;
