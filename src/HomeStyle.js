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
    height: '80%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  list: {
    height: '100%',
    width: '100%'
  },
  listContent: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    minWidth: 300,
    minHeight: 100
  },
  cardContent: {
    backgroundColor: 'white'
  },
  cardText: {
    color: 'black',
    fontSize: 20
  },
  profileBtn: {
    width: '50%',
    height: 50,
    backgroundColor: primaryColor,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10
  },
  profileText: {
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
    marginTop: 20,
    marginBottom: 10
  },
  postText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 24
  },
  bottomBtn: {
    flexDirection: 'row-reverse'
  }
});
