// App Text Component

import React from 'react';
import PropTypes from 'prop-types';
import { Text, Platform } from 'react-native';

class AvoText extends React.Component {
	getFontWeight = (weight = 'normal') => {
		switch (weight) {
			case 'normal':
				return 'Gotham-Book';
			case 'bold':
				return 'Gotham-Medium';
			case 'light':
				return 'Gotham-Light';
			case 'museo':
				return Platform.OS == 'ios' ? 'Museo-700' : 'Museo700-regular';
			default:
				return 'Gotham-Book';
		}
	};

	render() {
		const { style, fontWeight, text, children } = this.props;
		const fontFamily = this.getFontWeight(fontWeight);
		//const marginBottom = Platform.OS=='ios'?-3:0;

		return (
			<Text
				{...this.props}
				style={[{ fontFamily }, style]}
			>
				{text}
				{children}
			</Text>
		);
	}
}

AvoText.propTypes = {
	style: PropTypes.object,
	fontWeight: PropTypes.string,
	text: PropTypes.string
};

AvoText.defaultProps = {
	fontWeight: 'normal',
	text: ''
};

export default AvoText;
