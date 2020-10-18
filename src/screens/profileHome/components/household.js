// Profile Ingredient

import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import BaseComponent from '../../base';
import { AvoText } from '../../../components';
import { IconAdult, IconAdultGrey, IconChild, IconChildGrey } from '../../../assets/svg';

import constants from '../../../const';

class Household extends BaseComponent {

	constructor(props) {
		super(props);

		this.state = {
			adults: [true, false, false, false, false],
			childs: [false, false, false, false, false],
		}
	}

	componentDidMount() {
		const { userData } = this.props;

		if (!this.isAuthenticated()) return;

		const { family_members } = userData;
		if (this.isObjectAvailable(family_members)) {
			const { adult, child } = family_members;
			var adults = this.state.adults;
			var childs = this.state.childs;

			if (this.isValueAvailable(adult)) {
				for (var i = 0; i < adult; i++) {
					adults[i] = true;
				}
			}
			if (this.isValueAvailable(child)) {
				for (var i = 0; i < child; i++) {
					childs[i] = true;
				}
			}
			this.setState({ adults, childs });
		}
	}

	onBtnAdult = (value, index) => {
		const { onPressAdult } = this.props;
		const { adults } = this.state;
		var array = adults;

		adults.map((item, i) => {
			if (index >= i) {
				array[i] = true;
			} else {
				array[i] = false;
			}
		});

		this.setState({ adults: array });
		onPressAdult(index);
	}

	onBtnChild = (value, index) => {
		const { onPressChild } = this.props;
		const { childs } = this.state;
		var ind = 0;
		var array = childs;

		if (index == 0 && value == true && childs[1] == false) {
			ind = -1;
			array = [false, false, false, false, false];
		} else {
			ind = index;
			childs.map((item, i) => {
				if (index >= i) {
					array[i] = true;
				} else {
					array[i] = false;
				}
			});
		}

		this.setState({ childs: array });
		onPressChild(ind);
	}

	getCountAdultsOrChilds = array => {
		var count = 0;
		array.map(item => {
			if (item == true) count++;
		})
		return count;
	}

	renderAdults = () => {
		const { adults } = this.state;

		return (
			<View style={[constants.styles.row, { width: '100%', justifyContent: 'space-between' }]}>
				{
					adults.map((value, index) =>
						<TouchableOpacity
							key={index}
							style={[
								styles.cardStyle,
								{
									backgroundColor: value == true ? 'white' : 'transparent',
									borderColor: value == true ? 'white' : constants.colors.separator
								}
							]}
							activeOpacity={0.8}
							onPress={() => this.onBtnAdult(value, index)}
						>
							{
								value == true ?
									<IconAdult width={styles.icon.width} height={styles.icon.height} />
									:
									<IconAdultGrey width={styles.icon.width} height={styles.icon.height} />
							}
						</TouchableOpacity>
					)
				}
			</View>
		);
	};

	renderChildren = () => {
		const { childs } = this.state;

		return (
			<View style={[constants.styles.row, { width: '100%', justifyContent: 'space-between' }]}>
				{
					childs.map((value, index) =>
						<TouchableOpacity
							key={index}
							style={[
								styles.cardStyle,
								{
									backgroundColor: value == true ? 'white' : 'transparent',
									borderColor: value == true ? 'white' : constants.colors.separator
								}
							]}
							activeOpacity={0.8}
							onPress={() => this.onBtnChild(value, index)}
						>
							{
								value == true ?
									<IconChild width={styles.icon.width} height={styles.icon.height} />
									:
									<IconChildGrey width={styles.icon.width} height={styles.icon.height} />
							}
						</TouchableOpacity>
					)
				}
			</View>
		);
	};

	render() {
		const { childs, adults } = this.state;
		const adultsNumber = this.getCountAdultsOrChilds(adults);
		const childsNumber = this.getCountAdultsOrChilds(childs);

		return (
			<View style={styles.container}>
				<AvoText
					style={styles.title}
					fontWeight="bold"
					text={`On adapte nos recettes à ton foyer. Dis-nous qui vit avec toi sous ton toit ?`}
				/>
				<AvoText 
					style={{ marginBottom: 10, fontSize: 14 }} 
					text={`${adultsNumber} ${adultsNumber == 1 ? 'adulte' : 'adultes'}`}
					fontWeight='light'
				/>
				{this.renderAdults()}

				<AvoText
					style={{ marginBottom: 10, fontSize: 14, marginTop: 26 }}
					text={`${childsNumber == 1 ? childsNumber + ' enfant' : childsNumber == 0 ? "Pas d'enfants" : childsNumber + " enfants"}`}
					fontWeight='light'
				/>
				{this.renderChildren()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: '100%'
	},
	title: {
		fontSize: 14,
		marginBottom: 30
	},
	cardStyle: {
		backgroundColor: 'white',
		borderRadius: 5,
		borderWidth: 1,
		borderColor: 'white',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10
	},
	icon: {
		width: constants.screen.width * 0.09,
		height: constants.screen.width * 0.13
	}
});

Household.propTypes = {
	adults: PropTypes.array
};

Household.defaultProps = {};

const mapDispatchToProps = {};
const mapStateToProps = (state) => {
	const { auth } = state.reducer;

	return {
		userData: auth.userData
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Household);