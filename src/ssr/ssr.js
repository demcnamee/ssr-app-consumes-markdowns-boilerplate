import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';

import configureStore from '../redux/configureStore';
import App from '../components/app';
import Home from '../sections/Home';

/*
  creates the preloaded state from the Redux store
  
  renders the content that will be injected to the html file
  in the server side, to be sent to the client
*/
const srr = initialState => {
  // init our redux store
  const store = configureStore(initialState);

  // render our app content and returns a HTML string
  let appContent = renderToString(
    <Provider store={store}>
      <Home />
    </Provider>
  );

  const preloadedState = store.getState();
  return {
    appContent,
    preloadedState,
  };
};

export default srr;
