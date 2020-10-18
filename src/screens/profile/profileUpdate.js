// Profile page

import React from 'react';
import { View, Image, ScrollView, BackHandler, TouchableOpacity } from 'react-native';

import { BaseView, Header, AvoText, Block, AvoButton } from '../../components';
import { connect } from 'react-redux';
import styles from './styles';
import { updateProfileRequest } from '../../actions/profile';
import constants from '../../const';

class ProfileUpdate extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isSwitchVal: true,
			dialogShow: false,
			fullName: '',
			email: 'email@address.com',
			profileUrl: ''
		};
	}
	componentDidUpdate = (prev) => {
		const { profileUpdate, error } = this.props;
		if (prev.profileUpdate != profileUpdate) {
			if (profileUpdate) {
				constants.DropDownAlert.showDropdownAlert('success', 'Profile Update', `Profile updated successfully`);
				this.props.navigation.pop();
			} else if (error != '') {
				//constants.DropDownAlert.showDropdownAlert('error', 'Profile Update', error);
			}
		}
	};
	componentDidMount = () => {
		const { isWaiting, accessToken, id, error, userData } = this.props;
		if (userData != undefined && error == '' && Object.keys(userData).length > 0) {
		} else if (error != '') {
			//alert(error);
		}
	};
	updateProfile = () => {
		const { updateProfileRequest, userData } = this.props;
		if (userData.access_token) {
			param = {
				access_token: userData.access_token,
				firstname: 'FRahulName',
				lastname: 'LName',
				gender: 'm',
				birthdate: '1998-06-07'
			};
			updateProfileRequest(param);
		}
	};
	render() {
		const { navigation } = this.props;

		return (
			<BaseView>
				<Header title="Editer le profil" navigation={this.props.navigation} isBack />
				<ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
					<AvoButton
						isLoading={this.props.isWaiting}
						style={styles.buttonPop}
						title="Update Profile"
						onPress={() => {
							this.updateProfile();
						}}
					/>
				</ScrollView>
			</BaseView>
		);
	}
}
const mapDispatchToProps = {
	updateProfileRequest
};
const mapStateToProps = (state) => {
	const { auth } = state.reducer;

	return {
		isWaiting: auth.isWaiting,
		accessToken: auth.accessToken,
		profileUpdate: auth.profileUpdate,
		id: auth.id,
		error: auth.eMessage,
		userData: auth.userData
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileUpdate);
