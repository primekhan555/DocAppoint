import React from 'react';
import {
    View,
    Text,
    AsyncStorage,
    ImageBackground,
    StyleSheet,
    Dimensions
} from 'react-native'
import firebase from 'react-native-firebase'

export default class SplashScreen extends React.Component {
    static navigationOptions={
        headerStyle:null
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
        AsyncStorage.getItem('unid', (err, result) => {
            if (result != null) {
                AsyncStorage.getItem('type', (err, result) => {
                    if (result != null) {
                        if (result == 'doctor') {
                            this.props.navigation.navigate('DoctorHome')
                        }
                        else {
                            this.props.navigation.navigate('PatientHome1');
                        }
                    }
                })
            }
            else{
                setTimeout(() => {
                    this.props.navigation.navigate('OptionsScreen')
                }, 2000);
               
            }
        })
    }
    render() {
        return (
            <ImageBackground
            imageStyle={{ opacity: 0.4 }}
            style={styles.body}
            source={require('./images/docOptions2.png')}
             >
                 <Text style={{
                     fontWeight:'bold',
                     alignSelf:'center',
                    fontSize:20,
                    color:'#ff6666'
                 }}>Welcome To The Doctor App</Text>
                 </ImageBackground>
        )
    }
}
const styles =StyleSheet.create({
    body: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 100,
        justifyContent:'center'
    },
})