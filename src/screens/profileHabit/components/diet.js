// Diet component

import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import PropTypes from 'prop-types';

import { AvoText } from '../../../components';
import { IconRectCheck, IconRect } from '../../../assets/svg';

import constants from '../../../const';

class Diet extends React.Component {
	renderItem = (value, index) => {
		const { isCheck, title, key } = value;

		return (
			<TouchableOpacity
				onPress={() => this.props.onPress(value, index)}
				key={index}
				style={[constants.styles.row, { alignItems: 'center', marginBottom: 26 }]}
			>
				<View
					style={{
						padding: 7,
						backgroundColor: isCheck ? constants.colors.tint : constants.colors.grey,
						borderRadius: 20
					}}
				>
					<Image
						resizeMode={'contain'}
						source={this.getImageFromKey(key)}
						style={{ width: constants.screen.width * 0.06, height: constants.screen.width * 0.06 }}
					/>
				</View>
				<AvoText style={styles.item} text={title} />
			</TouchableOpacity>
		);
	};
	getImageFromKey = (key) => {
		if (key.toString().toLowerCase() == 'omnivore') {
			return require('../../../assets/png/omni.png');
		} else if (key.toString().toLowerCase() == 'pescetarian') {
			return require('../../../assets/png/pesc.png');
		} else if (key.toString().toLowerCase() == 'vegan') {
			return require('../../../assets/png/vegan.png');
		} else if (key.toString().toLowerCase() == 'vegetarian') {
			return require('../../../assets/png/veg.png');
		} else {
			return require('../../../assets/png/omni.png');
		}
	};
	render() {
		const { food } = this.props;

		return (
			<View style={styles.container}>
				<AvoText style={styles.title} fontWeight="bold" text={`T'es plutôt ...`} />
				<ScrollView showsVerticalScrollIndicator={false}>
					{food.map((value, index) => this.renderItem(value, index))}
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '90%'
	},
	title: {
		fontSize: constants.sizes.TXT_SIZE,
		marginBottom: 26
	},
	item: {
		marginLeft: 10,
		fontSize: constants.sizes.TXT_SIZE
	}
});

Diet.propTypes = {
	food: PropTypes.array
};

Diet.defaultProps = {};

export default Diet;
