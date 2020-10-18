// Avocadoo TextInput

import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';

import { IconMail, IconLock, IconVisible, IconPerson } from '../assets/svg';

import constants from '../const';

class AvoTextInput extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			secureTextEntry: false
		};
	}

	componentDidMount() {
		const { type } = this.props;

		if (type == 'password') {
			this.setState({ secureTextEntry: true });
		}
	}

	onBtnVisible = () => {
		const { secureTextEntry } = this.state;
		this.setState({ secureTextEntry: !secureTextEntry });
	};

	renderHeaderIcon = (type) => {
		if (type == 'mail') {
			return <IconMail width={16} height={15} />;
		} else if (type == 'password') {
			return <IconLock width={16} height={19} />;
		} else if (type == 'name') {
			return <IconPerson width={16} height={19} />;
		}
		else return
	};

	render() {
		const { secureTextEntry } = this.state;
		const { style, type } = this.props;

		return (
			<View style={[ styles.container, { ...style } ]}>
				{this.renderHeaderIcon(type)}
				<TextInput
					{...this.props}
					style={styles.input}
					placeholderTextColor={constants.colors.placeholder}
					secureTextEntry={type == 'password'?secureTextEntry:false}
					keyboardType={type == 'mail' ? 'email-address' : 'default'}
				/>
				{type == 'password' && (
					<TouchableOpacity
						onPress={() => {
							this.onBtnVisible();
						}}
					>
						<IconVisible width={16} height={13} />
					</TouchableOpacity>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: Platform.OS === 'android' ? 0 : 10,
		paddingHorizontal: 10,
		borderRadius: 5,
		backgroundColor: constants.colors.bg
	},
	input: {
		flex: 1,
		fontSize: constants.sizes.INPUT_TXT_SIZE,
		marginHorizontal: 20,
		fontFamily: 'Gotham-Book'
	}
});

AvoTextInput.propTypes = {
	style: PropTypes.object,
	type: PropTypes.string
};

AvoTextInput.defaultProps = {
	type: 'mail'
};

export default AvoTextInput;
