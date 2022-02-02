import React, { useState } from 'react';
import { Text, View, StyleSheet, Alert, ScrollView, Formik } from 'react-native';
import Constants from 'expo-constants';
import { TextInput, Button, Avatar } from 'react-native-paper';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome'; 
import Axios from 'axios';

export default function Register({ navigation }) {

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  let regemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  let regphone = /^[0]?[5]\d{9}$/;
  const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  


  const fncRegister = () => {
    if (name == '') {
      Alert.alert('Name Not Empty!');
    } else if (surname == '') {
      Alert.alert('Surname Not Empty!');
    } else if (phone == '') {
      Alert.alert('Phone Not Empty!');
    }else if (regphone.test(phone) === false) {
      Alert.alert('Please Enter a Valid Phone!');
    } else if (email == '') {
      Alert.alert('E-Mail Not Empty!');
    }else if (regemail.test(email) === false){
        Alert.alert('Please Enter a Valid Email!')        
    }    
    else if (password == '') {
      Alert.alert('Password Not Empty!');
    }else if (password.length <= 8){      
      Alert.alert('Password cannot be shorter than 8 characters.');
    }
    else if (!strongRegex.test(password)) {
     Alert.alert('Password must including upper/lowercase, special character and numbers!'); 
    }
    else {
//https://www.jsonbulut.com/json/userRegister.php?ref=c7c2de28d81d3da4a386fc8444d574f2&userName=demo&userSurname=demo&userPhone=05333333333&userMail=a@a.com&userPass=123456
     const url = 'https://www.jsonbulut.com/json/userRegister.php'
     const params = {
       ref:'c7c2de28d81d3da4a386fc8444d574f2',
       userName: name,
       userSurname: surname,
       userPhone: phone,
       userMail: email,
       userPass: password
     }
     Axios.get(url, { params:params }).then( res => {
       const u = res.data.user[0]
       const durum = u.durum
       const message = u.mesaj
       if(durum == true){
         Alert.alert(message, "Lütfen Giriş Yapınız!")
         navigation.navigate("login")

       }else {
          Alert.alert(message)
       }
       
               
     })


  //    console.log('fncLogin Call', name, surname, phone, email, password);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignSelf: 'center', marginTop: 30 }}>
          <Avatar.Image
            style={{ backgroundColor: 'transparent' }}
            size={100}
            source={require('./assets/icn_login.png')}
          />
        </View>

        <Text style={styles.txtTitle}>User Register</Text>
        <TextInput
          label="Name"
          value={name}
          onChangeText={(text) => setName(text)}
          mode="outlined"
          style={styles.txtFiled}
          autoCapitalize="none"
        />
        <TextInput
          label="Surname"
          value={surname}
          onChangeText={(text) => setSurname(text)}
          mode="outlined"
          style={styles.txtFiled}
          autoCapitalize="none"
        />
        <TextInput
          label="Phone"
          value={phone}
          onChangeText={(text) => setPhone(text)}
          mode="outlined"
          keyboardType="phone-pad"
          style={styles.txtFiled}
          autoCapitalize="none"
        />
        <TextInput
          label="E-Mail"
          value={email}
          onChangeText={(text) => setEmail(text)}
          mode="outlined"
          keyboardType="email-address"
          style={styles.txtFiled}
          autoCapitalize="none"
        />

        <TextInput
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          mode="outlined"
          secureTextEntry={true}
          autoCapitalize="none"
          style={styles.txtFiled}
        />

        <View style={styles.cardView}>
          <Button
            style={styles.btnStyle}
            onPress={() => fncRegister()}
            icon="account-arrow-right"
            mode="contained">
            Register
          </Button>
        </View>
      </ScrollView>
      <View style={styles.footerCard}>
        <AwesomeIcon name="google" size={30} style={{ textAlign: 'center' }} />
        <Text style={styles.footerCardText}> By Caner Savak </Text>
      </View>
    </View>    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    padding: 8,
  },
  txtTitle: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 20,
    color: '#598ee3',
    marginBottom: 0,
  },
  txtFiled: {
    marginTop: 10,
  },
  cardView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerCardText: {
    textAlign: 'center',
  },
  btnStyle: {
    marginTop: 20,
    padding: 10,
  },
});
