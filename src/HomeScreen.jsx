import * as React from 'react';
import { TouchableOpacity, View, Text, Image, FlatList } from 'react-native';
import { Card } from 'react-native-elements';
import PropTypes from 'prop-types';

import * as firebase from 'firebase';
import styles from './HomeStyle';

export default class HomeScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      refreshing: false
    };
    this.getData();
  }

  async getData() {
    const postArray = [];
    const resultArray = [];
    const datadb = await firebase
      .database()
      .ref(`posts`)
      .once('value');
    if (datadb.val() === null) {
      this.setState({
        posts: resultArray,
        refreshing: false
      });
      return;
    }
    const poststmp = Object.entries(datadb.val());
    poststmp.forEach(user => {
      const tmp = user[0];
      Object.getOwnPropertyNames(user[1]).forEach(key => {
        const postFound = user[1][key];
        postFound.author = tmp;
        postArray.push(postFound);
      });
    });

    const datadb2 = await firebase
      .database()
      .ref(`users`)
      .once('value');
    if (datadb2.val() === null) {
      this.setState({
        posts: resultArray,
        refreshing: false
      });
      return;
    }
    const userstmp = Object.entries(datadb2.val());
    postArray.forEach(post => {
      const tmp = post;
      tmp.authorName = 'undefined';
      userstmp.forEach(user => {
        if (post.author === user[0]) tmp.authorName = `${user[1].firstname} ${user[1].lastname}`;
      });
      resultArray.push(tmp);
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

  render() {
    const { navigation } = this.props;
    const { posts } = this.state;
    const { refreshing } = this.state;

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
                <View>
                  <Text>
                    {'By : '}
                    {item.authorName}
                  </Text>
                </View>
              </Card>
            )}
          />
          <TouchableOpacity style={styles.postBtn} onPress={() => navigation.navigate('MyPosts')}>
            <Text style={styles.profileText}>My posts</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};
