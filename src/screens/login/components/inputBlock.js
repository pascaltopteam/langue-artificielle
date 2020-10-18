// Input Block

import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { AvoText } from '../../../components';

import constants from '../../../const';
import { ScrollView } from 'react-native-gesture-handler';

class InputBlock extends React.Component {
	render() {
		const { children, title } = this.props;

		return (
			<View style={styles.container}>
				<ScrollView
					showsVerticalScrollIndicator={false}
					alwaysBounceHorizontal={false}
					keyboardShouldPersistTaps={'handled'}
					bounces={false}
				>
					<AvoText style={styles.title} text={title} fontWeight="museo" />

					{children}
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		borderRadius: 10,
		paddingVertical: 15,
		width:constants.screen.width*0.8,
		alignSelf:'center',
		alignItems: 'center'
	},
	title: {
		color: constants.colors.tint,
		fontSize: constants.sizes.TITLE_SIZE,
		textAlign:'center'
	}
});

InputBlock.propTypes = {
	children: PropTypes.node,
	title: PropTypes.string
};

InputBlock.defaultProps = {
	children: null,
	title: ''
};

export default InputBlock;
