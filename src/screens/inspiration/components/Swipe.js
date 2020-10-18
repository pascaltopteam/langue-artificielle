import React, { Component } from "react";
import {
  View,
  Text,
  PanResponder,
  Dimensions,
  Animated,
  Platform,
  UIManager,
  LayoutAnimation,
  ScrollView,
  TouchableOpacity,
  FlatList
} from "react-native";
import constants from "../../../const";
const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 200;
class Swipe extends Component {
  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {},
    keyProp: "id"
  };
  onSwipeEvent = false;

  constructor(props) {
    super(props);

    this.state = { index: 0, scrollEnabled: true, onScrollEvent: true };
    this.scollerPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, g) => true,
      onPanResponderGrant: () => {
        //
      },
      onPanResponderMove: (evt, gestureState) => {}
    });
  }
  _panResponder = [];
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.data !== this.props.data) {
      this.setState({
        index: 0
      });
    }
  }
  position = [];
  onSwipeComplete(i, direction) {
    const { onSwipeLeft, onSwipeRight, data } = this.props;
    const item = data[i];
    direction === "right" ? onSwipeRight(item) : onSwipeLeft(item);
    this.position[i].position.setValue({ x: 0, y: 0 });
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    //LayoutAnimation.linear();
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        200,
        LayoutAnimation.Types.linear,
        LayoutAnimation.Properties.scaleXY
      )
    );
    this.setState({
      index: this.state.index == i ? this.state.index : this.state.index
    });
  }
  forceSwipe = (i, direction) => {
    const x = direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(this.position[i].position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start(() => this.onSwipeComplete(i, direction));
  };

  resetPosition(i) {
    Animated.spring(this.position[i].position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }
  resetPositionAll = () => {
    this.props.data.map((itm, ind) => {
      Animated.spring(this.position[ind].position, {
        toValue: { x: 0, y: 0 }
      }).start();
    });
  };
  getCardStyle(i) {
    const { position } = this;
    const rotate = position[i].position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ["-120deg", "0deg", "120deg"]
    });

    return {
      ...position[i].position.getLayout(),
      transform: [{ rotate }]
    };
  }

  renderCards = () => {
    if (this.state.index >= this.props.data.length) {
      return this.props.renderNoMoreCards();
    }

    const deck = this.props.data.map((item, i) => {
      this.position.push({ position: new Animated.ValueXY() });
      this._panResponder[i] = PanResponder.create({
        // Ask to be the responder:
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gesture) => {
          this.position[i].position.setValue({ x: gesture.dx, y: 0 });
        },
        onPanResponderStart: (evt, gesture) => {
          // this.state.scrollEnabled = false;
          // this.setState({
          // 	scrollEnabled: this.state.scrollEnabled
          // });
        },
        onPanResponderRelease: (evt, gesture) => {
          // this.setState({
          // 	scrollEnabled: true
          // });
          if (gesture.dx > SWIPE_THRESHOLD) {
            this.forceSwipe(i, "right");
          } else if (gesture.dx < -SWIPE_THRESHOLD) {
            this.forceSwipe(i, "left");
          } else {
            //this.resetPosition(i);
            this.resetPositionAll();
          }
        }
      });
      if (i < this.state.index) {
        return null;
      }

      return (
        <Animated.View
          key={item[this.props.keyProp]}
          style={[this.getCardStyle(i), styles.cardStyle]}
          {...this._panResponder[i].panHandlers}
        >
          {/* <TouchableOpacity disabled style={{ width: '100%' }}> */}
          {this.props.renderCard(item, i)}
          {/* </TouchableOpacity> */}
        </Animated.View>
      );
    });

    return Platform.OS === "android" ? deck : deck;
  };
  renderCardsFlatList = (item, index) => {
    this.position.push({ position: new Animated.ValueXY() });
    this._panResponder[index] = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gesture) => {
        this.position[index].position.setValue({ x: gesture.dx, y: 0 });
      },
      onPanResponderStart: (evt, gesture) => {},
      onPanResponderRelease: (evt, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipe(index, "right");
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe(index, "left");
        } else {
          //this.resetPosition(i);
          this.resetPositionAll();
        }
      }
    });
    if (index < this.state.index) {
      return null;
    }
    return (
      <Animated.View
        key={item[this.props.keyProp]}
        style={[this.getCardStyle(index), styles.cardStyle]}
        {...this._panResponder[index].panHandlers}
      >
        <TouchableOpacity
          activeOpacity={1}
          disabled={true}
          style={{ width: "100%" }}
        >
          {this.props.renderCard(item, index)}
        </TouchableOpacity>
      </Animated.View>
    );
  };
  render() {
    return (
      <FlatList
        style={{
          backgroundColor: constants.colors.bg,
          width: constants.screen.width
        }}
        data={this.props.data}
        extraData={this.props}
        renderItem={({ item, index }) => this.renderCardsFlatList(item, index)}
        bounces={false}
        onScroll={event => {}}
        scrollEnabled={this.state.onScrollEvent}
        showsVerticalScrollIndicator={false}
        onScrollEndDrag={event => {
          this.resetPositionAll();
        }}
        onScrollBeginDrag={event => {}}
      />
    );
  }
  renderScroll() {
    return (
      <ScrollView
        onTouchMove={GestureResponderEvent => {}}
        style={{
          backgroundColor: constants.colors.bg,
          width: constants.screen.width
        }}
        onScroll={() => {}}
        onScrollEndDrag={() => {
          this.resetPositionAll();
        }}
        bounces={false}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
      >
        {this.renderCards()}
      </ScrollView>
    );
  }
}

const styles = {
  detailWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10
  },
  cardStyle: {
    width: SCREEN_WIDTH
  }
};

export default Swipe;
