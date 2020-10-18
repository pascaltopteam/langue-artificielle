// Dots

import React from 'react';
import { View, StyleSheet } from 'react-native';

import constants from '../../const';

const Dots = ({ index = 0 }) => {
	return (
		<View style={styles.container}>
			{index == 0 ? <ActiveDot /> : <Dot />}
			{index == 1 ? <ActiveDot /> : <Dot />}
			{index == 2 ? <ActiveDot /> : <Dot />}
			{index == 3 ? <ActiveDot /> : <Dot />}
		</View>
	);
};

const Dot = () => {
	return <View style={styles.circle} />;
};

const ActiveDot = () => {
	return <View style={styles.bigCircle} />;
};

const styles = StyleSheet.create({
	container: {
		width: 70,
		height: 17,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	circle: {
		width: constants.screen.width*0.02,
		height: constants.screen.width*0.02,
		borderRadius: 10,
		backgroundColor: constants.colors.tint50
	},
	bigCircle: {
		width: constants.screen.width*0.04,
		height: constants.screen.width*0.04,
		borderRadius: 20,
		backgroundColor: constants.colors.tint,
		shadowColor: constants.colors.tint,
		shadowOffset: {
			x: 0,
			y: 3
		},
		shadowRadius: 3,
		shadowOpacity: 0.5
	}
});

export default Dots;
