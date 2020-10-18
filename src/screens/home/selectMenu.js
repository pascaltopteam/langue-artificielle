import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import { BaseView, Header, AvoText, AvoButton } from '../../components';
import Category from './components/category';

import styles from './styles';
import constants from '../../const';
import { ImageBgBottom, IconMinusGreen, IconPlusGreen } from '../../assets/svg';

class SelectMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			popupCount: 0
		};
	}
	componentDidMount() {
	}

	onBtnRecipe = () => {
		const { navigation } = this.props;
		navigation.navigate('FilterRecipe');
	};

	onBtnRecommend = () => {
		const { navigation } = this.props;
		navigation.navigate('FilterCategory');
	};

	onBtnPerson = () => {
		const { navigation } = this.props;
		navigation.navigate('FilterPerson');
	};

	render() {
		return (
			<BaseView>
				<Header title="Sélection d'un menu" navigation={this.props.navigation} isProfile />
				<View style={constants.styles.wrapperCenter}>
					{/*  <AvoText
            style={styles.title}
            text='Je souhaite préparer :'
            fontWeight='museo'
          />
          <Category
            style={styles.button}
            type='plat'
            title='3 Plats'
            subTitle='Nombre de recette'
            onPress={() => {this.onBtnRecipe()}} 
          />
          <View style={constants.styles.row}>
            <Category
              style={{width: (constants.screen.width - 50) / 2}}
              type='recommend'
              title='Recommandés'
              subTitle='Catégorie'
              onPress={() => {this.onBtnRecommend()}}
            />
            <View style={{width: 10}} />
            <Category
              style={{width: (constants.screen.width - 50) / 2}}
              type='person'
              title='2 pers.'
              subTitle='Nb. de participants'
              onPress={() => {this.onBtnPerson()}}
            />
          </View>
          <Category
            style={styles.button}
            type='ingredient'
            title='1 ingrédient'
            subTitle='Ingrédients en stock'
          />
          <AvoButton
            style={styles.button}
            title='Rechercher'
        />*/}
					<AvoText
						style={[ styles.descTxt, { textAlign: 'left' } ]}
						text="Veux-tu reprendre le dernier menu conseillé ?"
						fontWeight="normal"
					/>
					<ImageBgBottom
						width={constants.screen.width * 0.6}
						style={{ position: 'absolute', bottom: 2, right: constants.screen.width * 0.1 }}
					/>
					<View style={styles.popupRowControl}>
						<AvoButton
							style={styles.button}
							title="Non"
							isNegative={true}
							txtStyle={{color:constants.colors.grey}}
							onPress={() => {
								this.props.navigation.navigate('Home');
							}}
						/>
						<AvoButton
							style={styles.button}
							title="Oui"
							onPress={() => {
								//this.onBtnLogin();
								this.props.navigation.navigate('Menu');
							}}
						/>
					</View>
				</View>
			</BaseView>
		);
	}
}

export default SelectMenu;
