import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // 严格模式会让组件渲染调用两次render方法
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


