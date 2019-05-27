/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {createAppContainer} from 'react-navigation'
import {AppStackNavigator} from './navigators/Appnavigators'
import {name as appName} from './app.json';
const AppStackNavigatorContainer = createAppContainer(AppStackNavigator);

AppRegistry.registerComponent(appName, () => AppStackNavigatorContainer);
