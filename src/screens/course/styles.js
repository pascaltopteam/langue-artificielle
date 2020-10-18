// Styles

import { StyleSheet } from 'react-native';
import constants from '../../const';

const styles = StyleSheet.create({
	container: {
		width: constants.screen.width * 0.9,
		alignSelf: 'center',
		paddingVertical: 20
	},
	borderLine: {
		borderBottomColor: constants.colors.separator,
		borderBottomWidth: 1,
		marginTop: 5,
		marginBottom: 10
	},
	title: {
		fontSize: constants.sizes.TXT_SIZE,
		marginBottom: 16
	},
	item: {
		marginBottom: 24,
		alignItems: 'center',
		alignSelf: 'center',
		width: '90%'
	},
	itemTitle: {
		flex: 1,
		marginLeft: 10,
		fontSize: 14, //constants.sizes.TXT_SIZE
	},
	itemStrokeTitle: {
		flex: 1,
		marginLeft: 10,
		fontSize: 14, //constants.sizes.TXT_SIZE,
		textDecorationLine: 'line-through'
	},
	itemValue: {
		fontSize: 14, //constants.sizes.TXT_SIZE,
		color: constants.colors.placeholder
	},
	orderButton: {
		width: '90%',
		marginVertical: 30,
		alignSelf: 'center'
	}
});

export default styles;
