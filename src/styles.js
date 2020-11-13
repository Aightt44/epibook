import { StyleSheet } from 'react-native';

const primaryCOlor = '#303F9F';
const secondaryColor = '#4FC3F7';
const backgroungColor = '#FFFFFF';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroungColor,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 50,
    color: primaryCOlor,
    marginBottom: 40
  },
  inputView: {
    width: '80%',
    backgroundColor: '#EEEEEE',
    height: 50,
    marginBottom: 20,
    justifyContent: 'center'
  },
  error: {
    color: 'red',
    fontSize: 15
  },
  button: {
    width: '80%',
    backgroundColor: primaryCOlor,
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10
  },
  loginText: {
    color: 'white'
  },
  signupText: {
    color: secondaryColor
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    height: 200,
    width: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  popupContainer: {
    height: 250,
    width: 250,
    borderRadius: 10,
    backgroundColor: backgroungColor,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  buttonPopup: {
    width: '80%',
    backgroundColor: primaryCOlor,
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 5
  },
  headerContainer: {
    backgroundColor: primaryCOlor
  },
  loadingScreen: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  }
});
