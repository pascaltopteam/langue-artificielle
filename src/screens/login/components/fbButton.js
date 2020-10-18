// Facebook Button

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { AvoText } from '../../../components';
import { IconFacebook } from '../../../assets/svg';

import constants from '../../../const';

class FacebookButton extends React.Component {
	render() {
		return (
			<TouchableOpacity {...this.props} style={[ styles.container, { ...this.props.style } ]}>
				<IconFacebook />
				<AvoText style={styles.title} text="Facebook" />
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		borderRadius: 4,
		borderColor: constants.colors.grey,
		borderWidth: 1,
    paddingVertical: 7,
    paddingHorizontal: 15,
		flexDirection: 'row',
		alignSelf:'center',
		alignItems: 'center'
	},
	wrapper: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	title: {
		fontSize: constants.sizes.TXT_SIZE,
		color: constants.colors.fb,
		marginLeft: 10
	}
});

export default FacebookButton;
