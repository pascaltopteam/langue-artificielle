import React from "react";
import {
  Image,
  Animated,
  PanResponder,
  TouchableWithoutFeedback,
  FlatList,
  Dimensions,
  UIManager,
  LayoutAnimation
} from "react-native";

console.disableYellowBox = true;
var isPanStart = false;
const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 200;

export default class CardView extends React.Component {
  state = {
    data: [
      { imageURL: "https://i.imgur.com/lceHsT6l.jpg" },
      { imageURL: "https://i.imgur.com/UPrs1EWl.jpg" },
      { imageURL: "https://i.imgur.com/l49aYS3l.jpg" },
      { imageURL: "https://i.imgur.com/pewusMzl.jpg" },
      { imageURL: "https://i.imgur.com/cA8zoGel.jpg" },
      { imageURL: "https://i.imgur.com/pmSqIFZl.jpg" }
    ]
  };

  _onPressItem = index => {
    setTimeout(() => {
      if (!isPanStart) {
        //alert((index + 1) + " index pressed!")
      }
    }, 100);
  };
  _panResponder = [];
  position = [];
  renderItem = ({ item, index }) => {
    this.position.push({ position: new Animated.ValueXY() });
    //item.animValue = new Animated.ValueXY()

    // this.position[index].position.x.addListener((value) => {
    //   isPanStart = value.value !== 0
    //   if (parseInt(value.value) === 0) {
    //     this.flatList.setNativeProps({ scrollEnabled: true })
    //   } else if ((value.value > 0 && value.value > 15) || (value.value < 0 && value.value < -15)) {
    //     this.flatList.setNativeProps({ scrollEnabled: false })
    //   }
    // });

    this._panResponder[index] = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {
        this.position[index].position.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.position[index].position.x,
          dy: this.position[index].position.y
        }
      ]),
      onPanResponderTerminate: (evt, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipe(index, "right");
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe(index, "left");
        } else {
          //this.resetPosition(i);
          this.resetPositionAll();
        }
      },
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

    return (
      <Animated.ScrollView
        style={{
          transform: [
            {
              translateX: this.position[index].position.x
            },
            {
              rotate: this.position[index].position.x.interpolate({
                inputRange: [-200, 0, 200],
                outputRange: ["-30deg", "0deg", "30deg"]
              })
            }
          ]
        }}
        {...this._panResponder[index].panHandlers}
      >
        <TouchableWithoutFeedback onPressOut={() => this._onPressItem(index)}>
          <Image
            source={{ uri: item.imageURL }}
            style={{
              width: Dimensions.get("window").width * 0.8,
              height: Dimensions.get("window").width * 0.8,
              marginVertical: 10,
              alignSelf: "center",
              borderRadius: 10
            }}
          />
        </TouchableWithoutFeedback>
      </Animated.ScrollView>
    );
  };
  forceSwipe = (i, direction) => {
    const x = direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(this.position[i].position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start(() => this.onSwipeComplete(i, direction));
  };
  onSwipeComplete(i, direction) {
    // const { onSwipeLeft, onSwipeRight, data } = this.props;
    alert(direction + " swiped");
    const item = this.state.data[i];
    var arr = [];
    this.state.data.map((item1, index) => {
      if (index != i) {
        arr.push(item1);
      }
    });
    this.setState({
      data: arr
    });
    //direction === "right" ? onSwipeRight(item) : onSwipeLeft(item);
    this.position[i].position.setValue({ x: 0, y: 0 });
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    //LayoutAnimation.linear();
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        1000,
        LayoutAnimation.Types.linear,
        LayoutAnimation.Properties.scaleXY
      )
    );
    this.setState({
      index: this.state.index == i ? this.state.index : this.state.index
    });
  }
  resetPositionAll = () => {
    this.state.data.map((itm, ind) => {
      
      if (this.position[ind].position.x._value > SWIPE_THRESHOLD) {
        this.forceSwipe(ind, "right");
      } else if (this.position[ind].position.x._value < -SWIPE_THRESHOLD) {
        this.forceSwipe(ind, "left");
      } else {
        //this.resetPosition(i);
        Animated.spring(this.position[ind].position, {
          toValue: { x: 0, y: 0 }
        }).start();
      }
    });
  };
  render() {
    return (
      <FlatList
        onScrollBeginDrag={() => {
          this.resetPositionAll();
        }}
        ref={flatList => (this.flatList = flatList)}
        extraData={this.state}
        data={this.state.data}
        renderItem={this.renderItem}
      />
    );
  }
}
