import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Dimensions,
    ScrollView,
    ImageBackground,
    StatusBar,
    AsyncStorage,
} from 'react-native';
import firebase from 'react-native-firebase'
export default class DoctorSignIn extends Component {
    static navigationOptions = {
        title: 'Doctor Sign In',
        headerStyle: {
            backgroundColor: '#CBBAF1',
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
                <StatusBar backgroundColor='#CBBAF1' barStyle='dark-content' />
                <View>
                    <ImageBackground
                        source={require('./images/doclogin.jpg')}
                        imageStyle={{ opacity: 0.5 }}
                        style={{ height: 200, }}>
                        <View style={{
                            // backgroundColor: '#a4d4ae',
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
                        height: '100%',
                        paddingLeft: 20,
                        paddingEnd: 20,
                        paddingTop: 20,
                    }}>

                        <Text style={styles.text}>Email</Text>
                        <TextInput
                            returnKeyType={'next'}
                            onSubmitEditing={() => this.passref.focus()}
                            keyboardType='default'
                            placeholder='Email here'
                            placeholderTextColor='black'
                            underlineColorAndroid='black'
                            onChangeText={(value) => {
                                this.setState({
                                    email: value
                                })
                            }} />
                        <Text style={styles.text}>password</Text>
                        <TextInput
                            ref={passref => this.passref = passref}
                            keyboardType='default'
                            placeholderTextColor='black'
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
                                if (this.state.name == '') {
                                    return;
                                }
                                if (this.state.email == '') {
                                    return;
                                }
                                if (this.state.password == '') {
                                    return;
                                }
                                if (this.state.confirmPassword == '') {
                                    return;
                                }
                                firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
                                    .then(() => {
                                        var curr = firebase.auth().currentUser.uid;
                                        AsyncStorage.setItem('uid', curr, () => {
                                            AsyncStorage.setItem('type', 'doctor', () => {
                                                this.props.navigation.navigate('DoctorHome');
                                            })
                                        })
                                    })
                                    .catch((error) => {
                                        var errorCode = error.code;
                                        var errorMessage = error.message;
                                    })
                            }}
                            style={{
                                backgroundColor: '#CBBAF1',
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