import React from 'react';
import { View, ImageBackground } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';

import { setUserInfosAction } from './actions/user';
import PushNotification from './pushNotification';
import styles from './styles';

const imageBackground = require('../assets/splash.png');

class LoadingScreen extends React.PureComponent {
  componentDidMount() {
    const { navigation, setUserInfos } = this.props;

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        PushNotification.register();

        setUserInfos();

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' }]
          })
        );
      } else {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Login' }]
          })
        );
      }
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground source={imageBackground} style={styles.loadingScreen} />
      </View>
    );
  }
}

LoadingScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
  }).isRequired,
  setUserInfos: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ setUserInfos: setUserInfosAction }, dispatch);
};

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen);
