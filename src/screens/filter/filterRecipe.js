// Recipe Filter screen

import React from 'react';
import { View, FlatList } from 'react-native';

import BaseFilterView from '../../components/filter/base';

class FilterRecipe extends React.Component {

  renderItem = () => {
    return (
      <View />
    );
  }

  render() {
    const { navigation } = this.props;

    return (
      <BaseFilterView
        title={`Nombre de recette\nque je souhaite prévoir`}
        subTitle={`Exemple : 2 plats par jour pendant 5 jours\nreviennent à prévoir 10 recettes.`}
        navigation={navigation}
      >
      
      </BaseFilterView>
    );
  }
}

export default FilterRecipe;