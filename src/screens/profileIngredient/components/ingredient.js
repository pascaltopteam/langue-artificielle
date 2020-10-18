// Alergies component

import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Keyboard } from 'react-native';
import PropTypes from 'prop-types';

import { AvoText, AvoSearch, AvoButton } from '../../../components';
import { IconRectCheck, IconRect } from '../../../assets/svg';

import constants from '../../../const';

class Ingredient extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			searchTxt: '',
			isSearchMode: false,
			likeDislikeFood: []
		};
	}

	onBtnSearchClose = () => {
    this.setState({ isSearchMode: false });
    Keyboard.dismiss();
	}
	
	onChangeText = searchTxt => {
		this.setState({ isSearchMode: true, searchTxt });
		this.props.onSearch(searchTxt);
	}

	onSearchItem = item => {
		const { likeDislikeFood } = this.state;
		var count = 0;
		var add = true;
		var array = likeDislikeFood;
		var newItem = {
			isCheck: true,
			title: item.name,
			key: item.id
		};

		array.map((food, index) => {
			if (food.key == item.id) add = false;
			if (food.isCheck) count++;
		});

		if (count >= 2) {
			constants.DropDownAlert.showDropdownAlert(
				"error",
				"Error",
				`Vous ne pouvez pas sélectionner plus de 2 éléments`
			);
			newItem.isCheck = false;
		}

		array.push(newItem);
		this.setState({ 
			likeDislikeFood: array,
			isSearchMode: false
		});
	}

	onResultItem = (item, index) => {
		const { onIngredient } = this.props;
		const { likeDislikeFood } = this.state;
		var array = likeDislikeFood;
		var count = 0;

		array.map((food, dlIndex) => {
			if (food.isCheck) count++;
		});

		if (count >= 2 && item.isCheck == false) {
			constants.DropDownAlert.showDropdownAlert(
				"error",
				"Error",
				`Vous ne pouvez pas sélectionner plus de 2 éléments`
			);
		} else {
			array[index].isCheck = !item.isCheck;
			this.setState({ likeDislikeFood: array });
		}
	}

	renderItem = (item, index) => {
		const { isCheck, title } = item;

		return (
			<TouchableOpacity
				onPress={() => { this.onResultItem(item, index) }}
				key={index}
				style={[constants.styles.row, { alignItems: 'center', marginBottom: 26 }]}
			>
				{isCheck == true ? <IconRectCheck width={20} height={20} /> : <IconRect width={20} height={20} />}
				<AvoText style={styles.item} text={title} />
			</TouchableOpacity>
		);
	};

	renderSearchItem = (item, index) => {
    const { name } = item;

    return (
      <TouchableOpacity
        key={index}
        activeOpacity={0.9}
        onPress={() => { this.onSearchItem(item) }}
      >
        <AvoText
          text={name}
          style={{
            marginLeft: 10,
            fontSize: constants.sizes.TXT_SIZE,
            marginVertical: 10,
            color: constants.colors.tint
          }}
          fontWeight="normal"
        />
      </TouchableOpacity>
    )
  }

	render() {
		const { title, searchResult, isWaiting, onPressEnd } = this.props;
		const { isSearchMode, likeDislikeFood } = this.state;

		return (
			<View style={styles.container}>
				<AvoText fontWeight="bold" text={title} />
				<AvoSearch
					autoFocus={false}
					placeholder="Rechercher"
					isWaiting={isWaiting}
					onChangeText={(text) => { this.onChangeText(text) }}
				/>
				<View style={constants.styles.wrapper}>
					{
						isSearchMode ?
							<View style={styles.searchBoard}>
                <ScrollView>
                  {
                    searchResult.map((item, index) =>
                      this.renderSearchItem(item, index)
                    )
                  }
                </ScrollView>
                <View style={constants.styles.row}>
                  <View style={constants.styles.wrapper} />
                  <TouchableOpacity
                    style={styles.searchClose}
                    onPress={() => { this.onBtnSearchClose() }}
                  >
                    <AvoText
                      text='Close'
                      style={styles.closeTitle}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              :
							<ScrollView showsVerticalScrollIndicator={false}>
								{
									likeDislikeFood.map((item, index) => this.renderItem(item, index))
								}
							</ScrollView>
					} 
				</View>
				<View style={{ paddingTop: 20 }}>
					<AvoButton 
						style={styles.button} 
						title="Enregistrer"
						isNegative={likeDislikeFood.length >= 2}
						onPress={onPressEnd}
					/>
				</View>
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
		color: 'black',
		fontSize: constants.sizes.TXT_SIZE
	},
	searchBoard: {
		width: '100%',
		height: constants.screen.height / 3,
		borderBottomLeftRadius: 20,
		borderBottomEndRadius: 20,
		backgroundColor: 'white',
		shadowColor: 'gray',
		shadowOpacity: 0.1,
		shadowOffset: {
			width: 0,
			height: 5
		}
	},
	searchClose: {
		marginHorizontal: 20,
		marginBottom: 10,
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 4,
		backgroundColor: constants.colors.greenBg
	},
	closeTitle: {
		fontSize: 12,
		color: 'white'
	}
});

export default Ingredient;
