// Category

import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { AvoText } from '../../../components';
import { 
  IconPlat,   IconRecommend,  IconPerson,   IconIngredient,
  ImagePlat,  ImageRecommend, ImagePerson,  ImageIngredient 
} from '../../../assets/svg';

import constants from '../../../const';

class Category extends React.Component {

  renderIcon = (type) => {
    switch(type) {
      case 'plat':
        return <IconPlat width={styles.icon.width} height={styles.icon.height} />
      case 'recommend':
        return <IconRecommend width={styles.icon.width} height={styles.icon.height} />
      case 'person':
        return <IconPerson width={styles.icon.width} height={styles.icon.height} />
      case 'ingredient':
        return <IconIngredient width={styles.icon.width} height={styles.icon.height} />
      default:
        return;
    }
  }

  renderBackground = (type) => {
    switch(type) {
      case 'plat':
        return <ImagePlat width={styles.bg.width} height={styles.bg.height} />
      case 'recommend':
        return <ImageRecommend width={styles.bg.width} height={styles.bg.height} />
      case 'person':
        return <ImagePerson width={styles.bg.width} height={styles.bg.height} />
      case 'ingredient':
        return <ImageIngredient width={styles.bg.width} height={styles.bg.height} />
      default:
        return;
    }
  }

  render() {
    const { type, title, subTitle, style } = this.props;

    return (
      <TouchableOpacity
        {...this.props}
        style={[styles.container, style]}
        activeOpacity={0.8}
      >
        <View style={styles.bg}>
          { this.renderBackground(type) }
        </View>
        
        <View style={styles.wrapperCenter}>
          { this.renderIcon(type) }
          <AvoText
            style={styles.title}
            fontWeight='museo'
            text={title}
          />
          <AvoText
            style={styles.desc}
            text={subTitle}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 120,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 10
  },
  bg: {
    position: 'absolute',
    left: 0,
    width: 182,
    height: 120
  },
  wrapperCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  icon: {
    width: 42,
    height: 42
  },
  title: {
    fontSize: 20,
    color: constants.colors.tint,
    marginTop: 14
  },
  desc: {
    fontSize: 14,
    marginTop: 1
  }
});

Category.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  style: PropTypes.object
};

Category.defaultProps = {
  type: 'plat',
  title: '',
  subTitle: ''
};

export default Category;