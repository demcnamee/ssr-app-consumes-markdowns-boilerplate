import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';

import configureStore from '../redux/configureStore';
import Post from '../sections/Post';

const srrComponent = (initialState, contentComponent) => {
  // init our redux store
  const store = configureStore(initialState);

  // render our app content and returns a HTML string
  let appContent = renderToString(
    <Provider store={store}>
      <Post content={contentComponent} />
    </Provider>
  );

  const preloadedState = store.getState();
  return {
    appContent,
    preloadedState,
  };
};

export default srrComponent;
