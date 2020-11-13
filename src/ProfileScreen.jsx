import React from 'react';
import { Avatar } from 'react-native-elements';
import { Text, TouchableOpacity, View } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

import ModalDefault from './modalDefault';
import ChooseImage from './chooseImage';
import styles from './ProfileStyle';
import { updatePhotoAction } from './actions/user';
import Loader from './Loader';

class ProfileScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { showChooseImage: false, loading: false, showModal: false };
  }

  render() {
    const { navigation, user, updatePhoto } = this.props;
    const { showChooseImage, loading, showModal } = this.state;

    return (
      <View style={styles.page}>
        <Loader loading={loading} />
        <ChooseImage
          visible={showChooseImage}
          onCancel={() => {
            this.setState({
              showChooseImage: false
            });
          }}
          onImageChosen={async uri => {
            this.setState({
              loading: true
            });

            const response = await fetch(uri);
            const blob = await response.blob();

            const ref = firebase
              .storage()
              .ref()
              .child(`${firebase.auth().currentUser.uid}/profilePicture`);

            const uploadTask = ref.put(blob);
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, {
              complete: () => {
                const url = `https://firebasestorage.googleapis.com/v0/b/react-68bd4.appspot.com/o/${
                  firebase.auth().currentUser.uid
                }%2FprofilePicture?alt=media&random_number=${new Date().getTime()}`;
                firebase.auth().currentUser.updateProfile({
                  photoURL: url
                });
                updatePhoto(url);
                this.setState({
                  showChooseImage: false,
                  loading: false
                });
              }
            });
          }}
        />
        <View style={styles.container}>
          <Avatar
            title={user.firstname}
            source={{
              uri: user.photo,
              cache: 'reload'
            }}
            showEditButton
            rounded
            size="xlarge"
            editButton={{
              underlayColor: 'transparent',
              onPress: () => {
                this.setState({
                  showChooseImage: true
                });
              }
            }}
          />
          <Text style={styles.text}>
            {user.firstname}
            {'\t'}
            {'\t'}
            {user.lastname}
          </Text>
          <Text style={styles.text}>{user.email}</Text>
          <TouchableOpacity
            style={styles.settingsBtn}
            onPress={() => {
              this.setState({
                showModal: true
              });
            }}
          >
            <Text style={styles.settingsText}>Logout</Text>
          </TouchableOpacity>
          <ModalDefault
            visible={showModal}
            message="Are you sure ?"
            onCancel={() => {
              this.setState({
                showModal: false
              });
            }}
            onValidate={() => {
              firebase
                .auth()
                .signOut()
                .then(() => {
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{ name: 'Login' }]
                    })
                  );
                });
            }}
          />
        </View>
      </View>
    );
  }
}

ProfileScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
  }).isRequired,
  user: PropTypes.shape({
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired
  }).isRequired,
  updatePhoto: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updatePhoto: updatePhotoAction }, dispatch);
};

const mapStateToProps = state => {
  return { user: state.user.infos };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
