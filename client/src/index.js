import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import configureStore from "./store";
import NotFound from "./components/NotFound";

import "antd/dist/antd.css";
// import * as serviceWorker from './serviceWorker';

const store = configureStore();

ReactDOM.render(
  <BrowserRouter forceRefresh={window.innerWidth < 768}>
    <Switch>
      <Route
        path="/"
        component={props => (
          <Provider store={store}>
            <App {...props} />
          </Provider>
        )}
      />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
