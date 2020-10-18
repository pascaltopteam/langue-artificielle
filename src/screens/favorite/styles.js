// Styles

import { StyleSheet, Platform } from 'react-native';
import { getStatusBarHeight } from '../../Utilities';
import constants from '../../const';

const styles = StyleSheet.create({
	dietIconImg: {
		width: constants.screen.width * 0.06,
		height: constants.screen.width * 0.06
	},
	dietIcon: {
		padding: 7,
		borderRadius: 20
	},
	blurPopupView: { paddingVertical: 50, height: constants.screen.height - getStatusBarHeight() },
	popupSettingView: { alignItems: 'center', backgroundColor: 'white', borderRadius: 25, height: '100%' },
	optBtn: {
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 30,
		backgroundColor: constants.colors.bg,
		padding: 10
	},
	squareBoxStyle: { alignSelf: 'flex-start', marginVertical: 10 },
	squareBoxStyleRow: {
		width: '48%',
		alignSelf: 'flex-start',
		marginVertical: 10,
		flexDirection: 'row',
		alignItems: 'center'
	},
	container: {
		alignItems: 'center',
		height: '100%',
		paddingTop: Platform.OS === 'android' ? getStatusBarHeight() : getStatusBarHeight() * 2,
		backgroundColor: 'white'
	},
	borderStyle: {
		width: constants.screen.width * 0.9,
		alignSelf: 'center',
		borderColor: constants.colors.borderColor,
		borderTopWidth: 0.5,
		marginVertical: 10
	},
	content: {
		backgroundColor: 'yellow'
	},
	searchBox: {
		width: constants.screen.width * 0.9,
		alignItems: 'center',
		alignSelf: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	settingBtn: { paddingVertical: 10, paddingLeft: 10, alignItems: 'center', justifyContent: 'center' },
	button: {
		width: '100%',
		alignSelf: 'center',
		marginVertical: 10
	},
	headerTxt: { fontSize: constants.sizes.TXT_SIZE, color: '#000' },
	btnStyle: {
		width: '90%',
		padding: 10,
		borderRadius: 10,
		marginBottom: 10,
		alignSelf: 'center',
		backgroundColor: 'white'
	},
	simpleRowView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		alignSelf: 'center'
	},
	rowContainerDetails: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginVertical: 10,
		alignSelf: 'center',
		width: constants.screen.width * 0.9
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
		textAlign: 'center',
		marginTop: Platform.OS == 'ios' ? 5 : 0
	},
	mathBtn: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 10 },
	popupContainer1: {
		borderRadius: 5,
		borderColor: constants.colors.grey,
		borderWidth: 1,
		marginVertical: 10,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row'
	},
	popupTxt: {
		fontSize: constants.sizes.TXT_SIZE,
		color: 'black',
		textAlign: 'center',
		marginVertical: 15,
		width: '70%'
	},
	popupTitle: {
		fontSize: constants.sizes.TXT_SIZE,
		color: 'black',
		textAlign: 'left',
		marginVertical: 15,
		marginBottom: 10,
		width: '100%',
		alignSelf: 'center'
	},
	detailTxt: {
		fontSize: constants.sizes.TXT_SIZE,
		color: 'black',
		textAlign: 'center'
	},
	ingrTxt: { fontSize: constants.sizes.TXT_SIZE, margin: 7, color: 'white' },
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
	descTxt: { fontSize: constants.sizes.TXT_SIZE + 2, margin: 10, color: 'black' },
	descTxtTitle: { fontSize: constants.sizes.TXT_SIZE + 2, marginVertical: 10, color: 'black' },
	flexTxt: { fontSize: 15, color: 'black', flex: 1, marginHorizontal: 10 },
	flexTxtLight: { fontSize: 13, color: constants.colors.placeholder },
	slide: {
		backgroundColor: 'white',
		marginVertical: 10,
		alignSelf: 'center',
		alignSelf: 'center',
		width: constants.screen.width * 0.9
	},
	viewImg: {
		width: constants.screen.width * 0.9,
		height: constants.screen.width * 0.3,
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10
	},
	
	rowView: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
	rowContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: 10,
		marginBottom: 10
	},
	rowContainerCenter: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginTop: 10,
		alignSelf: 'center',
		width: constants.screen.width * 0.9
	},
	title: {
		marginVertical: 10,
		width: constants.screen.width * 0.9,
		color: 'black',
		fontSize: constants.sizes.BTN_TXT_SIZE,
		alignSelf: 'center'
	},

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

	//Scroll Effect
	navContainer: {
		width: constants.screen.width,
		backgroundColor: 'rgba(0,0,0,0)',
		paddingTop: Platform.OS === 'android' ? 5 : getStatusBarHeight(),
		paddingHorizontal: 10
	}
});

export default styles;
