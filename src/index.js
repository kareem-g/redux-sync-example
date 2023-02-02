/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import {
  createStateSyncMiddleware,
  initStateWithPrevTab
} from "./lib/syncState";

const middlewares = [
  // TOGGLE_TODO will not be triggered
  createStateSyncMiddleware({
    //predicate: action => action.type !== 'TOGGLE_TODO',
  })
];
const store = createStore(rootReducer, {}, applyMiddleware(...middlewares));

initStateWithPrevTab(store);
// initMessageListener(store);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
