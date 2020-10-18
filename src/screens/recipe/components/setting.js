
import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, FlatList, Image } from 'react-native';
import Dialog, { SlideAnimation, DialogContent } from 'react-native-popup-dialog';

import { AvoText, AvoSqureCheck, AvoButton } from '../../../components';
import { IconSettingPopup, IconMinusGreen, IconPlusGreen } from '../../../assets/svg';

import constants from '../../../const';

class Setting extends React.Component {

  getImageFromKey = (key) => {
    if (key.toString().toLowerCase() == 'omnivore') {
      return require('../../../assets/png/omni.png');
    } else if (key.toString().toLowerCase() == 'pescetarian') {
      return require('../../../assets/png/pesc.png');
    } else if (key.toString().toLowerCase() == 'vegan') {
      return require('../../../assets/png/vegan.png');
    } else if (key.toString().toLowerCase() == 'vegetarian') {
      return require('../../../assets/png/veg.png');
    } else {
      return require('../../../assets/png/omni.png');
    }
  };

  render() {
    return (
      <Dialog
        containerStyle={{ justifyContent: 'flex-end' }}
        onDismiss={() => this.props.onFilterPopupDismiss()}
        rounded
        dialogStyle={{ backgroundColor: 'rgba(0,0,0,0)' }}
        width={1}
        onTouchOutside={() => this.props.onFilterPopupDismiss()}
        visible={this.props.FilterPopup}
        dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
      >
        <DialogContent style={styles.blurPopupView}>
          <View style={styles.popupSettingView}>
            <IconSettingPopup style={{ marginTop: -40 }} width={80} height={80} />
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width: '90%', alignSelf: 'center', flexGrow: 1 }}
            >
              <AvoText style={styles.popupTitle} fontWeight="bold" text={`Type de recette`} />
              {this.props.recipeType.map((itm, ind) => {
                return (
                  <AvoSqureCheck
                    key={ind}
                    style={styles.squareBoxStyle}
                    onPress={() => {
                      this.props.onRecipePress(ind);
                    }}
                    isChecked={itm.selected}
                    text={itm.name}
                  />
                );
              })}
              <View style={styles.borderStyle} />
              <AvoText style={styles.popupTitle} fontWeight="bold" text={`Régime alimentaire`} />

              <FlatList
                data={this.props.DietType}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between', paddingRight: 20 }}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      onPress={() => this.props.onDietPress(index)}
                      style={styles.squareBoxStyleRow}
                    >
                      <View
                        style={[
                          styles.dietIcon,
                          {
                            backgroundColor: item.selected
                              ? constants.colors.tint
                              : constants.colors.grey
                          }
                        ]}
                        >
                        <Image
                          resizeMode={'contain'}
                          source={this.getImageFromKey(item.key)}
                          style={styles.dietIconImg}
                        />
                      </View>
                      <AvoText
                        style={{
                          marginLeft: 8,
                          fontSize: constants.sizes.TXT_SIZE
                        }}
                        text={item.name}
                      />
                    </TouchableOpacity>
                  );
                }}
                extraData={this.state}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
              />
              <View style={styles.borderStyle} />
              <AvoText style={styles.popupTitle} fontWeight="bold" text={`Temps de préparation`} />
              <View style={styles.popupContainer1}>
                <TouchableOpacity
                  onPress={() => this.props.onPopupCountPress(0)}
                  style={styles.mathBtn}
                >
                  <IconMinusGreen />
                  </TouchableOpacity>
                <AvoText
                  style={[styles.recipeTxt, { fontSize: constants.sizes.BTN_TXT_SIZE, flex: 1 }]}
                  fontWeight="normal"
                  text={this.props.popupCount + ' min'}
                />
                <TouchableOpacity
                  onPress={() => this.props.onPopupCountPress(1)}
                  style={styles.mathBtn}
                >
                  <IconPlusGreen />
                </TouchableOpacity>
              </View>
            </ScrollView>
            <AvoButton
              onPress={() => this.props.onFilterPopupGo()}
              style={styles.button}
              title="C'est parti !"
            />

            <TouchableOpacity onPress={() => this.props.onFilterPopupDismiss()} style={styles.btnStyle}>
              <AvoText
                style={[styles.recipeTxt, { color: constants.colors.grey, marginLeft: 10 }]}
                fontWeight="bold"
                text={`Retour`}
              />
            </TouchableOpacity>
          </View>
          </DialogContent>
      </Dialog>
    )
  }

}

const styles = StyleSheet.create({
  blurPopupView: { 
    paddingVertical: 50, 
    height: constants.screen.height * 0.95 
  },
  popupSettingView: { 
    alignItems: 'center', 
    backgroundColor: 'white', 
    borderRadius: 25, 
    height: '100%' 
  },
  popupTitle: {
		fontSize: constants.sizes.TXT_SIZE,
		color: 'black',
		textAlign: 'left',
		marginVertical: 15,
		marginBottom: 10,
		width: '100%',
		alignSelf: 'center'
  },
  squareBoxStyle: { 
    alignSelf: 'flex-start', 
    marginVertical: 10 
  },
  borderStyle: {
		width: constants.screen.width * 0.9,
		alignSelf: 'center',
		borderColor: constants.colors.borderColor,
		borderTopWidth: 0.5,
		marginVertical: 10
  },
  squareBoxStyleRow: {
		width: '48%',
		alignSelf: 'flex-start',
		marginVertical: 10,
		flexDirection: 'row',
		alignItems: 'center'
  },
  dietIconImg: {
		width: constants.screen.width * 0.06,
		height: constants.screen.width * 0.06
	},
	dietIcon: {
		padding: 7,
		borderRadius: 20
  },
  mathBtn: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingVertical: 10
  },
  recipeTxt: {
		fontSize: constants.sizes.TXT_SIZE,
		color: 'black',
		textAlign: 'center',
		marginTop: Platform.OS == 'ios' ? 5 : 0
  },
  popupContainer1: {
		borderRadius: 5,
		borderColor: constants.colors.grey,
		borderWidth: 1,
		marginVertical: 10,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row'
  },
  button: {
		width: '90%',
		alignSelf: 'center',
		marginVertical: 10
	},
  btnStyle: {
		width: '90%',
		padding: 10,
		borderRadius: 10,
		marginBottom: 10,
		alignSelf: 'center',
		backgroundColor: 'white'
	},
});

export default Setting;
