import React from 'react';
import { View, StyleSheet, TextInput, Platform, ActivityIndicator } from 'react-native';

import { IconSearch } from '../assets/svg';

import constants from '../const';

class AvoSearch extends React.Component {
	render() {
		const { isWaiting } = this.props;
		return (
			<View style={[styles.container, { ...this.props.style }]}>
				<IconSearch width={15} height={15} />
				<TextInput
					autoFocus
					{...this.props}
					style={styles.input}
					placeholderTextColor={constants.colors.placeholder}
				/>
				{isWaiting && <ActivityIndicator animating color={constants.colors.tint} />}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		...constants.styles.row,
		width: '100%',
		borderRadius: 5,
		backgroundColor: constants.colors.search,
		alignItems: 'center',
		paddingVertical: Platform.OS == 'ios' ? 10 : 0,
		paddingHorizontal: 10,
		marginVertical: 16
	},
	input: {
		fontSize: constants.sizes.INPUT_TXT_SIZE,
		flex: 1,
		fontFamily: 'Gotham-Book',
		paddingHorizontal: 16,
		color: constants.colors.placeholder
	}
});

export default AvoSearch;
