import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import ErrorBoundary from './utils/ErrorBoundary';
import {store} from './store/store';
import {Provider} from 'react-redux';
import {checkUser} from './store/userSlice';
import {onLogin,setIsUserCheckedTrue} from './store/appSlice';

const root = ReactDOM.createRoot(document.getElementById('root'));

// when setting the store, we check if the browser has a cookie with the user's token
// if yes, we set the user is checked to true
store.dispatch(checkUser()).unwrap()
  .then(()=>{
    store.dispatch(onLogin());
  })
  .catch(()=>{
    store.dispatch(setIsUserCheckedTrue());
  });

root.render(<React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      {/*<ErrorBoundary fallback={<div>*/}
      {/*  <h1>Something went wrong.</h1>*/}
      {/*</div>}>*/}
        <App/>
      {/*</ErrorBoundary>*/}
    </BrowserRouter>
  </Provider>
</React.StrictMode>);
reportWebVitals();
