// Subject component

import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import { IconComment } from '../../../assets/svg';

import constants from '../../../const';

class Message extends React.Component {
	render() {
		return (
			<View
				onTouchStart={() => {
					this.txtRef.focus();
				}}
				style={styles.container}
			>
				<IconComment
					style={{ marginTop: 15 }}
					width={constants.screen.width * 0.06}
					height={constants.screen.width * 0.06}
				/>

				<TextInput
					ref={(ref) => (this.txtRef = ref)}
					multiline
					{...this.props}
					style={styles.input}
					placeholder="Message"
					placeholderTextColor="black"
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		flexDirection: 'row',
		height: constants.screen.height * 0.4,
		borderRadius: 5,
		backgroundColor: constants.colors.search,
		paddingHorizontal: 15,

		alignItems: 'flex-start',
		marginTop: 20
	},
	input: {
		flex: 1,
		fontFamily: 'Gotham-Book',
		maxHeight: constants.screen.height * 0.4,
		fontSize: constants.sizes.INPUT_TXT_SIZE,
		paddingHorizontal: 16,
		marginVertical: Platform.OS == 'android' ? 0 : 10
	}
});

export default Message;
