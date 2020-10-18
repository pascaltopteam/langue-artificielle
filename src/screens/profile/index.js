// Profile page

import React from 'react';
import { connect } from 'react-redux';
import { View, Image, ScrollView, BackHandler, TouchableOpacity } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import FastImage from 'react-native-fast-image';
import Dialog, { SlideAnimation, DialogContent } from 'react-native-popup-dialog';

import BaseComponent from '../base';
import { BaseView, Header, AvoText, Block, AvoButton } from '../../components';
import { IconRightArrow, IconBellPopup } from '../../assets/svg';
import { Separator, ProfileItem } from './components';

import { resetUserToken } from '../../actions/authActions';

import constants from '../../const';
import styles from './styles';

class Profile extends BaseComponent {
	constructor(props) {
		super(props);
		this.state = {
			isSwitchVal: true,
			dialogShow: false,
			fullName: '',
			email: '',
			profileUrl: ''
		};
	}
	componentDidUpdate = () => {
		const { isLoginWaiting, accessToken, id, error, userData } = this.props;
		if (userData != undefined && error == '' && Object.keys(userData).length > 0) {
			var fullName = userData.firstname && userData.firstname != null ? userData.firstname : '';
			fullName = `${fullName} ${userData.lastname && userData.lastname != null ? userData.lastname : ''}`;

			if (
				fullName != this.state.fullName ||
				this.state.email != userData.email ||
				this.state.profileUrl != userData.picture
			) {
				this.setState({
					profileUrl: userData.picture,
					fullName: fullName,
					email: userData.email
				});
			}
		} else if (error != '') {
			//alert(error);
		}
	};
	componentDidMount = () => {
		const { isLoginWaiting, accessToken, id, error, userData } = this.props;
		if (userData != undefined && error == '' && Object.keys(userData).length > 0) {
			var fullName = userData.fullName ? userData.fullName : '';
			fullName = fullName + ' ' + userData.lastname ? userData.lastname : '';
			var picture = userData.picture;
			this.setState({
				fullName: fullName,
				email: userData.email,
				profileUrl: picture
			});
		} else if (error != '') {
			//alert(error);
		}
	};

	onConfirmLogout = () => {
		const { navigation, resetUserToken } = this.props;

		this.setState({ dialogShow: false });
		navigation.popToTop();

		setTimeout(async () => {
			try {
				await AsyncStorage.removeItem('@access_token');
				resetUserToken();
			} catch (exception) {}
		}, 500);
	}

	dialogPop = () => {
		const { navigation, resetUserToken } = this.props;

		return (
			<Dialog
				containerStyle={{ justifyContent: 'flex-end' }}
				onDismiss={() => this.setState({ dialogShow: false })}
				rounded
				dialogStyle={{ backgroundColor: 'rgba(0,0,0,0)' }}
				width={1}
				onTouchOutside={() => this.setState({ dialogShow: false })}
				visible={this.state.dialogShow}
				dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
			>
				<DialogContent style={{ paddingVertical: 50 }}>
					<View style={{ alignItems: 'center', backgroundColor: 'white', borderRadius: 25 }}>
						<IconBellPopup style={{ marginTop: -40 }} width={80} height={80} />
						<AvoText
							style={styles.popupTxt}
							fontWeight="normal"
							text={`Êtes-vous sûr de vouloir vous Se déconnecter ?`}
						/>
						<AvoButton
							style={styles.buttonPop}
							title="Oui"
							onPress={() => this.onConfirmLogout()}
						/>
						<AvoButton
							style={styles.buttonPopNag}
							txtStyle={{ color: constants.colors.grey }}
							title="Non"
							isNegative={true}
							onPress={() => this.setState({ dialogShow: false })}
						/>
					</View>
				</DialogContent>
			</Dialog>
		);
	};
	render() {
		const { navigation } = this.props;

		return (
			<BaseView>
				<Header title="Mon profil" navigation={this.props.navigation} />
				<ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
					<TouchableOpacity
						// onPress={() => {
						// 	navigation.navigate('ProfileUpdate');
						// }}
						style={styles.card}
						activeOpacity={0.8}
					>
						<FastImage source={{ uri: this.state.profileUrl }} style={styles.profileIamge} />
						<View style={{ flex: 1 }}>
							<AvoText
								style={styles.name}
								text={this.state.fullName == '' ? '--' : this.state.fullName}
								fontWeight="museo"
							/>
							<AvoText style={styles.email} fontWeight={'normal'} text={this.state.email} />
						</View>
						<View style={{}} />
						<IconRightArrow width={constants.screen.width * 0.03} height={constants.screen.width * 0.03} />
					</TouchableOpacity>

					<Separator />

					<Block title="Mes informations">
						<ProfileItem
							type="home"
							onPress={() => navigation.navigate('ProfileHome')}
						/>
						<ProfileItem
							type="habit"
							onPress={() => {
								navigation.navigate('ProfileHabit');
							}}
						/>
						<ProfileItem
							type="allergy"
							onPress={() => {
								navigation.navigate('ProfileAllergy');
							}}
						/>
						<ProfileItem
							type="notLike"
							onPress={() => {
								navigation.navigate('ProfileIngredient');
							}}
						/>
					</Block>

					<Separator />

					<Block title="Paramêtres">
						<ProfileItem
							type="feed"
							value={true}
							isSwitchVal={this.state.isSwitchVal}
							isSwitch
							onChangeValue={() => {
								this.setState({
									isSwitchVal: !this.state.isSwitchVal
								});
							}}
						/>
						<ProfileItem
							type="contact"
							onPress={() => navigation.navigate('Contact')}
						/>
					</Block>
					<Separator />

					<Block title="Se déconnecter">
						<ProfileItem
							type="logout"
							onPress={() => {
								this.setState({ dialogShow: true });
								//navigation.navigate('Contact');
							}}
						/>
					</Block>

					<View style={styles.info}>
						<AvoText style={styles.infoText} text={`Avocadoo ${this.getVersionNumber()}`} />
						<AvoText style={styles.infoText} text="Fait avec 🧡 à Paris" />
					</View>
				</ScrollView>
				{this.dialogPop()}
			</BaseView>
		);
	}
}
const mapDispatchToProps = {
	resetUserToken
};

const mapStateToProps = (state) => {
	const { auth } = state.reducer;

	return {
		isLoginWaiting: auth.isWaiting,
		accessToken: auth.accessToken,
		id: auth.id,
		error: auth.eMessage,
		userData: auth.userData
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
