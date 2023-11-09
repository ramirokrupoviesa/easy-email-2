import { render } from 'react-dom';
import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';

function render(props) {
  const { container, templateData, type, variables, onChange, height, mediaLibraryRef } =
    props;

  ReactDOM.render(
    <App
      {...{
        templateData,
        type,
        variables,
        height,
        onChange,
        mediaLibraryRef,
      }}
    />,
    container ? container.querySelector('#root') : document.getElementById('root'),
  );
}

renderWithQiankun({
  mount(props) {
    console.log('easyemail mount');
    render(props);
  },
  bootstrap() {
    console.log('bootstrap');
  },
  unmount(props: any) {
    console.log('easyemail unmount');
    const { container } = props;
    const mountRoot = container?.querySelector('#root');
    ReactDOM.unmountComponentAtNode(mountRoot || document.querySelector('#root'));
  },
  update(props: any) {
    console.log('easyemail update');
    render(props);
  },
});

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({});
}
