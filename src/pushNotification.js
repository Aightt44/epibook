import { Notifications } from 'expo';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';

export default class PushNotification {
  static async register() {
    if (Constants.isDevice) {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

      if (status !== 'granted') {
        return;
      }

      const token = await Notifications.getExpoPushTokenAsync();

      firebase
        .database()
        .ref(`users/${firebase.auth().currentUser.uid}`)
        .update({
          pushToken: token
        });
    }
  }
}
