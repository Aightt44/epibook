import * as React from 'react';
import { Modal, View } from 'react-native';
import PropTypes from 'prop-types';
import LottieView from 'lottie-react-native';

import styles from './styles';

const animationContent = require('../assets/222-trail-loading.json');

export default class Loader extends React.PureComponent {
  componentDidUpdate() {
    const { loading } = this.props;

    if (loading) {
      this.animation.play();
    } else if (this.animation != null) {
      this.animation.stop();
    }
  }

  render() {
    const { loading } = this.props;

    return (
      <Modal transparent animationType="none" visible={loading}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <LottieView
              ref={animation => {
                this.animation = animation;
              }}
              source={animationContent}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

Loader.propTypes = {
  loading: PropTypes.bool.isRequired
};
