import React, { useState, useEffect } from 'react';

import * as Font from 'expo-font';

// Redux packages
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

// Redux Store
import contentReducer from './store/reducers/content';
import genresReducer from './store/reducers/genres';

// Navigator
import Navigator from './navigation/Navigator';

import { useScreens } from 'react-native-screens';
useScreens();

console.disableYellowBox = true;

// Combined root reducer
const rootReducer = combineReducers({
  content: contentReducer,
  genres: genresReducer
});

// Redux Store
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {

  // Upload fonts
  const [dataLoaded, setDataLoaded] = useState(false);
  
  useEffect(() => {
    // Load new fonts
    const fetchFonts = async () => {
      return await Font.loadAsync({
        'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'roboto-medium': require('./assets/fonts/Roboto-Medium.ttf'),
        'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
        'roboto-light-italic': require('./assets/fonts/Roboto-LightItalic.ttf'),
      }).then(() => setDataLoaded(true));
    };
    fetchFonts();
  }, [setDataLoaded]);

  return (
    <Provider store={store}>
        {dataLoaded && <Navigator />}
    </Provider>
  );

}
