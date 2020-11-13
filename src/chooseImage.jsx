import * as React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import * as ImagePicker from 'expo-image-picker';

import styles from './styles';

export default function ChooseImage({ visible, onCancel, onImageChosen }) {
  return (
    <Modal transparent animationType="none" visible={visible}>
      <View style={styles.modalBackground}>
        <View style={styles.popupContainer}>
          <TouchableOpacity
            onPress={async () => {
              const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

              if (permissionResult.granted === false) {
                onCancel();
                return;
              }

              const result = await ImagePicker.launchImageLibraryAsync();
              if (result.cancelled) {
                onCancel();
                return;
              }
              onImageChosen(result.uri);
            }}
            style={styles.buttonPopup}
          >
            <Text style={styles.loginText}>From pictures gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              const permissionResult1 = await ImagePicker.requestCameraPermissionsAsync();
              const permissionResult2 = await ImagePicker.requestCameraRollPermissionsAsync();

              if (!permissionResult1.granted || !permissionResult2.granted) {
                onCancel();
                return;
              }

              const result = await ImagePicker.launchCameraAsync();
              if (result.cancelled) {
                onCancel();
                return;
              }
              onImageChosen(result.uri);
            }}
            style={styles.buttonPopup}
          >
            <Text style={styles.loginText}>Take a picture</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onCancel();
            }}
          >
            <Text style={styles.signupText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

ChooseImage.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onImageChosen: PropTypes.func.isRequired
};
