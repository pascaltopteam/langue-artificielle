import React from 'react';
import { View, Image, ScrollView, TouchableOpacity, TextInput, Platform, BackHandler, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';
import { AvoText, AvoDropdown, AvoSearch, AvoSqureCheck, AvoButton } from '../../components';
import Base from '../../components/base';
import { Header } from '../../components';
import styles from './styles.js';
import { IconSetting, IconPlusWBG, IconSettingPopup, IconMinusGreen, IconPlusGreen, IconBack } from '../../assets/svg';
import constants from '../../const';
import { connect } from 'react-redux';
import { favoriteRequest, searchFevRecRequest, addToMenuRequest } from '../../actions/authActions';
import SearchSettingPopup from '../../components/searchSettingPopup';

class Favorite extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTxt: '',
			dialogShow: false,
			isRefresh: true,
			dialogShowSearch: false,
			searchResult: [],
			isWaitingLoading: false,
			popupCount: 1,
			recipeType: [
				{ id: 1, name: `Entrée`, selected: false },
				{ id: 1, name: `Omnivore`, selected: false },
				{ id: 1, name: `Plat`, selected: false },
				{ id: 1, name: `Entrée`, selected: false }
			],
			DietType: [],
			filterList: []
		};
	}
	getImageFromKey = (key) => {
		if (key.toString().toLowerCase() == 'omnivore') {
			return require('../../assets/png/omni.png');
		} else if (key.toString().toLowerCase() == 'pescetarian') {
			return require('../../assets/png/pesc.png');
		} else if (key.toString().toLowerCase() == 'vegan') {
			return require('../../assets/png/vegan.png');
		} else if (key.toString().toLowerCase() == 'vegetarian') {
			return require('../../assets/png/veg.png');
		} else {
			return require('../../assets/png/omni.png');
		}
	};
	hardwareBackPress = () => {
		if (this.state.dialogShow) {
			this.setState({
				dialogShow: false
			});
			return true;
		}
		if (this.state.dialogShowSearch) {
			this.setState({
				dialogShowSearch: false
			});
			return true;
		}
	};
	_renderItem = ({ item, index }) => {
		return (
			<TouchableOpacity
				onPress={() => {
					this.props.navigation.push('ItemDetails', { id: item.uid });
				}}
				activeOpacity={0.9}
				style={styles.slide}
			>
				<FastImage
					style={styles.viewImg}
					source={{
						uri: item.imgUri
					}}
				/>
				<AvoText style={styles.descTxt} fontWeight="bold" text={item.description} />
				<View style={styles.borderStyle} />
				<TouchableOpacity
					onPress={() => {
						this.addToMenu(item.uid);
					}}
					style={[ styles.rowContainer, { justifyContent: 'center', width: '100%' } ]}
				>
					<IconPlusWBG height={20} />
					<AvoText
						style={{ marginHorizontal: 10, fontSize: constants.sizes.INPUT_TXT_SIZE, color: '#7283A7' }}
						fontWeight="light"
						text={`Ajouter aux menus`}
					/>
				</TouchableOpacity>
			</TouchableOpacity>
		);
	};
	addToMenu = (uid) => {
		const { error, userData, addToMenuRequest, navigation } = this.props;
		if (userData != undefined && Object.keys(userData).length > 0) {
			params = {
				access_token: userData.access_token,
				main_course_uid: uid
			};
			this.state.isWaitingLoading = true;
			debugger
			addToMenuRequest(params);
		} else if (error != '') {
			//alert(error);
		}
	};
	searchData = (searchTxt) => {
		const { searchFevRecRequest, userData } = this.props;
		if (searchTxt && searchTxt.length > 1 && userData.access_token != undefined) {
			searchFevRecRequest({ access_token: userData.access_token, name: searchTxt, limit: '20' });
		}
	};
	componentDidUpdate = (prev) => {
		const { favData, isWaiting, searchIndArr, addMenuStatus } = this.props;
		if (prev.addMenuStatus != addMenuStatus && addMenuStatus == true) {
			constants.DropDownAlert.showDropdownAlert('success', 'Success', `Recette ajoutée :)`);
			constants.showLoader.hideLoader();
		}
		if (isWaiting && (this.state.filterList < 1 || this.state.isWaitingLoading)) {
			constants.showLoader.showLoader();
		} else {
			this.state.isWaitingLoading = false;
			//constants.showLoader.hideLoader();
		}
		if (favData != undefined && typeof favData.recipes == 'object') {
			try {
				var arr = [];
				var objVal = favData.recipes;
				for (key in objVal) {
					var arrNode = objVal[key];
					arrNode.imgUri = objVal[key].picture[constants.FIX_CONST.RECIPE_THUMB_SIZE];
					arrNode.description = objVal[key].name;
					arrNode.uid = key;
					arr.push(arrNode);
				}
				if (JSON.stringify(arr) !== JSON.stringify(this.state.filterList)) {
					this.setState({
						filterList: arr,
						isRefresh: false
					});
				}
			} catch (e) {
				console.log(e);
			}
		}
		if (searchIndArr != undefined && typeof searchIndArr == 'object' && this.state.searchTxt.length > 1) {
			var arr = [];
			searchIndArr.map((itm, ind) => {
				arr.push(itm);
			});
			if (JSON.stringify(arr) != JSON.stringify(this.state.searchResult)) {
				this.setState({
					searchResult: arr
				});
			}
		}
	};
	componentDidMount = () => {
		const { error, userData, favoriteRequest, navigation } = this.props;
		navigation.addListener('didFocus', () => {
			
			if (userData != undefined && Object.keys(userData).length > 0) {
				params = {
					access_token: userData.access_token,
					action: 'get'
				};
				favoriteRequest(params);
				if (userData.filters.diets != undefined && typeof userData.filters.diets == 'object') {
					dietsKeys = Object.keys(userData.filters.diets);
					arr = [];
					dietsKeys.map((item, index) => {
						var isCheck = false;
						var node = { selected: isCheck, name: userData.filters.diets[item], key: item };
						arr.push(node);
					});
					this.setState({
						DietType: arr
					});
				}
			} else if (error != '') {
				//alert(error);
			}
		});

		//BackHandler.addEventListener('hardwareBackPress', this.hardwareBackPress);
	};
	render() {
		return (
			<Base>
				<View style={{ backgroundColor: 'white' }}>
					<Header navigation={this.props.navigation} title="Favoris" />
					<View style={styles.searchBox}>
						<View
							activeOpacity={1}
							onTouchEnd={() => {
								this.setState({ dialogShowSearch: true });
							}}
							style={{ flex: 1 }}
						>
							<AvoSearch
								autoFocus={false}
								editable={false}
								placeholder={'Rechercher dans mon livre de recettes'}
							/>
						</View>
						<TouchableOpacity
							onPress={() => {
								this.setState({
									dialogShow: true
								});
							}}
							style={styles.settingBtn}
						>
							<IconSetting />
						</TouchableOpacity>
					</View>
				</View>
				<FlatList
					data={this.state.filterList}
					renderItem={this._renderItem}
					extraData={this.state}
					contentContainerStyle={
						this.state.filterList.length < 1 ? (
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
					ListEmptyComponent={() => {
						if (this.props.isWaiting != true) {
							return (
								<AvoText
									style={{ fontSize: constants.sizes.TXT_SIZE }}
									text={`Il n'y a pas d'éléments à afficher`}
								/>
							);
						} else {
							return <View />;
						}
					}}
					style={{ backgroundColor: constants.colors.bg, flex: 1 }}
				/>
				<SearchSettingPopup
					recipeType={this.state.recipeType}
					FilterPopup={this.state.dialogShow}
					isWaiting={this.props.isWaiting}
					DietType={this.state.DietType}
					popupCount={this.state.popupCount}
					onFilterPopupGo={() => {
						this.setState({
							dialogShow: false
						});
					}}
					onFilterPopupDismiss={() => {
						this.setState({
							dialogShow: false
						});
					}}
					onRecipePress={(ind) => {
						this.state.recipeType[ind].selected = !this.state.recipeType[ind].selected;
						this.setState({
							recipeType: this.state.recipeType
						});
					}}
					onDietPress={(index) => {
						this.state.DietType.map((itm, ind) => {
							this.state.DietType[ind].selected = false;
						});
						this.state.DietType[index].selected = !this.state.DietType[index].selected;
						this.setState({
							DietType: this.state.DietType
						});
					}}
					onPopupCountPress={(type) => {
						if (type == 0) {
							this.setState({
								popupCount: this.state.popupCount > 1 ? this.state.popupCount - 1 : 1
							});
						} else {
							this.setState({
								popupCount: this.state.popupCount + 1
							});
						}
					}}
					SearchPopup={this.state.dialogShowSearch}
					onSearchPopupDismiss={() => {
						this.setState({
							dialogShowSearch: false
						});
					}}
					searchTxt={this.state.searchTxt}
					searchResult={this.state.searchResult}
					onSearchTxtChange={(searchTxt) => {
						this.setState({
							searchTxt
						});
						this.searchData(searchTxt);
					}}
					onSearchResultPress={(searchItem) => {
						this.setState(
							{
								dialogShowSearch: false
							},
							() => {
								this.props.navigation.push('ItemDetails', { id: searchItem.uid });
							}
						);
					}}
				/>
			</Base>
		);
	}
}

const mapDispatchToProps = {
	favoriteRequest,
	searchFevRecRequest,
	addToMenuRequest
};

const mapStateToProps = (state) => {
	const { auth } = state.reducer;

	return {
		isWaiting: auth.isWaiting,
		accessToken: auth.accessToken,
		favData: auth.favData,
		id: auth.id,
		error: auth.eMessage,
		userData: auth.userData,
		searchIndArr: auth.searchIndArr,
		addMenuStatus: auth.addMenuStatus
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
