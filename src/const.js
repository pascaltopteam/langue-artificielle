// Constants

import { Dimensions, StyleSheet } from 'react-native';
import DropDownAlert from './components/dropDownAlert'
const constants = {
	thirdPartyKeys: {
		mixpanelToken: 'e00f757bd074be2b6511c5ce6531d3ce',
	},
	isHome:true,
	FIX_CONST:{
		RECIPE_THUMB_SIZE:500
	},
	DropDownAlert,
	screen: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height
	},
	showLoader: '',
	colors: {
		tint: '#025E2B',
		tint50: 'rgba(2, 94, 43, 0.5)',
		grey: '#B1BACE',
		bg: '#F2F5FB',
		select: '#DFE4EE',
		placeholder: '#7283A7',
		separator: '#E4E7EE',
		fb: '#475993',
		search: '#D0D6E2',
		borderColor: '#B1BACE',
		greenBg: '#3BAB74',
		lightGreenBg: '#c6d6d0',
		modal: 'rgba(0, 0, 0, 0.75)',
		border: '#E4E7EE',
		pink: '#FF4C64'
	},
	sizes: {
    TITLE_SIZE: Dimensions.get('window').width * 7 / 100,
    INPUT_TXT_SIZE: Dimensions.get('window').width * 4 / 100,
		BTN_TXT_SIZE: Dimensions.get('window').width * 5 / 100,
		TXT_SIZE: Dimensions.get('window').width * 4 / 100,
		GROUP_PIC_SIZE: Dimensions.get('window').width * 8 / 100,
		LOGO_SIZE: Dimensions.get('window').width * 60 / 100,
		PROFILE_SIZE: Dimensions.get('window').width * 30 / 100,
		BAR_ICON: Dimensions.get('window').width / 21,
		FLOAT_ICON: Dimensions.get('window').width / 4
	},
	isIphoneX: Dimensions.get('window').height / Dimensions.get('window').width > 2,
	styles: {
		wrapper: {
			flex: 1
		},
		wrapperCenter: {
			flex: 1,
			alignItems: 'center',
		},
		wrapperHVCenter: {
			flex: 1,
			height: '100%',
			alignItems: 'center',
			justifyContent: 'center'
		},
		row: {
			flexDirection: 'row'
		},
		center: {
			width: '100%',
			alignItems: 'center'
		}
	}
};

export default constants;
