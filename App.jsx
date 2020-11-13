import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import * as firebase from 'firebase';

import HeaderDisconnected from './src/headerDisconnected';
import Header from './src/header';
import LoginScreen from './src/LoginScreen';
import SignupScreen from './src/SignupScreen';
import HomeScreen from './src/HomeScreen';
import MyPostsScreen from './src/MyPostsScreen';
import ProfileScreen from './src/ProfileScreen';
import PostScreen from './src/PostScreen';
import LoadingScreen from './src/LoadingScreen';

import rootReducer from './src/reducer/index';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

const firebaseConfig = {
  apiKey: 'AIzaSyCVK-QVVSiyaeDA68Bw1mDgVppvV0ly9Ys',
  authDomain: 'react-68bd4.firebase.com',
  databaseURL: 'https://react-68bd4.firebaseio.com/',
  storageBucket: 'gs://react-68bd4.appspot.com'
};

firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator headerMode="screen">
          <Stack.Screen
            name="Loading"
            options={{
              headerShown: false
            }}
            component={LoadingScreen}
          />
          <Stack.Screen
            name="Login"
            options={{
              header: HeaderDisconnected
            }}
            component={LoginScreen}
          />
          <Stack.Screen
            name="SignUp"
            options={{
              header: HeaderDisconnected
            }}
            component={SignupScreen}
          />
          <Stack.Screen
            name="Home"
            options={{
              header: Header
            }}
            component={HomeScreen}
          />
          <Stack.Screen
            name="MyPosts"
            options={{
              header: Header
            }}
            component={MyPostsScreen}
          />
          <Stack.Screen
            name="Profile"
            options={{
              header: Header
            }}
            component={ProfileScreen}
          />
          <Stack.Screen
            name="Post"
            options={{
              header: Header
            }}
            component={PostScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
