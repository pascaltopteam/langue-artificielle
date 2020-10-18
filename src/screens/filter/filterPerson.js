// Recipe Filter screen

import React from 'react';
import { View, FlatList } from 'react-native';

import BaseFilterView from '../../components/filter/base';

class FilterPerson extends React.Component {

  renderItem = () => {
    return (
      <View />
    );
  }

  render() {
    const { navigation } = this.props;
    
    return (
      <BaseFilterView
        title={`Nombre de personnes`}
        navigation={navigation}
      >
        { this.renderItem() }
      </BaseFilterView>
    );
  }
}

export default FilterPerson;