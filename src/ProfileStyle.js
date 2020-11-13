import { StyleSheet } from 'react-native';

const primaryColor = '#303F9F'; // dark blue

export default StyleSheet.create({
  page: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  container: {
    height: '50%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  text: {
    textAlign: 'center',
    fontSize: 24
  },
  settingsBtn: {
    width: '50%',
    height: 50,
    backgroundColor: primaryColor,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  settingsText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 24
  }
});
