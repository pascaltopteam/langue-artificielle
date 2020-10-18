// Alergies component

import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

import { AvoText, AvoSearch, AvoButton } from '../../../components';
import { IconRectCheck, IconRect } from '../../../assets/svg';

import constants from '../../../const';

class Allergy extends React.Component {
	renderItem = (value, index) => {
		const { isCheck, title } = value;

		return (
			<TouchableOpacity
				onPress={() => this.props.onPress(value, index)}
				key={index}
				style={[ constants.styles.row, { alignItems: 'center', marginBottom: 26 } ]}
			>
				{isCheck == true ? <IconRectCheck width={20} height={20} /> : <IconRect width={20} height={20} />}
				<AvoText style={styles.item} text={title} />
			</TouchableOpacity>
		);
	};

	render() {
		const { allergyFood, title, isEnd, isLoading } = this.props;

		return (
			<View style={styles.container}>
				<AvoText fontWeight="bold" style={{marginBottom:10}} text={title} />
				{false && <AvoSearch placeholder="Rechercher" onChangeText={(txt)=>{this.props.onChangeSearchText(txt)}} autoFocus={false}/>}
				<ScrollView showsVerticalScrollIndicator={false}>
					{allergyFood.map((value, index) => this.renderItem(value, index))}
				</ScrollView>
				{isEnd && (
					<View style={{ paddingTop: 20 }}>
						<AvoButton
							isLoading={isLoading ? isLoading : false}
							style={styles.button}
							title={`C'est parti !`}
							onPress={this.props.onPressEnd}
						/>
					</View>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '90%'
	},
	search: {
		marginHorizontal: 16
	},
	item: {
		marginLeft: 8,
		fontSize: constants.sizes.TXT_SIZE
	}
});

Allergy.propTypes = {
	allergyFood: PropTypes.array
};

Allergy.defaultProps = {};

export default Allergy;
