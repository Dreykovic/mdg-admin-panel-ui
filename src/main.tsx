import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import '@/styles/global.css';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './app';
import SuspenseContent from './components/ui/suspens-content';
import store from './store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<SuspenseContent />}>
        <Provider store={store}>
          <App />
        </Provider>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
);
