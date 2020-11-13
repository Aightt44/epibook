import { StyleSheet } from 'react-native';

const primaryColor = '#303F9F'; // dark blue
const secondaryColor = '#4FC3F7';

export default StyleSheet.create({
  page: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  container: {
    height: '80%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  photoBtn: {
    width: '50%',
    height: 50,
    backgroundColor: secondaryColor,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  photoText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 24
  },
  postBtn: {
    width: '50%',
    height: 50,
    backgroundColor: primaryColor,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  postText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 24
  },
  inputView: {
    width: '80%',
    backgroundColor: '#EEEEEE',
    height: 50,
    marginBottom: 20,
    justifyContent: 'center'
  },
  errorText: {
    color: 'red',
    fontSize: 15
  }
});
