import {createStackNavigator} from 'react-navigation'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/Login'
import Register from '../pages/Register'
import VideoPage from '../pages/VideoPage'

export const AppStackNavigator = createStackNavigator({
    LoginPage: {
        screen: LoginPage,
        navigationOptins: {
            title: 'Login',
            headerTitle: 'Tracking it',
            headerBackTitle: 'Log out'
        }
    },
    Register: {
        screen: Register,
        navigationOptins: {
            title: 'Register',
            headerTitle: 'Tracking it'
        }
    },
    HomePage: {
        screen: HomePage,
        navigationOptins: {
            title: 'HomePage',
            headerTitle: 'Tracking it'
        }
    },
    VideoPage: {
        screen: VideoPage,
        navigationOptins: {
            title: 'VideoPage',
            headerTitle: 'Tracking it'
        }
    }
})