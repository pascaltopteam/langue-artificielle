// Profile item

import React from 'react';
import { View, StyleSheet, TouchableOpacity, Switch,Image } from 'react-native';
import PropTypes from 'prop-types';

import {
	IconHeartHome,
	IconForkKnife,
	IconGood,
	IconBad,
	IconRightArrow,
	IconMonitor,
	IconComment
} from '../../../assets/svg';
import { AvoText } from '../../../components';
import constants from '../../../const';

class ProfileItem extends React.Component {
	renderIcon = () => {
		const { type } = this.props;

		switch (type) {
			case 'home':
				return <IconHeartHome width={22} height={19} />;
			case 'habit':
				return <IconForkKnife width={18} height={20} />;
			case 'allergy':
				return <IconGood width={20} height={20} />;
			case 'notLike':
				return <IconBad width={20} height={20} />;
			case 'feed':
				return <IconMonitor width={20} height={19} />;
			case 'contact':
				return <IconComment width={20} height={19} />;
			case 'logout':
				return <IconGood width={20} height={19} />;
		}
	};

	renderItemTitle = () => {
		const { type } = this.props;

		switch (type) {
			case 'home':
				return <AvoText style={styles.title} fontWeight={'normal'} text="Mon foyer" />;
			case 'habit':
				return <AvoText style={styles.title} fontWeight={'normal'} text="Mes habitudes alimentaires" />;
			case 'allergy':
				return <AvoText style={styles.title} fontWeight={'normal'} text="Mes allergies" />;
			case 'notLike':
				return <AvoText style={styles.title} fontWeight={'normal'} text={`Ingrédients que je n'aime pas`} />;
			case 'feed':
				return <AvoText style={styles.title} fontWeight={'normal'} text={`Recevoir la newsletter Santé`} />;
			case 'contact':
				return <AvoText style={styles.title} fontWeight={'normal'} text="Contacter Avocadoo" />;
			case 'logout':
				return <AvoText style={styles.title} fontWeight={'normal'} text="Se déconnecter" />;
		}
	};

	render() {
		const { isSwitch, value, onPress, onValueChange,isSwitchVal,onChangeValue } = this.props;

		return (
			<TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={onPress}>
				<View style={styles.icon}>{this.renderIcon()}</View>

				{this.renderItemTitle()}
				<View style={{ flex: 1, paddingRight: 10 }} />
				{isSwitch ? (
					
						// <Switch
						// style={{ transform: [{ scaleX: .7 }, { scaleY: .7 }] }}
						// 	value={value}
						// 	trackColor={{ false: 'grey', true: constants.colors.tint }}
						// 	onValueChange={onValueChange}
						// />
						<TouchableOpacity activeOpacity={0.8} onPress={onChangeValue}>
						<Image 
							resizeMode={'contain'}
							source={isSwitchVal?require('../../../assets/png/toggleonFontAwesome.png'):require('../../../assets/png/toggleoffFontAwesome.png')}
							style={{tintColor:constants.colors.tint,width:constants.screen.width*0.09,height:constants.screen.width*0.09}}
						/>
						</TouchableOpacity>
				) : (
					<IconRightArrow width={constants.screen.width*0.03} height={constants.screen.width*0.03} />
				)}
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		paddingRight: 20,
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 20
	},
	icon: {
		width: 22,
		alignItems: 'center'
	},
	title: {
		color:'black',
		fontSize: constants.sizes.INPUT_TXT_SIZE,
		marginLeft: 10
	}
});

ProfileItem.propTypes = {
	type: PropTypes.string,
	isSwitch: PropTypes.bool,
	value: PropTypes.bool,
	onPress: PropTypes.func,
	onValueChange: PropTypes.func
};

ProfileItem.defaultProps = {
	type: 'home',
	isSwitch: false,
	value: false
};

export default ProfileItem;
