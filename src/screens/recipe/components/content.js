//

import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';

import Tap from './tab';
import Inspiration from './inspiration';
import Favorite from './favorite';
import { AvoText } from '../../../components';

import constants from '../../../const';
import styles from './styles';

class RecipeContent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tabIndex: 0
    }
  }

  /*
  ** This method is called when user taps masked view while searching
  */
  onTapCoveredView = () => {
    this.props.onTapCoveredView();
  }

  /* This method is called when user taps 'Ingridient' or 'Favorit'
  ** Parameter - tabIndex (index of tab)
  */
  onTap = tabIndex => {
    this.setState({ tabIndex });
  }

  renderSearchItem = (item, index) => {
    const { navigation } = this.props;
    const { name, uid } = item;

    return (
      <TouchableOpacity
        key={index}
        style={styles.searchItem}
        activeOpacity={0.9}
        onPress={() => { 
          navigation.navigate('ItemDetails', { id: uid });
          this.onTapCoveredView();
        }}
      >
        <AvoText>{name}</AvoText>
      </TouchableOpacity>
    )
  }

  renderSearchResults = searchResult => {
    if (searchResult.length == 0) {
      return <View />;
    }

    return (
      <View style={styles.searchResultBox}>
        <ScrollView keyboardShouldPersistTaps='handled'>
          {
            searchResult.map((item, index) => 
              this.renderSearchItem(item, index)
            )
          }
        </ScrollView>
      </View>
    )
  }

  renderContent = () => {
    const { navigation } = this.props;
    const { tabIndex } = this.state;

    return (
      tabIndex == 0 ?
        <Inspiration navigation={navigation} />
        :
        <Favorite navigation={navigation} />
    )
  }

  render() {
    const { isEnabled, searchResult } = this.props;

    return (
      <View style={constants.styles.wrapper}>
        { this.renderContent() }
        <Tap onTap={index => this.onTap(index)} />
        { 
          !isEnabled && 
          <View 
            style={styles.coverWrapper}
            onTouchEnd={() => this.onTapCoveredView()}
          /> 
        }
        { this.renderSearchResults(searchResult) }
      </View>
    );
  }

}

export default RecipeContent;