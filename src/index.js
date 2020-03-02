import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import { Provider } from 'react-redux';
import { compose ,createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";

import reducer from './reducer';
const composeEnhancer = compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f);

const store = createStore(reducer, composeEnhancer);

const rootElement = document.getElementById("root");


ReactDOM.render(<Provider store={store}><App /></Provider>, rootElement);
