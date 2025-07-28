// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import {Toaster} from "react-hot-toast";
// import {Provider} from "react-redux";
// import store from './redux/store';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//     <App />
//     <Toaster/>
//     </Provider>
//   </React.StrictMode>
// );



//*************************** */
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import { Toaster } from "react-hot-toast";
// import { Provider } from "react-redux";
// import store from './redux/store';
// import { PersistGate } from 'redux-persist/integration/react'
// import { persistStore } from 'redux-persist';

// let persistor = persistStore(store);

// export const BASE_URL="http://localhost:8080"

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <App />
//         <Toaster />
//       </PersistGate>
//     </Provider>
//   </React.StrictMode>
// );



import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store'; // 👈 IMPORT BOTH
import { SocketProvider } from './context/SocketContext';
import { PersistGate } from 'redux-persist/integration/react'; // 👈 IMPORT PersistGate

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}> {/* 👈 WRAP YOUR APP */}
        <SocketProvider>
          <App />
        </SocketProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);