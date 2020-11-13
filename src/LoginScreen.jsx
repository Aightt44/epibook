import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';

import styles from './styles';

import Loader from './Loader';

export default class LoginScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', errorText: '', loading: false };
  }

  async onSubmit() {
    const { email, password } = this.state;

    this.setState({
      errorText: '',
      loading: true
    });

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.setState({
          loading: false
        });

        if (error.message.indexOf('network error') !== -1) {
          this.setState({ errorText: 'Error network' });
        } else {
          this.setState({ errorText: 'Invalid email or password' });
        }
      });
  }

  render() {
    const { errorText, loading } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Loader loading={loading} />
        <Text style={styles.title}>Log in</Text>
        <View style={styles.inputView}>
          <Input
            placeholder="email@address.com"
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({ email: text })}
          />
        </View>
        <View style={styles.inputView}>
          <Input
            secureTextEntry
            placeholder="Password..."
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({ password: text })}
          />
        </View>
        <Text style={styles.error}>{errorText}</Text>
        <TouchableOpacity
          onPress={() => {
            this.onSubmit();
          }}
          style={styles.button}
        >
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SignUp');
          }}
        >
          <Text style={styles.signupText}>Signup</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

LoginScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};
