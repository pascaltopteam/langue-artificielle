// Profile Home

import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import BaseComponent from '../base';
import { BaseView, Header, AvoButton } from '../../components';
import Household from './components/household';
import { getFamilyRequest, setFamilyRequest, updateUserProfile } from '../../actions';
import styles from './styles';
import constants from '../../const';

class ProfileHome extends BaseComponent {
	
	constructor(props) {
		super(props);

		this.state = {
			isRefresh: false,
			adult: 0,
			child: 0
		};
	}

	componentDidMount() {
		const { userData } = this.props;

		if (!this.isAuthenticated()) return;

		const { family_members } = userData;
		if (this.isObjectAvailable(family_members)) {
			const { adult, child } = family_members;
			this.setState({ adult, child });
		}
	}

	componentDidUpdate = (prevProp) => {
		const { isFamilyUpdate, navigation, family, userData } = this.props;
		const { isRefresh } = this.state;

		if (prevProp.isFamilyUpdate != isFamilyUpdate && isFamilyUpdate) {
			this.setState({ isRefresh: false });
			constants.DropDownAlert.showDropdownAlert('success', 'Success', `Profil mis à jour.`);
			navigation.pop();

			var user = userData;
			user.family_members.adult = family.adult;
			user.family_members.child = family.child;
			updateUserProfile(user);
		}

		if (isRefresh) {
			constants.showLoader.showLoader();
		} else {
			constants.showLoader.hideLoader();
		}
	};

	onBtnSubmit = () => {
		const { setFamilyRequest, userData } = this.props;
		const { adult, child } = this.state;
		this.setState({ isRefresh: true });
		setFamilyRequest({ adult, child, access_token: userData.access_token });
	};

	selectFun = (index, type) => {
		if (type == 'adult') {
			this.setState({ adult: index + 1 });
		} else {
			this.setState({ child: index + 1 });
		}
	};

	render() {
		const { isWaiting } = this.props;

		return (
			<BaseView>
				<Header title="Mon foyer" navigation={this.props.navigation} isBack />
				<View style={styles.container}>
					<Household
						onPressAdult={index => this.selectFun(index, 'adult')}
						onPressChild={index => this.selectFun(index, 'child')}
					/>
					<View style={{ flex: 1 }} />
					<AvoButton
						isLoading={isWaiting}
						style={styles.button}
						title="C'est parti !"
						onPress={() => this.onBtnSubmit()}
					/>
				</View>
			</BaseView>
		);
	}
}

const mapDispatchToProps = {
	getFamilyRequest,
	setFamilyRequest,
	updateUserProfile
};
const mapStateToProps = (state) => {
	const { auth, profile } = state.reducer;

	return {
		isWaiting: auth.isWaiting,
		error: auth.eMessage,
		isFamilyUpdate: profile.isFamilyUpdate,
		family: profile.family,
		userData: auth.userData
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileHome);
