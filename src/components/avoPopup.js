// Second Screen

import React from 'react';
import { View, StyleSheet } from 'react-native';
import constants from '../const';
import { AvoText } from '../components';
import ModalDropdown from 'react-native-modal-dropdown';
import { IconSearchIcon, IconDropdown } from '../assets/svg';

class AvoDropdown extends React.Component {
	constructor(props){
        super(props)
        this.state={
            currHight:50
        }
    }

	//_renderDropdown = ({ item, index }) => {
	render() {
		return (
			<Dialog
				containerStyle={{ justifyContent: 'flex-end' }}
				onDismiss={() => {
					this.props.closePopup()
				}}
				rounded
				dialogStyle={{
					backgroundColor: 'rgba(0,0,0,0)'
				}}
				width={1}
				onTouchOutside={() => {
					this.props.closePopup()
				}}
				visible={this.props.dialogShow}
				dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
			>
				<DialogContent style={{ paddingVertical: 50 }}>
					<View style={{ alignItems: 'center', backgroundColor: 'white', borderRadius: 25 }}>
						<IconBellPopup style={{ marginTop: -40 }} width={80} height={80} />
						<AvoText
							style={styles.popupTxt}
							fontWeight="normal"
							text={`Souhaitez-vous ajouter cette recette à votre menu ?`}
						/>
						<TouchableOpacity onPress={()=>{this.setState({
							dialogShow:false
						})}} style={[ styles.btnStyle, { backgroundColor: constants.colors.tint } ]}>
							<AvoText style={[ styles.recipeTxt, { color: 'white' } ]} fontWeight="bold" text={`Oui`} />
						</TouchableOpacity>
						<TouchableOpacity onPress={()=>{this.setState({
							dialogShow:false
						})}} style={[ styles.btnStyle, { backgroundColor: 'white' } ]}>
							<AvoText style={[ styles.recipeTxt, { color: constants.colors.grey } ]} fontWeight="bold" text={`Oui`} />
						</TouchableOpacity>
					</View>
				</DialogContent>
			</Dialog>
		);
	}
}
const styles = StyleSheet.create({
	dropdownBoxStyle: {
		width: 200,
		height: 200,
		marginTop: Platform.OS === 'ios' ? 10 : 10,
		shadowColor: constants.colors.grey,
		shadowOffset: {
			width: 0,
			height: 0
		},
		shadowRadius: 6,
		shadowOpacity: 0.2,
		elevation: 5
	},
	dropdownBtnTxt: {
		fontSize: 15,
		marginVertical: 15,

		color: constants.colors.placeholder
	},
	dropdownBtn: {
		borderColor: constants.colors.borderColor,
		backgroundColor: '#FFFFFF',
		borderRadius: 5,
		borderWidth: 1,
		paddingHorizontal: 10,
		flexDirection: 'row',
		marginRight: 10,
		width: 200,
		justifyContent: 'space-between',
		alignItems: 'center'
	},
});

export default AvoDropdown;
