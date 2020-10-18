// Navigation Bar

import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import FastImage from 'react-native-fast-image';

import { IconBack } from '../assets/svg';
import AvoText from './avoText';

import { getStatusBarHeight } from '../Utilities';
import constants from '../const';

const statusHeight =
	Platform.OS == 'ios'
		? constants.isIphoneX ? getStatusBarHeight() * 1.5 + 51 : getStatusBarHeight() / 1.5 + 51
		: getStatusBarHeight() / 2 + 51;

class Header extends React.Component {

	onBtnBack = () => {
		const { navigation, isBackTo, isBackToTop } = this.props;

		if (isBackToTop) {
			navigation.popToTop();
			return;
		}
		
		if (isBackTo == '') {
			navigation.pop();
		} else {
			navigation.pop(isBackTo);
		}
	};

	onBtnProfile = () => {
		const { navigation } = this.props;
		navigation.navigate('ProfileStack');
	};

	componentDidMount = () => {
		const { navigation } = this.props;
		console.debug(navigation);
	};

	render() {
		const { title, isBack, isProfile, isCustom, customImgSource, profileUrl } = this.props;
		var titleVar = title && title.length < 27 ? title : title.substring(0, 24) + '...';
		
		return (
			<View style={styles.container}>
				<View style={styles.bg}>
					<Image style={styles.bgImg} source={require('../assets/png/header.png')} />
				</View>

				<View style={styles.button}>
					{
						isBack &&
							<TouchableOpacity
								activeOpacity={0.8}
								onPress={() => { this.onBtnBack() }}
							>
								<IconBack width={styles.button.width} height={styles.button.height} />
							</TouchableOpacity>
					}
				</View>
				<View style={constants.styles.wrapper} />
				<AvoText style={styles.title} fontWeight="museo" text={titleVar} />
				<View style={constants.styles.wrapper} />
				<View style={styles.button}>
					{
						isProfile && profileUrl ?
							<TouchableOpacity
								activeOpacity={0.8}
								onPress={() => { this.onBtnProfile() }}
							>
								<FastImage source={{ uri: profileUrl }} style={styles.profile} />
							</TouchableOpacity>
					    :
							<TouchableOpacity activeOpacity={0.8} onPress={() => { }} />
					} 
					{
						isCustom &&
							<TouchableOpacity
								activeOpacity={0.8}
								onPress={() => { this.props.onCustomPress() }}
							>
								<Image source={customImgSource} style={styles.profile} />
							</TouchableOpacity>
					}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: statusHeight + 10,
		alignItems: 'center',
		flexDirection: 'row',
		paddingHorizontal: 20,
		paddingTop: constants.isIphoneX ? 24 : Platform.OS == 'ios' ? 10 : 0
	},
	bg: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		width: constants.screen.width,
		height: statusHeight + 10
	},
	bgImg: {
		width: constants.screen.width,
		height: statusHeight + 10,
		borderBottomRightRadius: 30,
		borderBottomLeftRadius: 30
	},
	title: {
		fontSize: 23,
		marginHorizontal: 5,
		color: 'white',
		textAlign: 'center'
	},
	profile: {
		width: constants.screen.width * 0.1,
		height: constants.screen.width * 0.1,
		borderRadius: 50,
		backgroundColor: 'white'
	},
	button: {
		width: constants.screen.width * 0.1,
		height: constants.screen.width * 0.1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});

Header.propTypes = {
	title: PropTypes.string,
	navigation: PropTypes.object,
	isBack: PropTypes.bool,
	isBackTo: PropTypes.number,
	isBackToTop: PropTypes.bool,
	isProfile: PropTypes.bool
};

Header.defaultProps = {
	title: '',
	isBack: false,
	isBackTo: 1,
	isBackToTop: false,
	isProfile: false
};

export default Header;
