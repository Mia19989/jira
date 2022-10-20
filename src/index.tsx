import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { loadDevTools } from "jira-dev-tool";
import 'antd/dist/antd.less';
import { AppProviders } from './context';
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
loadDevTools(() => {
  root.render(
    <React.StrictMode>
      {/* <Router> */}
        <AppProviders>
          <App />
        </AppProviders>
      {/* </Router> */}
    </React.StrictMode>
  );
})
