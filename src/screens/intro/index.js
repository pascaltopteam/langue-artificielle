// Intro Screen

import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import SafeAreaView from 'react-native-safe-area-view';
import { StackActions, NavigationActions } from 'react-navigation';
import { AvoButton, AvoText } from '../../components';
import { ImageWave, ImageIntro } from '../../assets/svg';
import Dots from './dots';

import styles from './styles';
import constants from '../../const';

class Intro extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			index: 0,
			offsetX: 0,
			isBackHidden: false,
			isForwardHidden: true
		};
		this.onScroll = this.onScroll.bind(this);
	}

	onScroll = (event) => {
		const { x } = event.nativeEvent.contentOffset;
		const { width } = constants.screen;
		const { offsetX } = this.state;

		if (offsetX + 1 < width / 2) {
			this.setState({ index: 0, isBackHidden: false, isForwardHidden: true });
		} else if (offsetX + 1 >= width / 2 && offsetX + 1 < width * 3 / 2) {
			this.setState({ index: 1, isBackHidden: true, isForwardHidden: true });
		} else {
			this.setState({ index: 2, isBackHidden: true, isForwardHidden: false });
		}

		this.setState({ offsetX: x });
	};

	onBtnForward = () => {
		const { offsetX } = this.state;
		const { width } = constants.screen;

		if (offsetX + 1 < width) {
			this.scrollView.scrollTo({ x: width, y: 0, animated: true });
		} else if (offsetX < 2 * width) {
			this.scrollView.scrollTo({ x: 2 * width, y: 0, animated: true });
		}
	};

	onBtnBackward = () => {
		const { offsetX } = this.state;
		const { width } = constants.screen;
		if (offsetX + 1 >= 2 * width) {
			this.scrollView.scrollTo({ x: width, y: 0, animated: true });
		} else if (offsetX + 1 >= width) {
			this.scrollView.scrollTo({ x: 0, y: 0, animated: true });
		}
	};

	onBtnGo = () => {
		const { navigation } = this.props;
		navigation.dispatch(
			StackActions.reset({
				index: 0,
				key: null,
				actions: [NavigationActions.navigate({ routeName: 'Auth' })]
			})
		);
		//navigation.navigate('Auth');
		AsyncStorage.setItem('@first_launch', 'true');
	};

	render() {
		const { index, isBackHidden, isForwardHidden } = this.state;

		return (
			<SafeAreaView style={styles.container}>
				<ScrollView
					ref={(ref) => (this.scrollView = ref)}
					pagingEnabled
					horizontal
					showsHorizontalScrollIndicator={false}
					scrollEventThrottle={16}
					onScroll={this.onScroll}
					style={{ flex: 1 }}
				>
					<View style={styles.swiperContainer}>
						<View style={styles.swiperImage}>
							<ImageWave
								style={{ marginTop: 30 }}
								width={constants.screen.width * 0.9 * 3}
								height={constants.screen.width * 0.9}
							/>
						</View>
						<View style={styles.swiperDesc}>
							<View style={styles.wrapperHCenter}>
								<AvoText style={styles.swiperDescTitle} fontWeight="museo" text="Étape 1" />
								<AvoText
									style={styles.swiperDescText}
									text={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. `}
								/>
							</View>
							<View style={styles.wrapperHCenter}>
								<AvoText style={styles.swiperDescTitle} fontWeight="museo" text="Étape 2" />
								<AvoText
									style={styles.swiperDescText}
									text={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. `}
								/>
							</View>
							<View style={styles.wrapperHCenter}>
								<AvoText style={styles.swiperDescTitle} fontWeight="museo" text="Étape 3" />
								<AvoText
									style={styles.swiperDescText}
									text={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`}
								/>
								<View style={{ flex: 1, width: '100%' }}>
									<AvoButton
										style={{ width: '100%', height: 40 }}
										title={`C'est parti !`}
										onPress={() => {
											this.onBtnGo();
										}}
									/>
								</View>
							</View>
						</View>
					</View>
				</ScrollView>

				<View style={styles.mainImage}>
					<ImageIntro width={styles.mainImage.width * 0.7} height={styles.mainImage.width * 0.7} />
				</View>

				<View style={styles.footer}>
					<View style={{ flexDirection: 'row', width: constants.screen.width / 3 }}>
						{isBackHidden && (
							<TouchableOpacity
								onPress={() => {
									this.onBtnBackward();
								}}
							>
								<AvoText style={styles.back} text="Passer" />
							</TouchableOpacity>
						)}
						<View style={styles.wrapperCenter} />
					</View>
					<View style={styles.wrapperCenter}>
						<Dots index={index} />
					</View>
					<View style={{ flexDirection: 'row', width: constants.screen.width / 3 }}>
						<View style={styles.wrapperCenter} />
						{isForwardHidden && (
							<TouchableOpacity
								onPress={() => {
									this.onBtnForward();
								}}
							>
								<AvoText style={styles.forward} text="Suivant" />
							</TouchableOpacity>
						)}
					</View>
				</View>
			</SafeAreaView>
		);
	}
}

export default Intro;
