import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
  iconSmall: {
    width: 18,
    height: 18,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 10,
    letterSpacing: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#444',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  gameGrid: {
    paddingHorizontal: 5,
    paddingBottom: 20,
  },
  gameGridColumn: {
    justifyContent: 'space-evenly',
    paddingHorizontal: 5,
    marginBottom: 15,
  },
});