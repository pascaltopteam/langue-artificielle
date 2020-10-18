// Avocadoo Button

import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, View } from 'react-native';

import constants from '../const';

class AvoButton extends React.Component {
	render() {
		const { style, title, isNegative, isLoading, onPress, txtStyle, iconBtn } = this.props;
		
		return (
			<TouchableOpacity
				{...this.props}
				style={[
					styles.button,
					{
						shadowColor: isNegative ? 'rgba(0,0,0,0)' : constants.colors.tint,
						backgroundColor: isNegative ? constants.colors.bg : constants.colors.tint,
						borderColor: isNegative ? constants.colors.borderColor : constants.colors.tint,
						...style
					}
				]}
				activeOpacity={0.8}
				onPress={onPress}
			>
				{
					isLoading ?
						<ActivityIndicator animating color="white" />
				  	:
						<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
							{iconBtn && iconBtn}
							<Text
								style={[
									styles.text,
									{ color: isNegative ? constants.colors.tint : 'white' },
									txtStyle
								]}
							>
								{title}
							</Text>
						</View>
				}
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 5,
		paddingHorizontal: 5,
		borderWidth: 1,
		shadowColor: constants.colors.tint,
		shadowOpacity: 0.5,
		shadowOffset: {
			x: 0,
			y: 5
		},
		shadowRadius: 5,
		borderRadius: 5,
		height: 46
	},
	text: {
		fontFamily: 'Gotham-Light',
		marginBottom: 0,
		fontSize: 16,//constants.sizes.BTN_TXT_SIZE,
		color: 'white'
	}
});

AvoButton.propTypes = {
	style: PropTypes.object,
	onPress: PropTypes.func,
	title: PropTypes.string,
	isNegative: PropTypes.bool,
	isLoading: PropTypes.bool
};

AvoButton.defaultProps = {
	title: '',
	isNegative: false,
	isLoading: false
};

export default AvoButton;
