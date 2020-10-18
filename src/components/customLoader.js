import React, { Component } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import constants from '../const';
import AvoText from './avoText';

export default class CustomLoader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isVisible: false,
			color: '',
			message: 'Loading...'
		};
	}

	showLoader = (message, color) => {
		this.setState({
			isVisible: true,
			color: constants.colors.tint,
			message: message ? message : 'Loading...'
		});
	};

	hideLoader = () => {
		this.setState({
			isVisible: false
		});
	};

	render() {
		const { isVisible } = Object.keys(this.props).length > 0 ? this.props : this.state;

		return (
			<View
				style={{
					elevation: 10,
					position: 'absolute',
					width: isVisible ? '100%' : '0%',
					height: isVisible ? '100%' : '0%',
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: 'transparent'
				}}
			>
				{isVisible && (
					<View
						style={{
							maxHeight: 200,
							backgroundColor: constants.colors.tint,
							justifyContent: 'space-evenly',
							alignItems: 'center',
							borderRadius: 12,
							paddingVertical: 15,
							paddingHorizontal: 10,
						}}
					>
						<ActivityIndicator
							size={this.state.message ? 'small' : 'large'}
							color={'#fff'}
						/>
						<AvoText 
							style={{color:'white',fontSize:constants.sizes.TXT_SIZE-2,marginTop:10}}
							text={this.state.message}
						/>
					</View>
				)}
			</View>
		);
	}
}
