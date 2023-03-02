import React from 'react';
import ReactDOM from 'react-dom/client';
// import { loadDevTools } from "jira-dev-tool";
import { DevTools, loadServer } from "jira-dev-tool";
import 'antd/dist/antd.less';
import App from './App';
import { AppProviders } from './context';
import "./App.css";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
// loadDevTools(() => {
//   root.render(
//     <React.StrictMode>
//       {/* <Router> */}
//         <AppProviders>
//           <App />
//         </AppProviders>
//       {/* </Router> */}
//     </React.StrictMode>
//   );
// })

loadServer(() =>
  root.render(
    <React.StrictMode>
      <AppProviders>
        <DevTools />
        <App />
      </AppProviders>
    </React.StrictMode>
  )
);
