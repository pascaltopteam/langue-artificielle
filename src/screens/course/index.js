import React from "react";
import { connect } from "react-redux";
import { FlatList, TouchableOpacity, View, BackHandler, ScrollView } from "react-native";

import BaseComponent from '../base';
import { BaseView, Header, AvoText, AvoButton } from "../../components";
import { IconCheck, IconUncheck } from "../../assets/svg";

import { getMenuIndRequest } from "../../actions";

import styles from "./styles";
import constants from "../../const";

class Course extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      grocery: [],
      isRefresh: true
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    const { userData, getMenuIndRequest } = this.props;
    const { access_token } = userData;

    if (this.isAuthenticated()) {
      const params = { access_token };
      getMenuIndRequest(params);
    }
  }

  componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentDidUpdate = prevProp => {
    const { isLoading, errorMessage, menuIngredients } = this.props;
    const { grocery } = this.state;

    if (this.isObjectAvailable(menuIngredients)) {
      const { ingredients } = menuIngredients;
      var array = grocery;
      var isAdd = true;
      var isRefresh = false;

      ingredients.map((item) => {
        const { id, required, name, quantity, unit } = item;

        isAdd = true;
        array.map((grocery) => {
          if (id == grocery.id) isAdd = false;
        })

        if (isAdd) {
          isRefresh = true;
          array.push({
            id,
            isChecked: false, //required,
            name,
            quantity,
            unit
          });
        }
      });

      var newArray = [];
      array.map((grocery) => {
        ingredients.map((item) => {
          if (item.id == grocery.id) newArray.push(grocery);
        })
      })

      if (isRefresh) this.setState({ grocery: newArray });
    } else {
      if (errorMessage) {
        console.log(errorMessage);
      }
    }
  };

  handleBackButton = () => {
    return false;
	}

  onTapGrocery = index => {
    const { grocery } = this.state;
    var array = grocery;
    var item = array[index];
    item.isChecked = !item.isChecked;
    array[index] = item;
    this.setState({ grocery: array });
  };

  renderOrderButton = () => {
    const { navigation } = this.props;
    const { grocery } = this.state;

    if (grocery.length == 0) return <View />;

    var array = [];
    grocery.map(item => {
      if (item.isChecked) array.push(item);
    });

    return (
      <AvoButton
        style={styles.orderButton}
        title="Commander les ingrédients"
        onPress={() => navigation.navigate('Delivery', { grocery: array })}
      />
    );
  }

  renderItems = (item, index) => {
    const { grocery } = this.state;
    const { isChecked, name, quantity, unit } = item;
    const itemValue = `${quantity} ${unit}`;

    return (
      <TouchableOpacity
        key={index}
        style={[constants.styles.row, styles.item]}
        onPress={() => {
          grocery[index].isChecked = !grocery[index].isChecked;
          this.setState({ grocery });
        }}
      >
        {
          isChecked ?
            <IconCheck width={20} height={20} />
            :
            <IconUncheck width={20} height={20} />
        }
        <AvoText
          style={isChecked ? styles.itemStrokeTitle : styles.itemTitle}
          fontWeight='light'
          text={name}
        />
        {
          !itemValue.includes(`null`) &&
          <AvoText
            style={styles.itemValue}
            fontWeight='bold'
            text={itemValue}
          />
        }
      </TouchableOpacity>
    );
  }

  render() {
    const { grocery } = this.state;

    return (
      <BaseView>
        <Header title="Courses" navigation={this.props.navigation} isBack />
        <View style={constants.styles.wrapper}>
          <ScrollView>
            <View style={{ height: 20 }} />
            {
              grocery.map((item, index) => this.renderItems(item, index))
            }
            {this.renderOrderButton()}
          </ScrollView>
        </View>
      </BaseView>
    );
  }
}
const mapDispatchToProps = {
  getMenuIndRequest
};

const mapStateToProps = state => {
  const { auth, menu } = state.reducer;
  const { userData } = auth;
  const { menuIngredients, isLoading, errorMessage } = menu;

  return {
    isLoading,
    userData,
    menuIngredients,
    errorMessage
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Course);
