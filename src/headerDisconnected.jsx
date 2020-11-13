import * as React from 'react';
import { Header } from 'react-native-elements';
import PropTypes from 'prop-types';
import styles from './styles';

export default function HeaderDisconnected({ previous, navigation }) {
  return (
    <Header
      leftComponent={
        previous ? { icon: 'arrow-back', color: '#fff', onPress: navigation.goBack } : undefined
      }
      centerComponent={{ text: 'EPIBOOK', style: { color: '#fff' } }}
      containerStyle={styles.headerContainer}
    />
  );
}

HeaderDisconnected.propTypes = {
  previous: PropTypes.shape.isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired
  }).isRequired
};
