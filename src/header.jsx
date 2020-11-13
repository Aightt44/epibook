import * as React from 'react';
import { Header, Avatar } from 'react-native-elements';
import { CommonActions } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './styles';

function MyHeader({ previous, navigation, user }) {
  return (
    <Header
      leftComponent={
        previous ? { icon: 'arrow-back', color: '#fff', onPress: navigation.goBack } : undefined
      }
      centerComponent={{
        text: 'EPIBOOK',
        style: { color: '#fff' },
        onPress: () => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Home' }]
            })
          );
        }
      }}
      rightComponent={() => {
        return (
          <Avatar
            rounded
            source={{ uri: user != null ? user.photo : null }}
            onPress={() => navigation.navigate('Profile')}
          />
        );
      }}
      containerStyle={styles.headerContainer}
    />
  );
}

MyHeader.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
  }).isRequired,
  user: PropTypes.shape({
    photo: PropTypes.string
  }),
  previous: PropTypes.func
};

MyHeader.defaultProps = {
  previous: null,
  user: null
};

const mapStateToProps = state => {
  return { user: state.user.infos };
};

const MyHeaderConnect = connect(mapStateToProps, null)(MyHeader);

export default function MyHeaderFunction({ previous, navigation }) {
  return <MyHeaderConnect previous={previous} navigation={navigation} />;
}

MyHeaderFunction.propTypes = {
  navigation: PropTypes.shape.isRequired,
  previous: PropTypes.shape.isRequired
};
