import React, {useState, useEffect} from 'react';
import { StyleSheet, View, TextInput, Linking, Alert } from 'react-native';
import {Button, Block} from 'galio-framework'
import Toast from 'react-native-toast-message'


const Phone = () => {
	const [phone, onChangePhone] = useState('');
	const [isValid, setValid] = useState(true);
	
	const submitPhone =()=> {
		let finalPhone = validatePhone(phone)
		let url = generateUrl(finalPhone)
		Linking.openURL(url)
	}

	const throwError=()=> {
		Alert.alert("Please enter valid phone number")
	}

	const generateUrl=(num)=> {
		let url = `https://wa.me/${num}`
		return url
	}

	const validatePhone =(num)=> {
		let formattedNum = num
		if (formattedNum.charAt(0) == "+") {
			formattedNum = num.substring(1)
		}
		formattedNum = formattedNum.replace(/\s/g,'')
		if (isNumeric(formattedNum)) {
			if (formattedNum.length >= 10 && formattedNum.length < 13) {
				formattedNum = formattedNum.slice(-10)
				formattedNum = "91"+formattedNum	
			} else {
				throwError()
				return;
			}
		} else {
			throwError()
			return;
		}
		return formattedNum
	}

	const isNumeric =(numb)=>{
		return !isNaN(numb)
	}

	return (
		<View style={styles.content}>
		{/* <Toast isShow={!isValid} type="error" text1="hello world" /> */}
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