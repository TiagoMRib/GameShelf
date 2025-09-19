import { StyleSheet } from 'react-native';

export const gameCardStyles = StyleSheet.create({
	card: {
		flex: 1,
		margin: 4,
		backgroundColor: '#fff',
		borderRadius: 8,
		overflow: 'hidden',
		alignItems: 'center',
		elevation: 2,
		minWidth: 100,
		maxWidth: 140,
	},
	image: {
		width: 120,
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
	},
	release: {
		fontSize: 12,
		color: '#666',
		marginBottom: 6,
		marginTop: 2,
	},
});
