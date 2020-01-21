import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    AsyncStorage,
    StatusBar,
    ImageBackground,
    Dimensions,
} from 'react-native';
import firebase from 'react-native-firebase';
export default class OptionsScreen extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    state = {
        uid: ''
    }
    componentDidMount() {
        var firebaseConfig = {
            apiKey: "AIzaSyASl8eIzspE9bnPxe8HlaMJdlA3xtz1IS8",
            authDomain: "appintmentbooking.firebaseapp.com",
            databaseURL: "https://appintmentbooking.firebaseio.com",
            projectId: "appintmentbooking",
            storageBucket: "appintmentbooking.appspot.com",
            messagingSenderId: "512449088784",
            appId: "1:512449088784:web:7f533ae4d40e1508bfa995",
            measurementId: "G-TY5RFBYT23"
        };
        // Initialize Firebase
        // if (!firebase.apps.length) {
        //     firebase.initializeApp(firebaseConfig);
        // }
        // AsyncStorage.getItem('uid', (err, result) => {
        //     if (result != null) {
        //         AsyncStorage.getItem('type', (err, result) => {
        //             if (result != null) {
        //                 if (result=='doctor') {
        //                     this.props.navigation.navigate('DoctorHome')
        //                 }
        //                 else if (result == 'patient') {
        //                     this.props.navigation.navigate('PatientHome');
        //                 }
        //                 else {
        //                     this.props.navigation.navigate('Options screen')
        //                 }
        //             }
        //         })
        //     }
        // })
    }
    render() {
        return (
            <ImageBackground
                imageStyle={{ opacity: 0.4 }}
                style={styles.body}
                source={require('./images/home.jpg')}>
                <View style={{ flex: 1, justifyContent: 'center', marginTop: 250, alignItems: 'center' }}>
                    <StatusBar backgroundColor='#F9ECAD' barStyle='dark-content' />
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('DoctorOptions')
                        }}
                        style={{
                            backgroundColor: '#F9ECAD',
                            height: 40,
                            width: 250,
                            justifyContent: 'center',
                            borderRadius: 5
                        }}>
                        <Text style={{
                            color: 'white',
                            alignSelf: 'center',
                            fontWeight: 'bold'
                        }}>Doctor Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('PatientOptions')
                        }}
                        style={{
                            // backgroundColor: '#ff6666',
                            borderColor: '#f9ecad',
                            borderWidth: 3,
                            height: 40,
                            marginTop: 20,
                            width: 250,
                            justifyContent: 'center',
                            borderRadius: 5
                        }}>
                        <Text style={{
                            color: '#f9ecad',
                            alignSelf: 'center',
                            fontWeight: 'bold',
                            fontSize: 15
                        }}>Patient Account</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    body: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 20,
    }
})