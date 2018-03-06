
import React from 'react';
import ReactDOM from 'react-dom';
import mobx, { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import { AppContainer } from 'react-hot-loader';
import App from './components/app';
import Store from './stores';

useStrict(true);

const rootEl = document.getElementById('root');

let store;

const electron = window.require('electron');
const { ipcRenderer } = electron;

const renderApp = () => {
  if (store) {
    console.log('Last Store Version:', store.version);
    console.log('Last Ping:', store.dateLastPinged);
  }
  const render = Component => {
    ReactDOM.render(
      <AppContainer>
        <Provider
          store={store}
          api={store.api}
          config={store.config}
          profileStore={store.profileStore}
        >
          <Component />
        </Provider>
      </AppContainer>,
      rootEl
    );
  };

  render(App);

  // if any exception happens in non-byo mode, code beyond this point won't get executed

  if (process.env.NODE_ENV === 'development') {
    // Hot Module Replacement API
    if (module.hot) {
      module.hot.accept('./components/App', () => {
        render(App);
      });
    }

    // developers should see the red screen of death ASAP
    if (IS_ELECTRON) {
      ipcRenderer.send(EventType.APP_READY);
    }
  }
};

store = new Store();
window.store = store;
window.mobx = mobx;
