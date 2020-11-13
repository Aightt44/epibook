import * as React from 'react';
import { TouchableOpacity, View, Text, Image, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';

import ModalDefault from './modalDefault';
import styles from './MyPostsStyle';

export default class MyPostsScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      refreshing: false,
      showModal: false,
      idSelected: null
    };
    this.getData();
  }

  async getData() {
    const resultArray = [];
    const datadb = await firebase
      .database()
      .ref(`posts/${firebase.auth().currentUser.uid}`)
      .once('value');

    if (datadb.val() === null) {
      this.setState({
        posts: resultArray,
        refreshing: false
      });
      return;
    }

    const poststmp = Object.entries(datadb.val());
    poststmp.forEach(post => {
      const tmp = post[0];
      const tmppost = post[1];
      tmppost.id = tmp;
      resultArray.push(tmppost);
    });

    this.setState({
      posts: resultArray,
      refreshing: false
    });
  }

  handleRefresh() {
    this.setState(
      {
        refreshing: true
      },
      () => {
        this.getData();
      }
    );
  }

  async deletePost(id) {
    await firebase
      .database()
      .ref(`posts/${firebase.auth().currentUser.uid}/${id}`)
      .remove();
    this.getData();
  }

  render() {
    const { navigation } = this.props;
    const { posts, refreshing, showModal } = this.state;

    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <FlatList
            style={styles.list}
            contentContainerStyle={styles.listContent}
            data={posts}
            onRefresh={() => {
              this.handleRefresh();
            }}
            refreshing={refreshing}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Card title={item.title} containerStyle={styles.card}>
                <View style={styles.cardContent}>
                  <Text style={styles.cardText}>{item.content}</Text>
                </View>
                {item.photoUrl !== '' ? (
                  <View style={styles.cardContent}>
                    <Image
                      style={{ width: '100%', minHeight: 200, resizeMode: 'contain' }}
                      source={{ uri: item.photoUrl }}
                    />
                  </View>
                ) : null}
                <View style={styles.bottomBtn}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        showModal: true,
                        idSelected: item.id
                      });
                    }}
                  >
                    <Icon color="red" name="delete" />
                  </TouchableOpacity>
                </View>
              </Card>
            )}
          />
          <ModalDefault
            visible={showModal}
            message="Are you sure you want to delete this post ?"
            onCancel={() => {
              this.setState({
                showModal: false
              });
            }}
            onValidate={() => {
              const { idSelected } = this.state;

              this.deletePost(idSelected);
              this.setState({
                showModal: false
              });
            }}
          />
          <TouchableOpacity style={styles.postBtn} onPress={() => navigation.navigate('Post')}>
            <Text style={styles.profileText}>Post !</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

MyPostsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};
