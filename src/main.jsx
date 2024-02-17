import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import productSlice from './redux/reducer.js';
import { createStore } from 'redux'




const store = createStore(productSlice,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <App/>
    </Provider>
  </>,
)
