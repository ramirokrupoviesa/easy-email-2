import React from 'react';
import Editor from './pages/Editor';
import { Provider } from 'react-redux';
import store from '@demo/store';

export default function App(props: any) {
  return (
    <Provider store={store}>
      <Editor {...props} />
    </Provider>
  );
}
