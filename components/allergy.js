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
		const { allergyFood, title,isEnd } = this.props;

		return (
			<View style={styles.container}>
				<AvoText fontWeight="bold" text={title} />
				<AvoSearch autoFocus={false} placeholder="Rechercher" />
        <ScrollView showsVerticalScrollIndicator={false}>
				{allergyFood.map((value, index) => this.renderItem(value, index))}
        </ScrollView>
        {isEnd && <AvoButton 
            style={styles.button}
            title='Enregistrer'
            onPress={this.props.onPressEnd}
          />}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
    width: '100%',
    height:'90%'
	},
	search: {
		marginHorizontal: 16
	},
	item: {
		marginLeft: 8,
		fontSize: 14
	}
});

Allergy.propTypes = {
	allergyFood: PropTypes.array
};

Allergy.defaultProps = {};

export default Allergy;
