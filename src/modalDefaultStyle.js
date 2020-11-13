import { StyleSheet } from 'react-native';

const backgroungColor = '#FFFFFF';
const primaryColor = '#303F9F';

export default StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  popupContainer: {
    height: '25%',
    width: '75%',
    borderRadius: 10,
    backgroundColor: backgroungColor,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  BtnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  BtnCancel: {
    width: '30%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'red',
    alignItems: 'center'
  },
  BtnValidate: {
    width: '30%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: primaryColor,
    alignItems: 'center'
  },
  CancelText: {
    color: 'white'
  },
  ValidateText: {
    color: 'white'
  }
});
