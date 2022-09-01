import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { composeWithDevTools } from "redux-devtools-extension";

/* Redux Store */
import { Provider } from "react-redux"
import { createStore } from "redux";
import  rootReducers  from "./services/Reducers/index";

let store = createStore(rootReducers,composeWithDevTools());

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

