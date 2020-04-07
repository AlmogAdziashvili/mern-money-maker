import React from 'react';
import { render } from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import configureStore from './modules/configureStore';

// Components
import {
  CssBaseline,
} from '@material-ui/core';
import Homepage from './routes/homepage';
import MainContainer from './components/main_container';
import MainBar from './components/main_bar';
import '@fortawesome/fontawesome-free/js/all';

const store = configureStore();

render(
  <Provider store={store}>
    <CssBaseline />
    <BrowserRouter>
      <MainBar />
      <MainContainer>
        <Route exact path="/" component={Homepage} />
      </MainContainer>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
