// Contact

import React from 'react';
import { View } from 'react-native';

import BaseComponent from '../base';
import { BaseView, Header } from '../../components';

import { AvoButton } from '../../components';
import { Subject, Message } from './components';
import { contactRequest } from '../../actions/authActions';
import styles from './styles';
import { connect } from 'react-redux';
import constants from '../../const';

class Contact extends BaseComponent {
	constructor(props) {
		super(props);
		this.state = { subject: '', message: '' };
	}
	onBtnSubmit = () => {
		const { contactRequest, userData } = this.props;
		if (userData.access_token) {
			if (this.state.subject == '') {
				constants.DropDownAlert.showDropdownAlert('error', 'Subject', `Please fill the subject`);
			} else if (this.state.message == '' || this.state.message.length < 30) {
				constants.DropDownAlert.showDropdownAlert(
					'error',
					'Message',
					`Please fill the message with at least 30 character`
				);
			} else {
				params = {
					access_token: userData.access_token,
					subject: this.state.subject,
					message: this.state.message
				};
				contactRequest(params);
			}
		}
	};
	componentDidUpdate = (prev) => {
		const { contactSuccess, error } = this.props;
		if (prev.contactSuccess != contactSuccess) {
			if (contactSuccess) {
				constants.DropDownAlert.showDropdownAlert('success', 'Contact', `Your request successfully submitted`);
				this.props.navigation.pop();
			} else if (error != '') {
				//constants.DropDownAlert.showDropdownAlert('error', 'Contact', error);
			}
		}
	};
	render() {
		return (
			<BaseView>
				<Header title={`Contacter Avocadoo`} navigation={this.props.navigation} isBack />
				<View style={styles.container}>
					<Subject
						onChangeText={(subject) => {
							this.setState({ subject });
						}}
					/>
					<Message
						onChangeText={(message) => {
							this.setState({ message });
						}}
					/>
					<View style={{ flex: 1 }} />
					<AvoButton
						isLoad
						style={styles.button}
						title="Envoyer"
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
	contactRequest
};
const mapStateToProps = (state) => {
	const { auth } = state.reducer;

	return {
		isWaiting: auth.isWaiting,
		accessToken: auth.accessToken,
		id: auth.id,
		error: auth.eMessage,
		contactSuccess: auth.contactSuccess,
		userData: auth.userData
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Contact);
