import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import '@/styles/global.css';
import '@/styles/styles.css';
import { Provider } from 'react-redux';

import App from './app';
import SuspenseContent from './components/ui/suspens-content';
import store from './store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<SuspenseContent />}>
      <Provider store={store}>
        <App />
      </Provider>
    </Suspense>
  </React.StrictMode>,
);
