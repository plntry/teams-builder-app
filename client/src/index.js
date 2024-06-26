import { ConfigProvider } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
