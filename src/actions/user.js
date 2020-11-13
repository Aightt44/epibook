import * as firebase from 'firebase';

export const SET_USER_INFOS = 'SET_USER_INFOS';
export const UPDATE_PHOTO = 'UPDATE_PHOTO';

export function updatePhotoAction(photo) {
  return {
    type: UPDATE_PHOTO,
    photo
  };
}

export function setUserInfosAction() {
  return async dispatch => {
    const datadb = await firebase
      .database()
      .ref(`users/${firebase.auth().currentUser.uid}`)
      .once('value');
    const user = datadb.val();
    user.email = firebase.auth().currentUser.email;
    user.photo = firebase.auth().currentUser.photoURL;
    dispatch({
      type: SET_USER_INFOS,
      infos: user
    });
  };
}
