import React, {useState} from 'react';
import { StyleSheet, View, TextInput, Linking, Alert } from 'react-native';
import {Button, Toast, Block} from 'galio-framework'

const Phone = () => {
	const [phone, onChangePhone] = useState('');
	const [isValid, setValid] = useState(true);
	
	const submitPhone =()=> {
		let finalPhone = validatePhone(phone)
		console.log("validity is", isValid);
		if (isValid) {
			let url = generateUrl(finalPhone)
			Linking.openURL(url)
		} else {
			Alert.alert("Please enter valid phone number")
		}
	}

	const generateUrl=(num)=> {
		let url = `https://api.whatsapp.com/send/?phone=${num}&text&app_absent=0`
		return url
	}

	const validatePhone =(num)=> {
		let formattedNum = num
		if (formattedNum.charAt(0) == "+") {
			formattedNum = num.substring(1)
		}
		if (isNumeric(formattedNum)) {
			if (formattedNum.legth > 10 && formattedNum.legth < 13) {
				formattedNum = formattedNum.slice(-10)
				setValid(true)
			} else if (formattedNum.length == 10) {
				formattedNum = "91"+formattedNum
				setValid(true)
			} else {
				setValid(false)
			}
		} else {
			// setValid(prevValue => {
			// 	return (false);
			// })
			setValid(false)
			console.log("2", isValid);
		}
		return formattedNum
	}

	const isNumeric =(num)=>{
		console.log("num is", !isNaN(num));
		return !isNaN(num)
	}

	return (
		<View style={styles.content}>
		{/* <Toast isShow={!isValid} positionIndicator="center" color="error">Please enter valid phone number</Toast> */}
		<TextInput
			style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
			onChangeText={phone => onChangePhone(phone)}
			style={styles.input}
			keyboardType="numeric"
			placeholder="Enter phone number"
		/>
		<View>
		<Button
			onPress={submitPhone}
			color="primary"
			round
		>
			Open in Whatsap
		</Button>
		</View>
	</View>
	)
}

const styles =  StyleSheet.create({
	content: {

	},
	input: {
		color: '#000',
		backgroundColor: "#fff",
		fontSize: 24,
		padding: 10,
		textAlign: "center",
		borderRadius: 10,
	}
})

export default Phone