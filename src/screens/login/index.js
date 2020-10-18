// Login Screen

import React from 'react';
import { View, ScrollView, Image, BackHandler, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { LoginManager, AccessToken } from 'react-native-fbsdk';

import BaseView from '../../components/base';
import { InputBlock, FacebookButton } from './components';
import { AvoText, AvoTextInput, AvoButton, Text } from '../../components';
import { StackActions, NavigationActions } from 'react-navigation';
import { ImageBigHeader, ImageLogoWithWelcome, IconMarkLine } from '../../assets/svg';

import {
	loginRequest,
	registerRequest,
	socialLoginRequest,
	passResetRequest,
	passCodeRequest
} from '../../actions/authActions';
import { emailValidation, passwordValidation } from '../../Utilities';
import styles from './styles';
import constants from '../../const';

const formName = ['login', 'forgot password', 'register'];

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			offsetX: constants.screen.width - 40,
			loginEmail: '',
			loginPassword: '',
			registerEmail: '',
			registerPassword: '',
			confirmPassword: '',
			forgotEmail: '',
			isRegis: false,
			lName: '',
			fName: '',
			screen: 'login',
			resetCode: '',
			newPass: '',
			confirmPass: ''
		};
	}

	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
	}

	componentDidUpdate(prevProps) {
		const {
			isLoginWaiting,
			accessToken,
			isPassCode,
			isChangePass,
			loginError,
			registerError
		} = this.props;
		const { isRegis } = this.state;

		if (prevProps.isLoginWaiting != isLoginWaiting && isLoginWaiting == false) {
			if (loginError != null) {
				constants.DropDownAlert.showDropdownAlert(
					'error',
					'Échec de la connexion',
					loginError.message
				);
			} else if (registerError) {
				constants.DropDownAlert.showDropdownAlert(
					'error',
					`L'enregistrement a échoué`,
					registerError.message
				);
			} else if (prevProps.isPassCode != isPassCode && isPassCode == true) {
				constants.DropDownAlert.showDropdownAlert(
					'success',
					'Success',
					`Password reset code successfully send to your email`
				);
				this.onBtnToResetPass();
			} else if (prevProps.isChangePass != isChangePass && isChangePass == true) {
				constants.DropDownAlert.showDropdownAlert('success', 'Success', `Password reset successfully`);
				this.onBtnToLogin();
			} else {
				if (accessToken && isRegis == false) {
					this.moveToHome();
				} else if (accessToken && isRegis) {
					this.setState({ isRegis: false });
					this.moveToWelcome();
				} else {
				}
			}
		}
	}

	handleBackButton = () => {
		return true;
	}

	moveToHome = () => {
		const { navigation } = this.props;
		this.setState({
			loginEmail: '',
			loginPassword: '',
			registerEmail: '',
			registerPassword: '',
			confirmPassword: ''
		});
		navigation.navigate('Main');
	};

	moveToWelcome = () => {
		const { navigation } = this.props;
		this.setState({
			loginEmail: '',
			loginPassword: '',
			registerEmail: '',
			registerPassword: '',
			confirmPassword: ''
		});
		navigation.dispatch(
			StackActions.reset({
				index: 0,
				key: null,
				actions: [NavigationActions.navigate({ routeName: 'Welcome' })]
			})
		);
	};

	/*
  // Button Actions
  */

	onBtnToFP = () => {
		this.setState({
			loginEmail: '',
			loginPassword: '',
			registerEmail: '',
			registerPassword: '',
			confirmPassword: '',
			forgotEmail: '',
			isRegis: false,
			lName: '',
			fName: '',
			screen: 'login',
			resetCode: '',
			newPass: '',
			confirmPass: '',
			screen: 'forgot'
		});
	};
	onBtnToResetPass = () => {
		this.setState({
			loginEmail: '',
			loginPassword: '',
			registerEmail: '',
			registerPassword: '',
			confirmPassword: '',
			forgotEmail: '',
			isRegis: false,
			lName: '',
			fName: '',
			resetCode: '',
			newPass: '',
			confirmPass: '',
			screen: 'resetPass'
		});
	};

	onBtnToRegister = () => {
		this.setState({
			loginEmail: '',
			loginPassword: '',
			registerEmail: '',
			registerPassword: '',
			confirmPassword: '',
			forgotEmail: '',
			isRegis: false,
			lName: '',
			fName: '',
			resetCode: '',
			newPass: '',
			confirmPass: '',
			screen: 'regis'
		});
	};

	onBtnToLogin = () => {
		this.setState({
			loginEmail: '',
			loginPassword: '',
			registerEmail: '',
			registerPassword: '',
			confirmPassword: '',
			forgotEmail: '',
			isRegis: false,
			lName: '',
			fName: '',
			resetCode: '',
			newPass: '',
			confirmPass: '',
			screen: 'login'
		});
	};

	onBtnLogin = () => {
		this.setState({ isRegis: false });

		const { loginRequest } = this.props;
		const { loginEmail, loginPassword } = this.state;
		if (!loginEmail || loginEmail == '' || emailValidation(loginEmail) == false) {
			constants.DropDownAlert.showDropdownAlert('error', 'Email Address', `Please insert correct email address!`);
			return;
		} else if (!loginPassword || loginPassword == '') {
			constants.DropDownAlert.showDropdownAlert('error', 'Password', `Please insert valid password!`);
			return;
		} else {
			const params = {
				email: loginEmail,
				password: loginPassword
			};
			loginRequest(params);
			Keyboard.dismiss();
		}
	};

	onBtnFacebook = () => {
		const { socialLoginRequest } = this.props;
		this.setState({
			isRegis: false
		});

		LoginManager.logInWithPermissions(['public_profile']).then(
			(result) => {
				if (result.isCancelled) {
					//alert('Login cancelled');
				} else {
					AccessToken.getCurrentAccessToken().then((data) => {
						const params = {
							token: data.accessToken.toString(),
							provider: 'facebook'
						};
						socialLoginRequest(params);
					}, (error) => {
							console.log(error);
						}
					);
				}
			}, (error) => {
				console.log(error);
			}
		);
	};
	onBtnPassCode = () => {
		const { passCodeRequest } = this.props;
		const { forgotEmail } = this.state;
		this.setState({
			isRegis: false
		});
		if (!forgotEmail || forgotEmail == '' || emailValidation(forgotEmail) == false) {
			constants.DropDownAlert.showDropdownAlert('error', 'Email Address', `Please insert correct email address!`);
			//alert('Please insert password!');
			return;
		} else {
			const params = {
				email: forgotEmail
			};
			passCodeRequest(params);
		}
	};
	onBtnForgotPass = () => {
		const { passResetRequest } = this.props;
		const { resetCode, newPass, confirmPass } = this.state;
		this.setState({
			isRegis: false
		});
		if (!resetCode || resetCode == '') {
			constants.DropDownAlert.showDropdownAlert('error', 'Reset Code', `Please insert correct email address!`);
			//alert('Please insert password!');
			return;
		} else if (newPass == '' || newPass.length < 8 || !passwordValidation(newPass)) {
			constants.DropDownAlert.showDropdownAlert(
				'error',
				'New Password',
				`Please insert password at least 8 character long and must be contain 1 character and 1 digit!`
			);
			//alert('Please insert password!');
			return;
		} else if (newPass != confirmPass) {
			constants.DropDownAlert.showDropdownAlert(
				'error',
				'Confirm Password',
				`Inserted password does not match with with confirm password. Please check password again.`
			);
			//alert('Please insert password!');
			return;
		} else {
			const params = {
				password: newPass,
				code: resetCode,
				password_confirm: newPass
			};
			passResetRequest(params);
		}
	};
	onBtnRegister = () => {
		const { registerRequest } = this.props;
		const { registerEmail, registerPassword, confirmPassword, lName, fName } = this.state;
		this.setState({
			isRegis: true
		});
		if (!fName || fName == '') {
			constants.DropDownAlert.showDropdownAlert('error', 'First Name', `Please insert first name!`);
			return;
		} else if (!lName || lName == '') {
			constants.DropDownAlert.showDropdownAlert('error', 'Last Name', `Please insert last name!`);
			return;
		} else if (!registerEmail || registerEmail == '' || emailValidation(registerEmail) == false) {
			constants.DropDownAlert.showDropdownAlert('error', 'Email Address', `Please insert correct email address!`);
			//alert('Please insert password!');
			return;
		} else if (
			!registerPassword ||
			registerPassword == '' ||
			registerPassword.length < 8 ||
			!passwordValidation(registerPassword)
		) {
			constants.DropDownAlert.showDropdownAlert(
				'error',
				'Password',
				`Please insert password at least 8 character long and must be contain 1 character and 1 digit!`
			);
			//alert('Please insert password!');
			return;
		} else if (!confirmPassword || confirmPassword == '') {
			constants.DropDownAlert.showDropdownAlert('error', 'Confirm Password', `Please insert confirm password!`);
			//alert('Please confirm password!');
			return;
		} else if (registerPassword != confirmPassword) {
			constants.DropDownAlert.showDropdownAlert(
				'error',
				'Password',
				`Inserted password does not match with with confirm password. Please check password again.`
			);
			//alert('Please check password again. It does not match!');
			return;
		} else {
			const params = {
				email: registerEmail,
				password: registerPassword,
				firstname: fName,
				lastname: lName
			};
			registerRequest(params);
		}
	};

	/*
  // Rendering UI
  */

	renderBackground = () => {
		return (
			<View style={styles.header}>
				<ImageBigHeader width={styles.headerBg.width} height={styles.headerBg.height} />
			</View>
		);
	};
	renderViewScreen = () => {
		if (this.state.screen == 'regis') {
			return this.renderInputRegister();
		} else if (this.state.screen == 'forgot') {
			return this.renderInputForget();
		} else if (this.state.screen == 'resetPass') {
			return this.renderInputResetPass();
		} else {
			return this.renderInputLogin();
		}
	};
	renderInputBlock = () => {
		return (
			<ScrollView
				keyboardShouldPersistTaps={'handled'}
				ref={(ref) => (this.scrollView = ref)}
				pagingEnabled
				horizontal
				contentOffset={{ x: this.state.offsetX, y: 0 }}
				showsHorizontalScrollIndicator={false}
				scrollEventThrottle={16}
				scrollEnabled={false}
				onScroll={this.onScroll}
			>
				<View style={styles.inputScroll}>{this.renderViewScreen()}</View>
			</ScrollView>
		);
	};

	renderInputLogin = () => {
		const { loginEmail, loginPassword } = this.state;
		const { isLoginWaiting } = this.props;

		return (
			<InputBlock title="Connexion">
				<AvoTextInput
					style={styles.input}
					type="mail"
					placeholder="Tapez votre email"
					value={loginEmail}
					onChangeText={(text) => {
						this.setState({ loginEmail: text });
					}}
				/>
				<AvoTextInput
					style={styles.input}
					type="password"
					placeholder="Tapez un mot de passe"
					value={loginPassword}
					onChangeText={(text) => {
						this.setState({ loginPassword: text });
					}}
				/>
				<View style={styles.row}>
					<View style={styles.wrapperCenter} />
					<AvoText
						style={styles.fypLogin}
						text="Mot de passe oublié ?"
						onPress={() => {
							this.onBtnToFP();
						}}
					/>
				</View>
				<AvoButton
					style={styles.button}
					title="Se connecter"
					isLoading={isLoginWaiting}
					onPress={() => {
						this.onBtnLogin();
					}}
				/>
				<AvoText
					style={{ fontSize: constants.sizes.TXT_SIZE, textAlign: 'center', marginTop: 20 }}
					text={`Toujours pas de compte ? `}
				>
					<AvoText
						style={{ fontSize: constants.sizes.TXT_SIZE, color: constants.colors.tint }}
						fontWeight="bold"
						text={` C’est par ici`}
						onPress={() => this.onBtnToRegister()}
					/>
				</AvoText>
				<View style={[styles.row, { marginBottom: 10, marginTop: 20 }]}>
					<IconMarkLine width={50} />
					<AvoText
						style={{ fontSize: constants.sizes.TXT_SIZE, color: constants.colors.grey }}
						fontWeight="bold"
						text={`  Ou  `}
					/>
					<IconMarkLine width={50} />
				</View>
				<FacebookButton
					onPress={() => this.onBtnFacebook()}
				/>
			</InputBlock>
		);
	};

	renderInputRegister = () => {
		const { registerEmail, registerPassword, confirmPassword, fName, lName } = this.state;
		const { isLoginWaiting } = this.props;

		return (
			<InputBlock title="Inscription">
				<AvoTextInput
					style={styles.input}
					type="name"
					placeholder="Renseigne ton email"
					value={fName}
					onChangeText={(fName) => this.setState({ fName })}
				/>
				<AvoTextInput
					style={styles.input}
					type="name"
					placeholder="Tape un mot de passe"
					value={lName}
					onChangeText={(lName) => this.setState({ lName })}
				/>
				<AvoTextInput
					style={styles.input}
					type="mail"
					placeholder="Tapez votre email"
					value={registerEmail}
					onChangeText={(text) => this.setState({ registerEmail: text })}
				/>
				<AvoTextInput
					style={styles.input}
					type="password"
					placeholder="Tapez un mot de passe"
					value={registerPassword}
					onChangeText={(text) => this.setState({ registerPassword: text })}
				/>
				<AvoTextInput
					style={styles.input}
					type="password"
					placeholder="Confirmation du mot de passe"
					value={confirmPassword}
					onChangeText={(text) => this.setState({ confirmPassword: text })}
				/>
				<AvoButton
					style={styles.button}
					title={`S'inscrire`}
					isLoading={isLoginWaiting}
					onPress={() => {
						this.onBtnRegister();
						//this.moveToWelcome();
					}}
				/>
				<AvoText
					style={{ fontSize: constants.sizes.TXT_SIZE, textAlign: 'center', marginTop: 30 }}
					text={`Tu as déjà un compte ? `}
				>
					<AvoText
						style={{ fontSize: constants.sizes.TXT_SIZE, color: constants.colors.tint }}
						fontWeight="bold"
						text={`Connecte toi ici`}
						onPress={() => this.onBtnToLogin()}
					/>
				</AvoText>
			</InputBlock>
		);
	};

	renderInputResetPass = () => {
		const { resetCode, newPass, confirmPass } = this.state;
		const { isLoginWaiting } = this.props;

		return (
			<InputBlock title="Changez votre mot de passe">
				<AvoText
					style={styles.fyp}
					text={`Indiquez Votre adresse email pour recevoir un code que nous allons vous envoyer , Utilisez celui - ci pour modifier ensuite votre mot de passe.`}
				/>
				<AvoTextInput
					value={resetCode}
					onChangeText={(resetCode) => {
						this.setState({ resetCode });
					}}
					type=""
					style={styles.input}
					placeholder="Tapez votre code"
				/>
				<AvoTextInput
					value={newPass}
					onChangeText={(newPass) => {
						this.setState({ newPass });
					}}
					style={styles.input}
					type="password"
					placeholder="Tapez votre password"
				/>
				<AvoTextInput
					value={confirmPass}
					onChangeText={(confirmPass) => {
						this.setState({ confirmPass });
					}}
					style={styles.input}
					type="password"
					placeholder="Tapez votre confirm password"
				/>
				<AvoButton
					style={styles.button}
					title="Envoyer"
					isLoading={isLoginWaiting}
					onPress={() => {
						this.onBtnForgotPass();
					}}
				/>
				<AvoText
					style={{ fontSize: constants.sizes.TXT_SIZE, textAlign: 'center', marginTop: 37 }}
					text={`Vous vous souvenez de votre mot de passe ? `}
				>
					<AvoText
						style={{ fontSize: constants.sizes.TXT_SIZE, color: constants.colors.tint }}
						fontWeight="bold"
						text={`Connectez-vous`}
						onPress={() => {
							this.onBtnToLogin();
						}}
					/>
				</AvoText>
			</InputBlock>
		);
	};
	renderInputForget = () => {
		const { forgotEmail } = this.state;
		const { isLoginWaiting } = this.props;
		return (
			<InputBlock title="Mot de passe oublié">
				<AvoText
					style={styles.fyp}
					text={`On te renvoie toutes les instructions pour changer ton mot de passe par email.`}
				/>
				<AvoTextInput
					value={forgotEmail}
					onChangeText={(forgotEmail) => {
						this.setState({ forgotEmail });
					}}
					style={styles.input}
					type="mail"
					placeholder="Renseigne ton email"
				/>
				<AvoButton
					style={styles.button}
					title="Envoyer"
					isLoading={isLoginWaiting}
					onPress={() => {
						this.onBtnPassCode();
					}}
				/>
				<AvoText
					style={{
						fontSize: constants.sizes.TXT_SIZE,
						color: constants.colors.tint,
						textAlign: 'center',
						marginVertical: 20
					}}
					fontWeight="bold"
					text={`j'ai mon code`}
					onPress={() => {
						this.onBtnToResetPass();
					}}
				/>
				<AvoText
					style={{ fontSize: constants.sizes.TXT_SIZE, textAlign: 'center', marginTop: 10 }}
					text={`Ton mot de passe te revient ? `}
				>
					<AvoText
						style={{ fontSize: constants.sizes.TXT_SIZE, color: constants.colors.tint }}
						fontWeight="bold"
						text={`Connecte-toi ici`}
						onPress={() => this.onBtnToLogin()}
					/>
				</AvoText>
			</InputBlock>
		);
	};

	render() {
		return (
			<BaseView>
				{this.renderBackground()}
				<View style={styles.container}>
					<View style={styles.wrapperCenter}>
						{/* <ImageLogoWithWelcome width={styles.logo.width} height={styles.logo.height} /> */}
						<Image
							style={{ width: styles.logo.width, height: styles.logo.height }}
							source={require('../../assets/png/logo_with_welcome.png')}
						/>
					</View>
					<View style={styles.inputBlock}>{this.renderViewScreen()}</View>
				</View>
			</BaseView>
		);
	}
}

const mapStateToProps = (state) => {
	const { auth } = state.reducer;
	const { loginError, registerError } = auth;

	return {
		isLoginWaiting: auth.isWaiting,
		accessToken: auth.accessToken,
		id: auth.id,
		error: auth.eMessage,
		userData: auth.userData,
		isPassCode: auth.isPassCode,
		isChangePass: auth.isChangePass,
		loginError,
		registerError
	};
};

const mapDispatchToProps = {
	loginRequest,
	registerRequest,
	socialLoginRequest,
	passResetRequest,
	passCodeRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
