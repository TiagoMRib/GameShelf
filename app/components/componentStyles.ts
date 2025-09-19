import { Dimensions, StyleSheet } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
export const gameCardWidth = SCREEN_WIDTH * 0.3;

export const gameCardStyles = StyleSheet.create({
	card: {
		margin: 4,
		backgroundColor: '#fff',
		borderRadius: 8,
		overflow: 'hidden',
		alignItems: 'center',
		elevation: 2,
		width: gameCardWidth,
		height: 160, // fixed height for all cards
		flexDirection: 'column',
		justifyContent: 'flex-start',
	},
	image: {
		width: gameCardWidth,
		height: 70,
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
		backgroundColor: '#eee',
	},
	title: {
		fontWeight: 'bold',
		fontSize: 14,
		marginTop: 6,
		textAlign: 'center',
		paddingHorizontal: 4,
		maxWidth: gameCardWidth - 8,
		maxHeight: 36,
	},
	release: {
		fontSize: 12,
		color: '#666',
		marginBottom: 6,
		marginTop: 2,
	},
});
