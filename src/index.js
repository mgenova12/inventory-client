import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

import store from "./store";
import Routes from "./components";

const client = new ApolloClient({
  uri: `${process.env.REACT_APP_API_URL}graphql`
});

const App = (
    <Provider store={store}>
	  <ApolloProvider client={client}>
	      <Routes />
	  </ApolloProvider>
    </Provider>
);

ReactDOM.render(App, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
