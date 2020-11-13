import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';

import Loader from './Loader';

import styles from './styles';

export default class SignupScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      lastname: '',
      firstname: '',
      loading: false,
      errorText: ''
    };
  }

  onSubmit() {
    const { email, password, lastname, firstname, passwordConfirm } = this.state;

    this.setState({
      errorText: '',
      loading: true
    });

    if (lastname.length === 0) {
      this.setState({
        errorText: 'Lastname is empty',
        loading: false
      });
      return;
    }

    if (firstname.length === 0) {
      this.setState({
        errorText: 'Firstname is empty',
        loading: false
      });
      return;
    }

    if (password !== passwordConfirm) {
      this.setState({
        errorText: "Passwords don't match",
        loading: false
      });
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        firebase
          .database()
          .ref(`users/${user.user.uid}`)
          .set({
            firstname,
            lastname
          });
      })
      .catch(error => {
        this.setState({
          loading: false
        });

        if (error.message.indexOf('network error') !== -1) {
          this.setState({ errorText: 'Error network' });
        } else {
          this.setState({ errorText: error.message });
        }
      });
  }

  render() {
    const { errorText, loading } = this.state;

    return (
      <View style={styles.container}>
        <Loader loading={loading} />
        <Text style={styles.title}>Sign up</Text>
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
        <View style={styles.inputView}>
          <Input
            secureTextEntry
            placeholder="Confirm password..."
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({ passwordConfirm: text })}
          />
        </View>
        <View style={styles.inputView}>
          <Input
            placeholder="Firstname"
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({ firstname: text })}
          />
        </View>
        <View style={styles.inputView}>
          <Input
            placeholder="Lastname"
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({ lastname: text })}
          />
        </View>
        <Text style={styles.error}>{errorText}</Text>
        <TouchableOpacity
          onPress={() => {
            this.onSubmit();
          }}
          style={styles.button}
        >
          <Text style={styles.loginText}>SIGNUP</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

SignupScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
  }).isRequired
};
