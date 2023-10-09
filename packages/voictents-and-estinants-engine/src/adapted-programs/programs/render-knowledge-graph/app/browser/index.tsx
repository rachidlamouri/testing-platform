/**
 * The root JavaScript code for the knowledge graph application. This code is
 * bundled and dynamically added to a boilerplate HTML file in "renderApp"
 *
 * @noCanonicalDeclaration
 */

import './hotReload';
import React from 'react';
import ReactDom from 'react-dom/client';
import { App } from './app';

const rootElement = document.getElementById('app');
const root = ReactDom.createRoot(rootElement);
root.render(<App />);
