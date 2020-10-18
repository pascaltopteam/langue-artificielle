// Forth Screen

import React from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Platform, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';
import { AvoText, AvoSearch } from '../../../components';

import BaseComponent from '../../base';
import Base from '../../../components/base';
import StarRating from 'react-native-star-rating';
import SearchSettingPopup from '../../../components/searchSettingPopup';
import {
	IconSetting,
	IconPlusWBG,
	IconClock,
	IconBack
} from '../../../assets/svg';

import { 
	getFavoritesRequest, 
	searchFevRecRequest, 
	replaceMenuRequest,
	getInspirationRequest,
	getMenuRequest
} from '../../../actions';

import { getStatusBarHeight } from '../../../Utilities';
import styles from './styles.js';
import constants from '../../../const';

class AddRecipe extends BaseComponent {

	constructor(props) {
		super(props);

		this.state = {
			searchTxt: '',
			dialogShow: false,
			isRefresh: true,
			dialogShowSearch: false,
			searchResult: [],
			popupCount: 1,
			recipeType: [
				{ id: 1, name: `Entrée`, selected: false },
				{ id: 1, name: `Omnivore`, selected: false },
				{ id: 1, name: `Plat`, selected: false },
				{ id: 1, name: `Entrée`, selected: false }
			],
			DietType: [],
			filterList: [],
			old_recipe_uid: '',
			meal_id: '',
		};
	}

	componentDidMount = () => {
		const { userData, getFavoritesRequest, getInspirationRequest, navigation } = this.props;
		const { access_token, filters } = userData;

		const old_recipe_uid = navigation.getParam('old_recipe_uid');
		const meal_id = navigation.getParam('meal_id');
		this.setState({ old_recipe_uid, meal_id });

		// if (this.isValueAvailable(mealType)) {
		// 	params.mealType = mealType;
		// } else {
		// 	params.access_token = access_token;
		// }

		// if (this.isValueAvailable(old_meal_uid)) {
		// 	params.old_meal_uid = old_meal_uid;
		// } else {
		// 	params.access_token = access_token;
		// } 

		// if (this.isValueAvailable(meal_id)) {
		// 	params.meal_id = meal_id;
		// } else {
		// 	params.access_token = access_token;
		// }

		// if ("access_token" in params) {
		// 	getFavoritesRequest({ access_token }); 
		// } else {
		// 	getFavoritesRequest(params);
		// }
		getInspirationRequest({ access_token });

		if (this.isObjectAvailable(filters)) {
			const { diets } = filters;

			if (!this.isObjectAvailable(diets)) return;

			var array = [];
			const dietKeys = Object.keys(diets);
			dietKeys.map((item) => {
				const node = {
					selected: false,
					name: diets[item],
					key: item
				};
				array.push(node);
			});

			this.setState({ DietType: array });
		}
	};

	replaceMenu = new_recipe_uid => {
		const { userData, replaceMenuRequest } = this.props;
		const { meal_id, old_recipe_uid } = this.state;
		const { access_token } = userData;

		var params = {
			meal_id,
			old_recipe_uid,
			new_recipe_uid,
			type: 'main_course',
			access_token
		};
		replaceMenuRequest(params);
	};
	
	searchData = (searchTxt) => {
		const { searchFevRecRequest, userData } = this.props;
		const { access_token } = userData;

		if (searchTxt && searchTxt.length > 1) {
			searchFevRecRequest({ access_token, name: searchTxt, limit: 100 });
		}
	};

	componentDidUpdate = (prev) => {
		const { 
			favoritesObject, 
			isWaiting, 
			searchFavRecipeResult, 
			getMenuRequest, 
			replaceStatus, 
			navigation, 
			error, 
			userData 
		} = this.props;
		const { searchTxt, searchResult, filterList } = this.state;

		if (isWaiting) {
			constants.showLoader.showLoader();
		} else {
			constants.showLoader.hideLoader();
		}

		if (this.isObjectAvailable(error) && error != prev.error) {
			constants.DropDownAlert.showDropdownAlert('error', 'Error', error.message);
		}

		if (prev.replaceStatus != replaceStatus && replaceStatus) {
			constants.DropDownAlert.showDropdownAlert('success', 'Success', `Menu recipe replaced successfully`);
			getMenuRequest({ access_token: userData.access_token });
			navigation.pop();
		}

		if (this.isObjectAvailable(favoritesObject) && favoritesObject != prev.favoritesObject) {
			try {
				const { recipes } = favoritesObject;
				var array = [];
				recipes.map(recipe => {
					const { picture, name, total_time, uid } = recipe;
					array.push({
						imgUri: picture[constants.FIX_CONST.RECIPE_THUMB_SIZE],
						name,
						time: `${total_time} minutes`,
						uid
					});
				});
				if (JSON.stringify(array) !== JSON.stringify(filterList)) {
					this.setState({ filterList: array });
				}
			} catch (e) {
				console.log(e);
			}
		}

		if (this.isValueAvailable(searchFavRecipeResult) && searchTxt.length > 1) {
			var array = [];
			searchFavRecipeResult.map((item) => {
				array.push(item);
			});
			if (JSON.stringify(array) != JSON.stringify(searchResult)) {
				this.setState({ searchResult: array });
			}
		}
	};

