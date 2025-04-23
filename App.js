import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store'; // Ensure this is the correct path
import RestoreUser from './src/components/RestoreUser';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <RestoreUser />
      <AppNavigator />
    </Provider>
  );
};

export default App;

