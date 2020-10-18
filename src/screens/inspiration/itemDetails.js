// Second Screen

import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, TouchableOpacity, BackHandler, FlatList, Animated } from 'react-native';
import FastImage from 'react-native-fast-image';
import Timeline from 'react-native-timeline-flatlist';
import Dialog, { SlideAnimation, DialogContent } from 'react-native-popup-dialog';

import BaseComponent from '../base';
import { updateFavoriteRequest, getRecipeByIdRequest, addToMenuRequest } from '../../actions';
import { AvoText } from '../../components';
import {
	IconBack,
	IconHeartPopIcon,
	IconFoodBG,
	IconClock,
	IconCooker,
	IconForkKnife,
	IconWorld,
	IconMinus,
	IconPlus,
	PlaceholderImg,
	IconBellPopup,
	ImageHeader,
	ImageHeaderX
} from '../../assets/svg';
import constants from '../../const';
import styles from './styles';

class ItemDetails extends BaseComponent {

	constructor(props) {
		super(props);
		this.state = {
			count: 0,
			opacity: 0,
			showHeader: false,
			name: '',
			currentStap: 1,
			servingsCount: 0,
			uid: '',
			preparationTime: 0,
			ingredientListLive: [],
			cookingTime: 0,
			dialogShow: false,
			imgUrl: '',
			recipeStatus: [],
			animation: new Animated.Value(0),
			ingredientList: [],
			carbonFoot: 0,
			season: false,
			ingredients: [{ id: 1, name: 'De saison' }]
		};
	}

	componentDidMount() {
		const { navigation, userData, getRecipeByIdRequest } = this.props;
		const uid = navigation.state.params.id;
		const { access_token } = userData;

		if (uid != undefined) {
			const params = { access_token, uid };
			getRecipeByIdRequest(params);
		}
	}

	componentDidUpdate = prevProps => {
		const {
			isUpdatedFavorite,
			isLoadingFavorite,
			isLoadingRecipe,
			recipeObject,
			isAddedMenu,
			isLoadingMenu
		} = this.props;

		// if (isWaiting) {
		// 	constants.showLoader.showLoader();
		// } else {
		// 	constants.showLoader.hideLoader();
		// }

		if (prevProps.isAddedMenu != isAddedMenu && isAddedMenu) {
			constants.DropDownAlert.showDropdownAlert('success', 'Success', `Recette ajoutée :)`);
		}

		if (
			this.isValueAvailable(isUpdatedFavorite) &&
			prevProps.isUpdatedFavorite != isUpdatedFavorite &&
			isUpdatedFavorite == true
		) {
			constants.DropDownAlert.showDropdownAlert(
				'success',
				'Favorite Recipe',
				`Recipe successfully added to favorite!`
			);
		}

		if (!this.isObjectAvailable(recipeObject)) return;

		const { recipe } = recipeObject;
		if (this.isObjectAvailable(recipe)) return;

		const { ingredients, description } = recipe;
		if (!this.isObjectAvailable(description)) return;

		var array = [];
		const icon = require('../../assets/images/unSelected.png');

		description.map((item, index) => {
			const node = {
				id: index + 1,
				time: '',
				lineColor: constants.colors.grey,
				icon,
				description: '',
				title: item
			}
			array.push(node);
		});

		const { uid, name, picture, season, servings, carbon_footprint, preparation_time, cook_time } = recipe;
		this.setState({
			season: this.isValueAvailable(season) ? season : false,
			count: servings,
			servingsCount: servings,
			imgUrl: picture[constants.FIX_CONST.RECIPE_THUMB_SIZE],
			ingredientList: ingredients,
			ingredientListLive: ingredients,
			recipeStatus: array,
			carbonFoot: carbon_footprint,
			name: name,
			preparationTime: preparation_time,
			cookingTime: cook_time,
			uid
		});
	};

	addToMenu = () => {
		const { error, userData, addToMenuRequest, navigation } = this.props;
		const { uid } = this.state;

		if (!this.isObjectAvailable(userData)) return;

		const { access_token } = userData;
		const params = {
			access_token,
			main_course_uid: uid
		};
		addToMenuRequest(params);
	};

