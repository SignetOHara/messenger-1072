import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { CloudinaryContext } from 'cloudinary-react';

import { theme } from './themes/theme';
import Routes from './routes';

function App() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <CloudinaryContext cloudName="dco37iiel" secure="true" upload_preset="upload">
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </CloudinaryContext>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
