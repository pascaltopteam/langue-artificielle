import React from 'react';
import { StyleSheet, View, Platform, Text, ActivityIndicator } from 'react-native';
//import NetInfo from '@react-native-community/netinfo';
import constants from './src/const';
import { getStatusBarHeight } from './src/Utilities';
import DropdownAlert from 'react-native-dropdownalert';
import { connect } from 'react-redux';
import CustomLoader from './src/components/customLoader';

class GlobalModule extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showLoader: false,
			isConnectFail: false
		};
	}

	componentDidMount = () => {
		const { isWaiting } = this.props;
		constants.showLoader = this.showLoader;
	};

	render() {
		return (
			<View style={styles.container}>
				{this.props.children}
				<DropdownAlert
					ref={(showDropDownAlert) => constants.DropDownAlert.setDropdownAlertRef(showDropDownAlert)}
					translucent={true}
					closeInterval={2000}
					updateStatusBar={false}
					onTap={(data) => {}}
					containerStyle={{
						backgroundColor: constants.colors.tint
					}}
					messageNumOfLines={5}
				/>
				<CustomLoader ref={(showLoader) => (this.showLoader = showLoader)} />
			</View>
		);
	}
}
const mapStateToProps = (state) => {
	const { auth } = state.reducer;

	return {
		isWaiting: auth.isWaiting
	};
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(GlobalModule);

const styles = StyleSheet.create({
	noInternetView: {
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1000,
		position: 'absolute',
		top: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
		height: getStatusBarHeight() * 1.5,
		width: '100%',
		borderColor: 'red',
		borderBottomWidth: 1,
		backgroundColor: 'white'
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'rgba(0,0,0,0)'
	}
});
