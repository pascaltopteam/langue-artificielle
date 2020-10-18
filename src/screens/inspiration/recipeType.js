import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import constants from '../../const';
import styles from './styles';
import { AvoText, AvoButton } from '../../components';
import { connect } from 'react-redux';
import { ImageCancelTxt } from '../../assets/svg';

class RecipeType extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			recipeTypes: [
				{ name: 'Starter', type: 0 },
				{ name: 'Main Course', type: 1 },
				{ name: 'Dessert', type: 2 }
			],
			selectedType: 0
		};
	}

	componentDidMount() {}
	renderItem = ({ item, index }) => {
		return (
			<TouchableOpacity
				onPress={() => {
					this.setState({
						selectedType: item.type
					});
				}}
				activeOpacity={0.8}
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					backgroundColor: this.state.selectedType == item.type ? constants.colors.select : 'rgba(0,0,0,0)',
					marginVertical: 3,
					marginHorizontal: 10,
					padding: 10,
					borderRadius: 7
				}}
			>
				<Image
					resizeMode={'contain'}
					source={require('../../assets/png/spoon.png')}
					style={[
						styles.iconStyleRow,
						{
							tintColor:
								this.state.selectedType == item.type ? constants.colors.tint : constants.colors.grey
						}
					]}
				/>
				<AvoText
					style={{ fontSize: constants.sizes.TXT_SIZE + 1, color: 'black', flex: 1, marginLeft: 10 }}
					fontWeight={this.state.selectedType == item.type ? 'bold' : 'normal'}
					text={item.name}
				/>
				{this.state.selectedType == item.type && (
					<Image
						resizeMode={'contain'}
						source={require('../../assets/png/selectRow.png')}
						style={styles.iconStyleRow}
					/>
				)}
			</TouchableOpacity>
		);
	};
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.statusStyle}>
					<ImageCancelTxt
						onPress={() => {
							this.props.navigation.pop();
						}}
						style={styles.iconStyle}
					/>
					<AvoText style={styles.titleTxt} fontWeight={'bold'} text={'Type de recette'} />
					<View styles={styles.iconStyle} />
				</View>
				<FlatList
					style={{ width: constants.screen.width }}
					data={this.state.recipeTypes}
					extraData={this.state}
					renderItem={this.renderItem}
				/>
				<AvoButton
					isLoading={this.props.isWaiting}
					style={styles.button}
					title="Annuler !"
					onPress={() => {
						this.onBtnSubmit();
					}}
				/>
			</View>
		);
	}
}
const mapDispatchToProps = {};
const mapStateToProps = (state) => {
	const { auth } = state.reducer;

	return {
		isWaiting: auth.isWaiting,
		error: auth.eMessage,
		userData: auth.userData
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(RecipeType);
