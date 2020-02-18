import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    AsyncStorage,
    StatusBar,
    ScrollView,
    ImageBackground,
    Dimensions,
    ToastAndroid
} from 'react-native';
import firebase from 'react-native-firebase'
export default class PatientSignIn extends Component {
    static navigationOptions = {
        title: 'Patient Sign In',
        headerStyle: {
            backgroundColor: '#40E0D0'
        }
    }
    state = {
        email: '',
        password: '',
        uid: 0,
    }
    componentDidMount() {

    }
    render() {
        return (
            <ScrollView>
                <View style={{}}>
                    <StatusBar backgroundColor='#40E0D0' barStyle='dark-content' />
                    <ImageBackground
                        source={require('./images/patlogin.jpg')}
                        imageStyle={{ opacity: .5 }}
                        style={{ height: 200, }}>
                        <View style={{
                            height: 200,
                            width: Dimensions.get('window').width
                        }}>
                            <Text style={{
                                fontSize: 35,
                                paddingLeft: 10,
                                paddingTop: 100
                            }}>Hello there!</Text>
                            <Text style={{
                                fontSize: 20,
                                paddingLeft: 20
                            }}>Welcome</Text>
                        </View>
                    </ImageBackground>

                    <View style={{
                        paddingLeft: 20,
                        paddingEnd: 20,
                        paddingTop: 20
                    }}>
                        <Text style={styles.text}>Email</Text>
                        <TextInput
                            keyboardType='default'
                            placeholder='Email here'
                            underlineColorAndroid='black'
                            onChangeText={(value) => {
                                this.setState({
                                    email: value
                                })
                            }} />
                        <Text style={styles.text}>password</Text>
                        <TextInput
                            keyboardType='default'
                            placeholder='Password here'
                            secureTextEntry={true}
                            underlineColorAndroid='black'
                            onChangeText={(value) => {
                                this.setState({
                                    password: value
                                })
                            }} />
                        <TouchableOpacity
                            onPress={() => {
                                if (this.state.email == '') {
                                    return;
                                }
                                if (this.state.password == '') {
                                    return;
                                }
                                firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
                                    .then(() => {
                                        var curr = firebase.auth().currentUser.uid;
                                        console.log(curr);
                                        AsyncStorage.setItem('uid', curr, () => {
                                            AsyncStorage.setItem('type', 'patient', () => {
                                                firebase.database().ref().child('users').child('Patients').child(curr).on('value', (datasnapshot) => {
                                                    if (!datasnapshot.exists()) {
                                                        ToastAndroid.showWithGravity(
                                                            'Please Register First',
                                                            ToastAndroid.SHORT,
                                                            ToastAndroid.CENTER,
                                                          );
                                                    }
                                                    else{
                                                        this.props.navigation.navigate('PatientHome');
                                                    }
                                                })
                                            })
                                        })
                                    })
                                    .catch(function (error) {
                                        var errorCode = error.code;
                                        var errorMessage = error.message;
                                    })
                            }}
                            style={{
                                backgroundColor: '#40E0D0',
                                width: 250,
                                height: 40,
                                justifyContent: "center",
                                alignItems: 'center',
                                alignSelf: 'center',
                                marginTop: 20,
                                borderRadius: 5
                            }}>
                            <Text style={{
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: 17
                            }}>Sign In</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={()=>{
                            this.props.navigation.navigate('ForgotPassword')
                        }}
                        >
                        <Text 
                        style={{
                            color:'#40E0D0',
                            paddingTop:5,
                        }}
                        >Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    text: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 25,
    }
})