	_renderItem = ({ item, index }) => {
		return (
			<TouchableOpacity
				key={index}
				style={styles.slide}
				activeOpacity={0.9}
				onPress={() => {}}
			>
				<FastImage
					style={styles.viewImg}
					source={{ uri: item.imgUri }}
				/>
				<AvoText 
					style={styles.descTxt} 
					fontWeight="bold" 
					text={item.name} 
				/>
				<View style={styles.rowContainer}>
					<View style={styles.rowView}>
						<IconClock width={20} height={20} />
						<AvoText
							style={{ marginHorizontal: 5, fontSize: constants.sizes.TXT_SIZE, color: 'black' }}
							fontWeight="normal"
							text={item.time}
						/>
					</View>
					<View style={styles.rowView}>
						{/* <StarRating
							disabled={true}
							maxStars={5}
							rating={item.rating}
							starSize={12}
							fullStarColor={'yellow'}
							emptyStarColor={'grey'}
							starStyle={{ marginHorizontal: 1 }}
							//selectedStar={(rating) => this.onStarRatingPress(rating)}
						/> */}

						{/* <AvoText
							style={{ marginHorizontal: 5, fontSize: constants.sizes.TXT_SIZE, color: 'black' }}
							fontWeight="normal"
							text={item.views}
						/> */}
					</View>
				</View>
				<View style={styles.borderStyle} />
				<TouchableOpacity
					style={[ styles.rowContainer, { justifyContent: 'center', width: '100%' } ]}
					onPress={() => this.replaceMenu(item.uid)}
				>
					<IconPlusWBG height={20} />
					<AvoText
						style={{ marginHorizontal: 10, fontSize: constants.sizes.TXT_SIZE, color: '#7283A7' }}
						fontWeight="light"
						text={`Choisir ce plat`}
					/>
				</TouchableOpacity>
			</TouchableOpacity>
		);
	};

	render() {
		const { navigation } = this.props;
		const { 
			recipeType, 
			filterList, 
			DietType, 
			popupCount, 
			dialogShowSearch,
		} = this.state;

		return (
			<Base>
				<View style={{
						backgroundColor: 'white',
						paddingTop: Platform.OS === 'android' ? 0 : getStatusBarHeight()
					}}
				>
					<View style={styles.searchBox}>
						<TouchableOpacity
							style={{marginRight: 10}}
							onPress={() => navigation.pop()}
						>
							<IconBack />
						</TouchableOpacity>
						<View
							style={{ flex: 1 }}
							activeOpacity={1}
							onTouchEnd={() => this.setState({ dialogShowSearch: true })}
						>
							<AvoSearch
								editable={false}
								autoFocus={false}
								placeholder={'Rechercher dans mon livre de recettes'}
							/>
						</View>
						<TouchableOpacity
							style={styles.settingBtn}
							onPress={() => this.setState({ dialogShow: true })}
						>
							<IconSetting />
						</TouchableOpacity>
					</View>
				</View>
				<FlatList
					data={filterList}
					renderItem={this._renderItem}
					extraData={this.state}
					contentContainerStyle={
						filterList.length < 1 ? (
							{
								justifyContent: 'center',
								alignItems: 'center',
								flex: 1
							}
						) : (
							{}
						)
					}
					showsVerticalScrollIndicator={false}
					style={{ backgroundColor: constants.colors.bg, flex: 1 }}
				/>

				<SearchSettingPopup
					recipeType={this.state.recipeType}
					FilterPopup={this.state.dialogShow}
					DietType={this.state.DietType}
					isWaiting={this.props.isWaiting}
					popupCount={this.state.popupCount}
					onFilterPopupGo={() => this.setState({ dialogShow: false })}
					onFilterPopupDismiss={() => this.setState({ dialogShow: false })}
					onRecipePress={(ind) => {
						this.state.recipeType[ind].selected = !recipeType[ind].selected;
						this.setState({ recipeType });
					}}
					onDietPress={(index) => {
						DietType.map((itm, ind) => {
							this.state.DietType[ind].selected = false;
						});
						this.state.DietType[index].selected = !DietType[index].selected;
						this.setState({ DietType });
					}}
					onPopupCountPress={(type) => {
						if (type == 0) {
							this.setState({ popupCount: popupCount > 1 ? popupCount - 1 : 1 });
						} else {
							this.setState({ popupCount: popupCount + 1 });
						}
					}}
					SearchPopup={dialogShowSearch}
					onSearchPopupDismiss={() => this.setState({ dialogShowSearch: false })}
					searchTxt={this.state.searchTxt}
					searchResult={this.state.searchResult}
					onSearchTxtChange={(searchTxt) => {
						this.setState({ searchTxt });
						this.searchData(searchTxt);
					}}
					onSearchResultPress={(searchItem) => {}}
				/>
			</Base>
		);
	}
}

const mapDispatchToProps = {
	getFavoritesRequest,
	searchFevRecRequest,
	replaceMenuRequest,
	getInspirationRequest,
	getMenuRequest
};

const mapStateToProps = (state) => {
	const { auth, menu, favorite, inspiration } = state.reducer;
	const { id, userData } = auth;
	const { searchFavRecipeResult, favoritesObject, error } = favorite;
	const { inspirationsObject } = inspiration;
	const { isWaiting, replaceStatus } = menu;

	return {
		isWaiting,
		favoritesObject: inspirationsObject,
		id,
		error,
		userData,
		searchFavRecipeResult,
		replaceStatus
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(AddRecipe);
