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
			<ModalDropdown
				renderSeparator={() => {}}
				renderRow={this.props.renderRow}
				defaultValue={this.props.defaultValue}
				style={{
					width: 200,
					height: this.state.currHight,
					
                    ...this.props.style
				}}
				options={this.props.data}
				onSelect={this.props.onSelect}
				dropdownStyle={styles.dropdownBoxStyle}
				onDropdownWillShow={this.props.onDropdownWillShow}
				onDropdownWillHide={this.props.onDropdownWillHide}
			>
                <View 
                onLayout={(event) => {
                    var { x, y, width, height } = event.nativeEvent.layout;
                    this.setState({
                        currHight: height
                    });
                }}
                style={styles.dropdownBtn}>
                    
					<AvoText text={this.props.value} fontWeight="bold" style={styles.dropdownBtnTxt}>
					</AvoText>
					<IconDropdown height={15} width={18} />
				</View>
			</ModalDropdown>
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
		fontSize: constants.sizes.TXT_SIZE,
		marginVertical: 10,

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
