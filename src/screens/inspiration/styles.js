// Styles

import { StyleSheet, Platform } from 'react-native';
import { getStatusBarHeight } from '../../Utilities';
import constants from '../../const';

const styles = StyleSheet.create({
	containerHeader: {
		position: 'absolute',
		top: 0,
		zIndex: 10,
		left: -2,
		width: constants.screen.width + 4,
		height: constants.isIphoneX ? (constants.screen.width + 4) * 0.251 : (constants.screen.width + 4) * 0.193,
		alignItems: 'center',
		flexDirection: 'row',
		paddingHorizontal: 20,
		paddingTop: constants.isIphoneX ? 24 : Platform.OS == 'ios' ? 10 : 5
	},
	bg: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: constants.screen.width + 4,
		height: constants.isIphoneX ? (constants.screen.width + 4) * 0.251 : (constants.screen.width + 4) * 0.193
	},
	contentWrapper: {
		...constants.styles.wrapper,
		backgroundColor: constants.colors.bg
	},
	statusStyle: {
		padding: 15,
		alignItems: "center",
		width: constants.screen.width,
		flexDirection: 'row',
		justifyContent: 'space-around',
		backgroundColor: 'white'
	},
	detailWrapper: {
		marginTop: 10,
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom: 10
	},
	optBtn: {
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 30,
		backgroundColor: constants.colors.bg,
		padding: 10
	},
	container: {
		height: '100%',
		paddingTop: Platform.OS === 'android' ? 0 : getStatusBarHeight(),
		backgroundColor: 'white'
	},
	container1: {
		flex: 1,
		backgroundColor: '#fff',
		paddingTop: Platform.OS === 'android' ? 0 : getStatusBarHeight()
	},
	borderStyle: { width: '100%', borderColor: constants.colors.borderColor, borderTopWidth: 0.5, marginVertical: 10 },
	content: {
		backgroundColor: 'yellow'
	},
	btnStyle: {
		width: '90%',
		padding: 10,
		borderRadius: 10,
		marginVertical: 10
	},
	rowContainerDetails: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginVertical: 10
	},
	rowContainerCenter: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		backgroundColor: constants.colors.bg
	},
	boxContainer: {
		justifyContent: 'space-around',
		alignItems: 'center',
		padding: 5,
		width: constants.screen.width * 0.275,
		backgroundColor: constants.colors.bg,
		height: constants.screen.width * 0.25
	},
	recipeTxt: {
		fontSize: constants.sizes.TXT_SIZE,
		color: 'black',
		textAlign: 'center'
	},
	recipeTxtSmall: {
		fontSize: constants.sizes.TXT_SIZE - 2,
		color: 'black',
		textAlign: 'center'
	},
	popupTxt: {
		fontSize: 15,
		color: 'black',
		textAlign: 'center',
		marginVertical: 15,
		width: '70%'
	},
	detailTxt: {
		fontSize: constants.sizes.TXT_SIZE - 2,
		color: 'black',
		textAlign: 'center'
	},
	ingrTxt: {
		fontSize: constants.sizes.TXT_SIZE,
		marginHorizontal: 7,
		marginBottom: Platform.OS == 'android' ? 5 : 3,
		marginTop: 5,
		color: 'white'
	},
	//Card row view
	cardStyle: {
		backgroundColor: '#FE474C',
		borderRadius: 5,
		width: constants.screen.width * 0.9,
		shadowColor: 'rgba(0,0,0,0.5)',
		shadowOffset: {
			width: 0,
			height: 1
		},
		shadowOpacity: 0.5
	},
	descTxt: { fontSize: constants.sizes.TXT_SIZE + 2, marginHorizontal: 10, marginTop: 15, color: 'black' },
	descTxtTitle: { fontSize: constants.sizes.TXT_SIZE + 2, marginVertical: 10, color: 'black' },
	flexTxt: { fontSize: constants.sizes.TXT_SIZE, color: 'black', flex: 1, marginHorizontal: 10 },
	flexTxtLight: { fontSize: constants.sizes.TXT_SIZE - 1, color: constants.colors.placeholder },
	slide: { marginVertical: 10, alignSelf: 'center', width: constants.screen.width * 0.9, backgroundColor: '#fff' },
	slide1: {
		backgroundColor: 'white',
		marginVertical: 10,
		alignSelf: 'flex-start',
		alignSelf: 'center',
		width: '90%'
	},
	viewImg: {
		width: constants.screen.width * 0.9,
		height: constants.screen.width * 0.3,
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10
	},
	searchBox: {
		width: '100%',
		paddingHorizontal: 16,
		alignItems: 'center',
		alignSelf: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	settingBtn: {
		marginLeft: 16,
		padding: 5,
		alignItems: 'center',
		justifyContent: 'center'
	},
	rowView: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 10
	},
	rowContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginHorizontal: 10,
		marginBottom: 10
	},
	rowContainerTime: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginHorizontal: 10,
		marginBottom: 15,
		marginTop: 10
	},
	title: { color: 'black', fontSize: constants.sizes.BTN_TXT_SIZE },

	//dropdown
	dropdownBoxStyle: {
		width: 200,
		height: 200,
		marginTop: Platform.OS === 'ios' ? 10 : 10,
		shadowColor: constants.colors.grey,
		shadowOffset: {
			width: 0,
			height: 0
		},
		shadowRadius: 6,
		shadowOpacity: 0.2,
		elevation: 5
	},
	dropdownBtnTxt: {
		fontSize: constants.sizes.TXT_SIZE,
		marginVertical: 15,

		color: constants.colors.placeholder
	},
	dropdownBtn: {
		borderColor: constants.colors.borderColor,
		backgroundColor: '#FFFFFF',
		borderRadius: 5,
		borderWidth: 1,
		paddingHorizontal: 10,
		flexDirection: 'row',
		marginRight: 10,
		width: 200,
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	iconStyle: {
		width: constants.screen.width * 0.20,
		height: constants.screen.width * 0.20
	},
	titleTxt: { 
		flex: 1, 
		textAlign: 'center', 
		color: 'black', 
		fontSize: constants.sizes.TXT_SIZE + 1 
	},
	//Scroll Effect
	navContainer: {
		width: constants.screen.width,
		backgroundColor: 'rgba(0,0,0,0)',
		paddingTop: Platform.OS === 'android' ? 5 : getStatusBarHeight(),
		paddingHorizontal: 10
	},
	button: {
		width: constants.screen.width - 30,
		alignSelf: "center",
		marginVertical: 10
	},
	searchBoard: {
		position: 'absolute',
		width: '100%',
		height: constants.screen.height / 3,
		borderBottomLeftRadius: 20,
		borderBottomEndRadius: 20,
		backgroundColor: 'white',
		shadowColor: 'gray',
		shadowOpacity: 0.1,
		shadowOffset: {
			width: 0,
			height: 5
		}
	},
	searchClose: {
		marginHorizontal: 20,
		marginBottom: 10,
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 4,
		backgroundColor: constants.colors.greenBg
	},
	closeTitle: {
		fontSize: 12,
		color: 'white'
	}
});

export default styles;
