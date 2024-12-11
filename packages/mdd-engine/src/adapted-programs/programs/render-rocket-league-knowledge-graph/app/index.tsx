import '../../render-knowledge-graph/app/browser/hotReload';
import React from 'react';
import ReactDom from 'react-dom/client';
import { App } from './app';
import { AppContextProvider } from './appContext';

const rootElement = document.getElementById('app');
const root = ReactDom.createRoot(rootElement);
root.render(
  <AppContextProvider>
    <App />
  </AppContextProvider>,
);
