// App Text Component

import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { AvoText } from './';
import { IconSqureChecked, IconSqureUnchecked } from '../assets/svg';
import constants from '../const';

class AvoSqureCheck extends React.Component {
	render() {
		return (
			<TouchableOpacity onPress={this.props.onPress} style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', ...this.props.style }}>
				{this.props.isChecked ? <IconSqureChecked /> : <IconSqureUnchecked />}
				<AvoText style={{ fontSize: constants.sizes.TXT_SIZE, marginLeft: 10 }} fontWeight="normal" text={this.props.text} />
			</TouchableOpacity>
		);
	}
}

export default AvoSqureCheck;