	startAnimation = () => {
		Animated.timing(this.state.animation, {
			toValue: 0,
			timing: 400
		}).start(() => {
			Animated.timing(this.state.animation, {
				toValue: 1,
				duration: 400
			}).start();
		});
	};

	hardwareBackPress = () => {
		if (this.state.dialogShow) {
			this.setState({
				dialogShow: false
			});
			return true;
		}
	};

	onEventComplete = (event) => {
		var isComp = false;
		var arr = [];
		this.state.recipeStatus.map((itm, ind) => {
			var arrNode = itm;

			if (isComp) {
				arrNode.lineColor = constants.colors.grey;
				arrNode.icon = require('../../assets/images/unSelected.png');
			} else {
				arrNode.lineColor = constants.colors.tint;
				arrNode.icon = require('../../assets/images/selected.png');
			}
			if (itm.id == event.id) {
				isComp = true;
			}
			arr.push(arrNode);
		});
		this.setState({
			recipeStatus: arr
		});
	};

	_renderItem = ({ item, index }) => {
		return (
			<View style={styles.slide}>
				<FastImage
					style={{ width: 200, height: 200 }}
					source={{
						uri: this.state.imgUrl
					}}
				/>
			</View>
		);
	};
	_renderIngredients = ({ item, index }) => {
		return (
			<View style={{ backgroundColor: constants.colors.greenBg, marginRight: 10, borderRadius: 10 }}>
				<AvoText style={styles.ingrTxt} fontWeight="bold" text={item.name} />
			</View>
		);
	};
	dialogPop = () => {
		return (
			<Dialog
				containerStyle={{ justifyContent: 'flex-end' }}
				onDismiss={() => {
					this.setState({ dialogShow: false });
				}}
				rounded
				dialogStyle={{
					backgroundColor: 'rgba(0,0,0,0)'
				}}
				width={1}
				onTouchOutside={() => {
					this.setState({ dialogShow: false });
				}}
				visible={this.state.dialogShow}
				dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
			>
				<DialogContent style={{ paddingVertical: 50 }}>
					<View style={{ alignItems: 'center', backgroundColor: 'white', borderRadius: 25 }}>
						<IconBellPopup style={{ marginTop: -40 }} width={80} height={80} />
						<AvoText
							style={styles.popupTxt}
							fontWeight="normal"
							text={`Souhaitez-vous ajouter cette recette à votre menu ?`}
						/>
						<TouchableOpacity
							onPress={() => {
								this.setState(
									{
										dialogShow: false
									},
									() => {
										//this.props.navigation.navigate('RecipeType');
										this.addToMenu();
									}
								);
							}}
							style={[styles.btnStyle, { backgroundColor: constants.colors.tint }]}
						>
							<AvoText style={[styles.recipeTxt, { color: 'white' }]} fontWeight="bold" text={`Oui`} />
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								this.setState({
									dialogShow: false
								});
							}}
							style={[styles.btnStyle, { backgroundColor: 'white' }]}
						>
							<AvoText
								style={[styles.recipeTxt, { color: constants.colors.grey }]}
								fontWeight="bold"
								text={`Non merci`}
							/>
						</TouchableOpacity>
					</View>
				</DialogContent>
			</Dialog>
		);
	};
	ingredientDec = () => {
		var countOf = this.state.count > 1 ? this.state.count - 1 : 1;
		addArr = [];
		this.ingredientListLive.map((item, index) => {
			var arrNode = item;
			var totalQty = 0;
			var unit = item.unit;
			if (this.isInt(item.quantity) || this.isFloat(item.quantity)) {
				var qtyOne = item.quantity / this.state.servingsCount;
				totalQty = qtyOne * countOf;
				if (item.unit.toString().toLowerCase() == 'g') {
					unit = totalQty > 999 ? 'kg' : unit;
					totalQty = totalQty > 999 ? totalQty / 1000 : totalQty;
				} else if (item.unit.toString().toLowerCase() == 'kg') {
					unit = totalQty < 1 ? 'g' : unit;
					totalQty = totalQty < 1 ? totalQty * 1000 : totalQty;
				}
				totalQty = this.isInt(totalQty) ? totalQty : parseFloat(totalQty).toFixed(2);
			} else {
				totalQty = null;
			}
			addArr.push({ ...arrNode, quantity: totalQty, unit: unit });
		});

		this.setState({
			ingredientList: addArr,
			count: countOf
		});
	};
	ingredientInc = () => {
		addArr = [];
		countOf = this.state.count + 1;
		this.ingredientListLive.map((item, index) => {
			arrNode = item;
			var totalQty = 0;
			var unit = item.unit;
			if (this.isInt(item.quantity) || this.isFloat(item.quantity)) {
				var qtyOne = item.quantity / this.state.servingsCount;
				totalQty = qtyOne * countOf;
				if (item.unit.toString().toLowerCase() == 'g') {
					unit = totalQty > 999 ? 'kg' : unit;
					totalQty = totalQty > 999 ? totalQty / 1000 : totalQty;
				} else if (item.unit.toString().toLowerCase() == 'kg') {
					unit = totalQty < 1 ? 'g' : unit;
					totalQty = totalQty < 1 ? totalQty * 1000 : totalQty;
				}
				totalQty = this.isInt(totalQty) ? totalQty : parseFloat(totalQty).toFixed(2);
			} else {
				totalQty = null;
			}
			addArr.push({ ...arrNode, quantity: totalQty, unit: unit });
		});
		this.setState({
			ingredientList: addArr,
			count: countOf
		});
	};
	isInt = (n) => {
		return Number(n) === n && n % 1 === 0;
	};

	isFloat = (n) => {
		return Number(n) === n && n % 1 !== 0;
	};

	renderNavBar = () => {
		const { navigation } = this.props;
		const { width } = constants.screen;
		const buttonStyle = { padding: 10 };

		return (
			<View style={styles.navContainer}>
				<View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
					<TouchableOpacity
						style={buttonStyle}
						activeOpacity={0.8}
						onPress={() => navigation.pop()}
					>
						<IconBack width={width * 0.12} height={width * 0.12} />
					</TouchableOpacity>
					<TouchableOpacity
						style={buttonStyle}
						activeOpacity={0.8}
						onPress={() => this.addToFev()}
					>
						<IconHeartPopIcon width={width * 0.12} height={width * 0.12} />
					</TouchableOpacity>
				</View>

				<View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
					<TouchableOpacity
						style={buttonStyle}
						circleColor={'#fff'}
						activeOpacity={0.8}
						onPress={() => { }}
					/>
					<TouchableOpacity
						style={buttonStyle}
						activeOpacity={0.8}
						onPress={() => this.setState({ dialogShow: true })}
					>
						<IconFoodBG width={width * 0.12} height={width * 0.12} />
					</TouchableOpacity>
				</View>
			</View>
		)
	};

	onScrollEvent = (event) => {
		var yVal = event.nativeEvent.contentOffset.y;
		var heightVal = constants.screen.height;
		var minVal = constants.isIphoneX ? (constants.screen.width + 4) * 0.5 : (constants.screen.width + 4) * 0.38;
		var maxVal = heightVal * 0.13;
		const { animation } = this.state;
		if (yVal > minVal && this.state.showHeader == false) {
			// this.state.showHeader = false;
			// this.setState({
			// 	showHeader: true
			// });

			Animated.timing(animation, {
				toValue: 1,
				duration: 1000
			}).start(() => {
				this.state.showHeader = true;
				this.setState({ showHeader: this.state.showHeader }); //set the new state, so the next click will have different value
			});
		} else if (yVal < minVal && this.state.showHeader) {
			// this.state.showHeader = true;
			// this.setState({
			// 	showHeader: false
			// });

			Animated.timing(animation, {
				toValue: 0,
				duration: 1000
			}).start(() => {
				this.state.showHeader = false;
				this.setState({ showHeader: this.state.showHeader }); //set the new state, so the next click will have different value
			});
		}
	};
	addToFev() {
		const { error, userData, updateFavoriteRequest } = this.props;

		if (userData != undefined && error == '' && Object.keys(userData).length > 0) {
			params = {
				access_token: userData.access_token,
				action: 'add',
				id: this.state.uid
			};
			updateFavoriteRequest(params);
		} else if (error != '') {
			//alert(error);
		}
	}

	renderContent = () => {
		return (
			<ScrollView
				scrollEventThrottle={16}
				onScroll={(event) => this.onScrollEvent(event)}
				bounces={false}
				showsVerticalScrollIndicator={false}
				style={{
					backgroundColor: 'rgba(0,0,0,0)',
					width: constants.screen.width,
					alignSelf: 'center'
				}}
			>
				<View style={{ height: constants.screen.width / 1.4, backgroundColor: 'rgba(0,0,0,0)' }}>
					{this.state.showHeader == false && this.renderNavBar()}
				</View>
				<View
					ref={(viewRef) => (this.viewRef = viewRef)}
					onLayout={(event) => {
						const layout = event.nativeEvent.layout;
						//console.log('height:', layout.height);
						//console.log('width:', layout.width);
						//console.log('x:', layout.x);
						//console.log('y:', layout.y);
					}}
					style={{
						backgroundColor: '#fff',
						borderTopRightRadius: 40,
						borderTopLeftRadius: 40,
						paddingTop: 13,
						marginTop: -50,
						paddingHorizontal: constants.screen.width * 0.05
					}}
				>
					<AvoText style={styles.descTxtTitle} fontWeight="bold" text={this.state.name} />
					{this.state.season && (
						<FlatList
							data={this.state.ingredients}
							renderItem={this._renderIngredients}
							extraData={this.state}
							horizontal={true}
							showsHorizontalScrollIndicator={false}
							style={{ width: constants.screen.width }}
						/>
					)}
					<View style={styles.rowContainerDetails}>
						<View style={styles.boxContainer}>
							<IconClock width={20} height={20} />
							<AvoText
								style={styles.recipeTxtSmall}
								fontWeight="normal"
								text={`Préparation ${this.state.preparationTime} minutes`}
							/>
						</View>
						<View style={styles.boxContainer}>
							<IconCooker width={20} height={20} />
							<AvoText
								style={styles.recipeTxtSmall}
								fontWeight="normal"
								text={`Cuisson ${this.state.cookingTime} minutes`}
							/>
						</View>
						<View style={styles.boxContainer}>
							<IconForkKnife width={20} height={20} />
							<AvoText style={styles.recipeTxtSmall} fontWeight="normal" text={`Difficulté Moyenne`} />
						</View>
					</View>
					<View style={styles.rowContainerCenter}>
						<IconWorld width={20} height={20} />
						<AvoText
							style={[styles.detailTxt, { marginRight: 15, marginLeft: 10 }]}
							fontWeight="normal"
							text={`Emprunte carbone`}
						/>
						<AvoText
							style={styles.detailTxt}
							fontWeight="normal"
							text={`${this.state.carbonFoot}g / portion`}
						/>
					</View>
					<View style={styles.borderStyle} />
					<View style={styles.rowContainerDetails}>
						<View style={{ flex: 1 }}>
							<AvoText
								style={[styles.title, { marginBottom: 7 }]}
								fontWeight="bold"
								text={`Ingrédients`}
							/>
							<AvoText
								style={[styles.title, { fontSize: constants.sizes.TXT_SIZE }]}
								fontWeight="normal"
								text={`Choisissez le nb. de personnes`}
							/>
						</View>
						<View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
							<TouchableOpacity
								onPress={() => {
									this.ingredientDec();
								}}
								style={[styles.optBtn, { marginRight: 10 }]}
							>
								<IconMinus width={15} height={15} />
							</TouchableOpacity>
							<AvoText
								style={[styles.title, { width: 30, textAlign: 'center', marginTop: 2 }]}
								fontWeight="Bold"
								text={this.state.count}
							/>
							<TouchableOpacity
								onPress={() => {
									this.ingredientInc();
								}}
								style={[styles.optBtn, { marginLeft: 10 }]}
							>
								<IconPlus width={15} height={15} />
							</TouchableOpacity>
						</View>
					</View>
					{this.state.ingredientList.map((recItem, recIndex) => {
						return (
							<View style={[styles.rowContainerDetails, { marginVertical: 5 }]}>
								<PlaceholderImg width={40} height={40} />
								<AvoText style={styles.flexTxt} fontWeight="bold" text={recItem.name} />
								<AvoText
									style={styles.flexTxtLight}
									fontWeight="light"
									text={`${recItem.quantity ? recItem.quantity + ' ' : ''}${recItem.unit}`}
								/>
							</View>
						);
					})}
					<View style={styles.borderStyle} />
					<AvoText style={[styles.title, { marginBottom: 10 }]} fontWeight="bold" text={'Recette'} />

					<Timeline
						onEventPress={(event) => {
							this.onEventComplete(event);
						}}
						titleStyle={{
							color: 'black',
							fontSize: constants.sizes.TXT_SIZE,
							fontFamily: 'Gotham-Book',
							fontWeight: '400',
							marginTop: -10
						}}
						circleSize={20}
						innerCircle={'icon'}
						circleColor={'#fff'}
						showTime={false}
						data={this.state.recipeStatus}
						options={{ bounces: false }}
					/>
				</View>
			</ScrollView>
		);
	};
	customHeader = (animatedStyle) => {
		return (
			<Animated.View style={[styles.containerHeader, animatedStyle]}>
				<View style={styles.bg}>
					{constants.isIphoneX ? (
						<ImageHeaderX width={styles.bg.width} height={styles.bg.height} />
					) : (
							<ImageHeader width={styles.bg.width} height={styles.bg.height} />
						)}
				</View>
				<View
					style={{
						justifyContent: 'space-between',
						flexDirection: 'row',
						alignItems: 'center',
						width: '100%'
					}}
				>
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={() => {
							this.props.navigation.pop();
						}}
						style={{ padding: 10 }}
					>
						<IconBack width={constants.screen.width * 0.12} height={constants.screen.width * 0.12} />
					</TouchableOpacity>
					<View style={{ flexDirection: 'row' }}>
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={() => this.setState({ dialogShow: true })}
							style={{ padding: 10, marginRight: 10 }}
						>
							<IconFoodBG width={constants.screen.width * 0.12} height={constants.screen.width * 0.12} />
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={() => {
								this.addToFev();
							}}
							style={{ padding: 10 }}
						>
							<IconHeartPopIcon
								width={constants.screen.width * 0.12}
								height={constants.screen.width * 0.12}
							/>
						</TouchableOpacity>
					</View>
				</View>
			</Animated.View>
		);
	};
	render() {
		const { animation } = this.state;
		const animatedStyle = { opacity: animation };

		return (
			<View style={{ paddingTop: 0, backgroundColor: 'white', flex: 1 }}>
				{this.customHeader(animatedStyle)}
				<FastImage
					source={{
						uri: this.state.imgUrl
					}}
					style={{
						width: constants.screen.width,
						height: constants.screen.width / 1.4,
						position: 'absolute',
						zIndex: -1,
						left: 0,
						right: 0,
						top: 0
					}}
				/>
				{this.renderContent()}
				{this.dialogPop()}
			</View>
		);
	}
}

const mapDispatchToProps = {
	updateFavoriteRequest,
	getRecipeByIdRequest,
	addToMenuRequest
};

const mapStateToProps = (state) => {
	const { auth, menu, recipe, favorite } = state.reducer;
	const { userData } = auth;
	const { isAddedMenu } = menu;
	const { recipeObject } = recipe;
	const { isUpdatedFavorite } = favorite;

	return {
		userData,
		isUpdatedFavorite,
		isLoadingFavorite: favorite.isLoading,
		isAddedMenu,
		isLoadingMenu: menu.isLoading,
		recipeObject,
		isLoadingRecipe: recipe.isLoading,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetails);
