/**
 * The root JavaScript code for the program modeler application. This code is
 * bundled and dynamically added to a boilerplate HTML file in "renderApp"
 *
 * @noCanonicalDeclaration
 */

import '../../render-knowledge-graph/app/browser/hotReload';
import React from 'react';
import ReactDom from 'react-dom/client';
import { App } from './app';
import { GeneratedDataProvider } from './contexts/generatedDataContext';
import { SelectionProvider } from './contexts/selectionContext';

const rootElement = document.getElementById('app');
const root = ReactDom.createRoot(rootElement);
root.render(
  <GeneratedDataProvider>
    <SelectionProvider>
      <App />
    </SelectionProvider>
  </GeneratedDataProvider>,
);
