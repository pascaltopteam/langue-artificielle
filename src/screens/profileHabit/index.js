// Profile Habit

import React from 'react';
import { View } from 'react-native';

import BaseComponent from '../base';
import { BaseView, Header, AvoButton } from '../../components';
import Diet from './components/diet';
import { updateProfileRequest } from '../../actions/profile';
import styles from './styles';
import { connect } from 'react-redux';
import constants from '../../const';

class ProfileHabit extends BaseComponent {
	constructor(props) {
		super(props);

		this.state = {
			dietFood: []
		};
	}

	onBtnSubmit = () => {
		const { updateProfileRequest, userData } = this.props;
		if (userData.access_token) {
			var dietFood = [];
			this.state.dietFood.map((item, index) => {
				if (item.isCheck) {
					dietFood.push(item.key);
				}
			});
			params = {
				access_token: userData.access_token,
				diet: dietFood
			};
			updateProfileRequest(params);
		}
	};
	componentDidMount = () => {
		const { isWaiting, accessToken, id, error, userData } = this.props;
		if (userData != undefined && error == '' && Object.keys(userData).length > 0) {
			if (Object.keys(userData.filters.diets).length && Object.keys(userData.filters.diets).length > 0) {
				dietsKeys = Object.keys(userData.filters.diets);
				arr = [];
				dietsKeys.map((item, index) => {
					var isCheck = false;
					if (userData.diet != undefined && item == userData.diet) {
						isCheck=true
					}
					var node = { isCheck: isCheck, title: userData.filters.diets[item], key: item };
					arr.push(node);
				});
				this.setState({
					dietFood: arr
				});
			}
		} else if (error != '') {
			//constants.DropDownAlert.showDropdownAlert('error', 'Régime alimentaire', error);
		}
	};
	componentDidUpdate = (prev) => {
		const { profileUpdate, error } = this.props;
		if (prev.profileUpdate != profileUpdate) {
			if (profileUpdate) {
				constants.DropDownAlert.showDropdownAlert(
					'success',
					'Success',
					`Profil mis à jour.`
				);
				this.props.navigation.pop();
			} else if (error != '') {
				//constants.DropDownAlert.showDropdownAlert('error', 'Régime alimentaire', error);
			}
		}
	};
	render() {
		return (
			<BaseView>
				<Header title="Régime alimentaire" navigation={this.props.navigation} isBack />
				<View style={styles.container}>
					<Diet
						onPress={(itm, ind) => {
							this.state.dietFood.map((im, inmInd) => {
								this.state.dietFood[inmInd].isCheck = false;
							});
							this.state.dietFood[ind].isCheck = !this.state.dietFood[ind].isCheck;
							this.setState({
								dietFood: this.state.dietFood
							});
						}}
						food={this.state.dietFood}
					/>
					<View style={{ flex: 1 }} />
					<AvoButton
						isLoading={this.props.isWaiting}
						style={styles.button}
						title="C'est parti !"
						onPress={() => {
							this.onBtnSubmit();
						}}
					/>
				</View>
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
		id: auth.id,
		error: auth.eMessage,
		profileUpdate: auth.profileUpdate,
		userData: auth.userData
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileHabit);
