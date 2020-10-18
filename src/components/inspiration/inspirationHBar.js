// Horizontal bar

import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Animated, Easing } from 'react-native';
import InspirationCard from './inspirationCard';

import constants from '../../const';

class InspirationHBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      contentOffset: {
        x: 0,
        y: 0
      },
      offsetX: 0,
    }

    this.barHeight = new Animated.Value(constants.screen.width * 3 / 4);
    this.rotateHolder = new Animated.Value(0);
  }

  componentDidMount() {
    const contentOffset = { x: constants.screen.width, y: 0, animated: false };
    this.scrollTo(contentOffset);
  }

  scrollTo = (offset) => {
    setTimeout(() => {
      this.scroll.scrollTo(offset);
    }, 100);
  }

  onTapLeft = () => {
    Animated.timing(this.barHeight, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false
    }).start(() => this.props.onScrollLeftEnd());
  }

  onTapRight = () => {
    Animated.timing(this.barHeight, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false
    }).start(() => this.props.onScrollRightEnd());
  }

  onScrollEndDrag = () => {
    const { offsetX } = this.state;

    if (offsetX < constants.screen.width / 2 || offsetX > constants.screen.width * 1.5) {

    }
  }

  onMomentumScrollEnd = () => {
    const { offsetX } = this.state;

    if (offsetX < constants.screen.width / 2) {
      Animated.timing(this.barHeight, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false
      }).start(() => this.props.onScrollLeftEnd());
    } else if (offsetX > constants.screen.width * 1.5) {
      Animated.timing(this.barHeight, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false
      }).start(() => this.props.onScrollRightEnd());
    }
  }

  onScroll = (event) => {
    const { nativeEvent } = event;
    const { contentOffset } = nativeEvent;
    const { x } = contentOffset;

    if (x >= 0 && x <= constants.screen.width * 2) {
      const rotate = (x - constants.screen.width) / constants.screen.width;

      Animated.timing(this.rotateHolder, {
        toValue: rotate,
        duration: 1, 
        easing: Easing.linear,
        useNativeDriver: false
      }).start(() => this.setState({ offsetX: x }))
    }
  }

  render() {
    const { item, navigation } = this.props;
    const { contentOffset } = this.state;
    const rotate = this.rotateHolder.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: ['10deg', '0deg', '-10deg']
    });

    return (
      <Animated.View style={[styles.container, { height: this.barHeight }]}>
        <ScrollView
          ref={ref => this.scroll = ref}
          style={{ backgroundColor: constants.colors.bg }}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentOffset={contentOffset}
          scrollEventThrottle={16}
          onScrollEndDrag={() => this.onScrollEndDrag()}
          onMomentumScrollEnd={() => this.onMomentumScrollEnd()}
          onScroll={(e) => this.onScroll(e)}
        >
          <View style={styles.page} />
          <Animated.View style={[styles.page, { transform: [{ rotate }] }]}>
            <InspirationCard 
              navigation={navigation}
              item={item}
              onDislike={() => this.onTapLeft()}
              onLike={() => this.onTapRight()}
            />
          </Animated.View>
          <View style={styles.page} />
        </ScrollView>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  page: {
    width: constants.screen.width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: constants.colors.bg
  }
});

export default InspirationHBar;