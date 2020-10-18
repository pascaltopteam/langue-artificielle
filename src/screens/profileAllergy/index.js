// Profile Allergies

import React from 'react';
import { View, Platform } from 'react-native';

import BaseComponent from '../base';
import { BaseView, Header, AvoButton, Block } from '../../components';
import Allergy from './components/allergy';
import { updateProfileRequest } from '../../actions/profile';
import styles from './styles';
import { connect } from 'react-redux';
import constants from '../../const';

class ProfileAllergy extends BaseComponent {
	constructor(props) {
		super(props);

		this.state = {
			allergyFood: [],
			allergyFoodFilter: [],
			searchTxt: ''
		};
	}

	onBtnSubmit = () => {
		const { updateProfileRequest, userData } = this.props;
		if (userData.access_token) {
			var allergyFood = [];
			this.state.allergyFood.map((item, index) => {
				if (item.isCheck) {
					allergyFood.push(item.key);
				}
			});
			var params = {
				access_token: userData.access_token,
				allergies: allergyFood
			};
			updateProfileRequest(params);
		}
		//navigation.pop();
	};

	componentDidMount = () => {
		const { isWaiting, accessToken, id, error, userData } = this.props;
		if (userData != undefined && error == '' && Object.keys(userData).length > 0) {
			if (Object.keys(userData.filters.allergies).length && Object.keys(userData.filters.allergies).length > 0) {
				allergiesKeys = Object.keys(userData.filters.allergies);
				arr = [];
				allergiesKeys.map((item, index) => {
					var isCheck = false;
					if (Object.keys(userData.allergies).length) {
						userData.allergies.map((itm, ind) => {
							if (itm == item) {
								isCheck = true;
							}
						});
					}
					var node = { isCheck: isCheck, title: userData.filters.allergies[item], key: item };
					arr.push(node);
				});
				this.setState({
					allergyFood: arr
				});
			}
		} else if (error != '') {
			//constants.DropDownAlert.showDropdownAlert('error', 'Allergies', error);
		}
	};
	componentDidUpdate = (prev) => {
		const { profileUpdate, error } = this.props;
		if (prev.profileUpdate != profileUpdate) {
			if (profileUpdate) {
				constants.DropDownAlert.showDropdownAlert('success', 'Allergies', `Allergies data updated`);
				this.props.navigation.pop();
			} else if (error != '') {
				//constants.DropDownAlert.showDropdownAlert('error', 'Allergies', error);
			}
		}
	};
	searchFun = (searchTxt) => {
		var arr = [];
		searchTxt = searchTxt.toLowerCase();
		this.state.allergyFood.map((mapItm, mapIndex) => {
			var titleTxt = mapItm.title.toLowerCase();
			if (titleTxt.includes(searchTxt)) {
				arr.push(mapItm);
			}
		});
		this.setState({
			allergyFoodFilter: arr
		});
	};
	render() {
		return (
			<BaseView>
				<Header title="Allergie(s)" navigation={this.props.navigation} isBack />
				<View style={styles.container}>
					<Allergy
						onChangeSearchText={(searchTxt) => {
							this.searchFun(searchTxt);
							this.setState({ searchTxt });
						}}
						onPress={(itm, ind) => {
							this.state.allergyFood.map((mapItm, mapIndex) => {
								if (itm.key == mapItm.key) {
									this.state.allergyFood[mapIndex].isCheck = !this.state.allergyFood[mapIndex]
										.isCheck;
									this.setState({
										allergyFood: this.state.allergyFood
									});
								}
							});
						}}
						title={`As-tu des allergies ? On va éviter les recettes qui font mal …`}
						allergyFood={this.state.searchTxt == '' ? this.state.allergyFood : this.state.allergyFoodFilter}
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
export default connect(mapStateToProps, mapDispatchToProps)(ProfileAllergy);
