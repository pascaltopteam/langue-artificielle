// Course Block

import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import PropTypes from 'prop-types';

import { AvoText } from '../../../components';
import { IconCheck, IconUncheck } from '../../../assets/svg';

import constants from '../../../const';

class CourseBlock extends React.Component {
	renderItem = (data, index) => {
		const { isChecked, itemName, itemValue } = data;
		const { onChangeValue } = this.props;
		debugger;
		return (
			<TouchableOpacity
				key={index}
				style={[ constants.styles.row, styles.item ]}
				activeOpacity={1}
				onPress={() => onChangeValue(index)}
			>
				{isChecked ? <IconCheck width={20} height={20} /> : <IconUncheck width={20} height={20} />}
				<AvoText style={isChecked ? styles.itemStrokeTitle : styles.itemTitle} text={itemName} />
				<AvoText style={styles.itemValue} fontWeight="bold" text={itemValue} />
			</TouchableOpacity>
		);
	};

	render() {
		return (
			<View style={styles.container}>
				{/* <AvoText
          text={this.props.title}
          fontWeight='bold'
          style={styles.title}
        /> */}

				<View>
					<FlatList
						data={this.props.data}
						renderItem={({ item, index }) => {
							return (
								<TouchableOpacity
									key={index}
									style={[ constants.styles.row, styles.item ]}
									activeOpacity={1}
									onPress={() => this.props.onChangeValue(index)}
								>
									{item.isChecked ? (
										<IconCheck width={20} height={20} />
									) : (
										<IconUncheck width={20} height={20} />
									)}
									<AvoText
										style={item.isChecked ? styles.itemStrokeTitle : styles.itemTitle}
										text={item.itemName}
									/>
									<AvoText style={styles.itemValue} fontWeight="bold" text={item.itemValue} />
								</TouchableOpacity>
							);
						}}
						extraData={this.state}
					/>
				</View>
				{/* <View>
					{this.props.data.map((item, index) => {
						return (
							<TouchableOpacity
								key={index}
								style={[ constants.styles.row, styles.item ]}
								activeOpacity={1}
								onPress={() => this.props.onChangeValue(index)}
							>
								{item.isChecked ? (
									<IconCheck width={20} height={20} />
								) : (
									<IconUncheck width={20} height={20} />
								)}
								<AvoText
									style={item.isChecked ? styles.itemStrokeTitle : styles.itemTitle}
									text={item.itemName}
								/>
								<AvoText style={styles.itemValue} fontWeight="bold" text={item.itemValue} />
							</TouchableOpacity>
						);
					})}
				</View> */}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		paddingTop: 10
	},
	title: {
		fontSize: constants.sizes.TXT_SIZE,
		marginBottom: 16
	},
	item: {
		marginBottom: 14,
		alignItems: 'center'
	},
	itemTitle: {
		flex: 1,
		marginLeft: 10,
		fontSize: constants.sizes.TXT_SIZE
	},
	itemStrokeTitle: {
		flex: 1,
		marginLeft: 10,
		fontSize: constants.sizes.TXT_SIZE,
		textDecorationLine: 'line-through'
	},
	itemValue: {
		fontSize: constants.sizes.TXT_SIZE,
		color: constants.colors.placeholder
	}
});

CourseBlock.propTypes = {
	title: PropTypes.string,
	data: PropTypes.array,
	onChangeValue: PropTypes.func
};

CourseBlock.defaultProps = {
	title: '',
	data: []
};

export default CourseBlock;
