import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { Input } from 'react-native-elements';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';

import Loader from './Loader';
import ChooseImage from './chooseImage';
import styles from './PostStyle';

export default class PostScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      photoUrl: '',
      errorText: '',
      photoRef: '',
      validPost: false,
      showChooseImage: false,
      loading: false
    };
  }

  componentWillUnmount() {
    const { photoRef, validPost } = this.state;
    if (photoRef !== '' && !validPost) photoRef.delete();
  }

  async onSubmit() {
    const { navigation } = this.props;
    const { title, content, photoUrl } = this.state;

    if (title.length === 0) {
      this.setState({
        errorText: "Title can't be empty"
      });
      return;
    }
    if (content.length === 0) {
      this.setState({
        errorText: "Content can't be empty"
      });
      return;
    }

    const datePost = new Date().getTime();
    firebase
      .database()
      .ref(`posts/${firebase.auth().currentUser.uid}`)
      .push({
        title,
        content,
        datePost,
        photoUrl
      });
    this.setState({
      validPost: true
    });
    navigation.pop();
  }

  render() {
    const { errorText, showChooseImage, loading, photoUrl, photoRef } = this.state;

    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <View style={styles.inputView}>
            <Input
              placeholder="Title"
              placeholderTextColor="#003f5c"
              onChangeText={text => this.setState({ title: text })}
            />
          </View>
          <View style={styles.inputView}>
            <Input
              placeholder="Content"
              placeholderTextColor="#003f5c"
              onChangeText={text => this.setState({ content: text })}
            />
          </View>
          {photoUrl !== '' ? (
            <View style={{ height: 200, width: '100%' }}>
              <Image
                style={{ width: '100%', height: 200, resizeMode: 'contain' }}
                source={{
                  uri: photoUrl
                }}
              />
            </View>
          ) : null}
          <Loader loading={loading} />
          {photoRef !== '' ? (
            <TouchableOpacity
              style={styles.photoBtn}
              onPress={async () => {
                photoRef.delete();
                this.setState({
                  photoUrl: '',
                  photoRef: ''
                });
              }}
            >
              <Text style={styles.photoText}>Remove the photo</Text>
            </TouchableOpacity>
          ) : null}
          {photoUrl === '' ? (
            <TouchableOpacity
              style={styles.photoBtn}
              onPress={() => {
                this.setState({
                  showChooseImage: true
                });
              }}
            >
              <Text style={styles.photoText}>Add a photo</Text>
            </TouchableOpacity>
          ) : null}
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
              const rng = new Date().getTime();

              const ref = firebase
                .storage()
                .ref()
                .child(`${firebase.auth().currentUser.uid}/postPicture/${rng}`);

              const uploadTask = ref.put(blob);
              uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, {
                complete: () => {
                  const url = `https://firebasestorage.googleapis.com/v0/b/react-68bd4.appspot.com/o/${
                    firebase.auth().currentUser.uid
                  }%2FpostPicture%2F${rng}?alt=media`;
                  this.setState({
                    photoUrl: url,
                    photoRef: ref,
                    showChooseImage: false,
                    loading: false
                  });
                }
              });
            }}
          />
          <Text style={styles.errorText}>{errorText}</Text>
          <TouchableOpacity
            style={styles.postBtn}
            onPress={() => {
              this.onSubmit();
            }}
          >
            <Text style={styles.postText}>Post !</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

PostScreen.propTypes = {
  navigation: PropTypes.shape({
    pop: PropTypes.func.isRequired
  }).isRequired
};
