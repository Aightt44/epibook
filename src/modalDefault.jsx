import * as React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import styles from './modalDefaultStyle';

export default function ModalDefault({ visible, message, onCancel, onValidate }) {
  return (
    <Modal transparent animationType="none" visible={visible}>
      <View style={styles.modalBackground}>
        <View style={styles.popupContainer}>
          <View>
            <Text>{message}</Text>
          </View>
          <View style={styles.BtnContainer}>
            <TouchableOpacity
              style={styles.BtnCancel}
              onPress={() => {
                onCancel();
              }}
            >
              <Text style={styles.CancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.BtnValidate}
              onPress={() => {
                onValidate();
              }}
            >
              <Text style={styles.ValidateText}>Validate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

ModalDefault.propTypes = {
  visible: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onValidate: PropTypes.func.isRequired
};
