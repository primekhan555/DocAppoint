import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    ImageBackground,
    Dimensions,
    StatusBar,
    AsyncStorage,
    Picker
} from 'react-native';
import firebase from 'react-native-firebase'
export default class DoctorRegister extends Component {
    static navigationOptions = {
        title: 'Doctor Registeration',
        headerStyle: {
            backgroundColor: '#CBBAF1',
        }
    };
    state = {
        name: 'd',
        email: 'd',
        password: 'd',
        confirmPassword: 'd',
        specilization: 'd',
        fee: 'd',
        contact: 4,
        clinicalAddress: 'd',
        uid: 0,
        city:'',
    }

    componentDidMount() {
    }
    render() {
        return (
            <ImageBackground
                source={require('./images/medicalreg.jpg')}
                imageStyle={{ opacity: 0.4 }}
                style={styles.body}>
                <StatusBar backgroundColor='#CBBAF1' barStyle='dark-content' />
                <View style={{}}>
                    <ScrollView style={{}}>
                        <View style={{
                            paddingLeft: 20,
                            paddingEnd: 20,
                            paddingTop: 20,
                            opacity: 1
                        }}>
                            <Text>Doctor Name</Text>
                            <View style={[(this.state.name != '') ? styles.singleC : styles.singleCfalse]}>
                                <TextInput
                                    keyboardType='default'
                                    returnKeyType={'next'}
                                    onSubmitEditing={() => {
                                        if (this.state.name != '') {
                                            this.emailref.focus()
                                        }
                                    }}
                                    onFocus={() => {
                                        if (this.state.name == 'd') {
                                            this.setState({
                                                name: ''
                                            })
                                        }
                                    }}
                                    placeholder='Name here'
                                    underlineColorAndroid='black'
                                    onChangeText={(value) => {
                                        this.setState({
                                            name: value
                                        })
                                    }} />
                            </View>
                            <Text>Email</Text>
                            <View style={this.state.email != '' ? styles.singleC : styles.singleCfalse}>
                                <TextInput
                                    ref={emailref => this.emailref = emailref}
                                    returnKeyType={'next'}
                                    onSubmitEditing={() => {
                                        if (this.state.email != '') {
                                            this.contactref.focus()
                                        }
                                    }}
                                    onFocus={() => {
                                        if (this.state.email == 'd') {
                                            this.setState({
                                                email: ''
                                            })
                                        }
                                    }}
                                    keyboardType='email-address'
                                    placeholder='Email here'
                                    underlineColorAndroid='black'
                                    onChangeText={(value) => {
                                        this.setState({
                                            email: value
                                        })
                                    }} />
                            </View>
                            <Text>Contact</Text>
                            <View style={this.state.contact != 0 ? styles.singleC : styles.singleCfalse}>
                                <TextInput
                                    ref={contactref => this.contactref = contactref}
                                    returnKeyType={'next'}
                                    maxLength={11}
                                    onSubmitEditing={() => {
                                        if (this.state.contact != 0) {
                                            this.passwordref.focus();
                                        }
                                    }}
                                    onFocus={() => {
                                        if (this.state.contact == 4) {
                                            this.setState({
                                                contact: 0
                                            })
                                        }
                                    }}
                                    keyboardType='phone-pad'
                                    placeholder='Contact here'
                                    underlineColorAndroid='black'
                                    onChangeText={(value) => {
                                        this.setState({
                                            contact: value
                                        })
                                    }} />
                            </View>
                            <Text>password</Text>
                            <View style={this.state.password != '' ? styles.singleC : styles.singleCfalse}>
                                <TextInput
                                    ref={passwordref => this.passwordref = passwordref}
                                    returnKeyType={'next'}
                                    onSubmitEditing={() => {
                                        if (this.state.password != '') {
                                            this.conPasswordref.focus()
                                        }
                                    }}
                                    onFocus={() => {
                                        if (this.state.password == 'd') {
                                            this.setState({
                                                password: '',
                                            })
                                        }
                                    }}
                                    keyboardType='default'
                                    placeholder='Password here'
                                    secureTextEntry={true}
                                    underlineColorAndroid='black'
                                    onChangeText={(value) => {
                                        this.setState({
                                            password: value
                                        })
                                    }} />
                            </View>
                            <Text>Confirm password</Text>
                            <View style={this.state.confirmPassword != '' ? styles.singleC : styles.singleCfalse}>
                                <TextInput
                                    ref={conPasswordref => this.conPasswordref = conPasswordref}
                                    returnKeyType={'next'}
                                    keyboardType='default'
                                    placeholder='Confirm password here'
                                    secureTextEntry={true}
                                    underlineColorAndroid='black'
                                    onFocus={() => {
                                        if (this.state.confirmPassword == 'd') {
                                            this.setState({
                                                confirmPassword: ''
                                            })
                                        }
                                    }}
                                    onChangeText={(value) => {
                                        this.setState({
                                            confirmPassword: value
                                        })
                                    }} />
                            </View>
                            <Text>Specilization</Text>
                            <View style={styles.singleC}>
                                <Picker
                                    selectedValue={this.state.specilization}
                                    style={{ fontWeight: 'bold' }}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ specilization: itemValue })
                                    }>
                                    <Picker.Item label="Heart Specialist" value="heartSpecialist" />
                                    <Picker.Item label="Eye Specialist" value="eyeSpecialist" />
                                    <Picker.Item label="Neurologist" value="Neurologist" />
                                    <Picker.Item label="Dentist" value="Dentist" />
                                    <Picker.Item label="Gastrologist" value="Gastrologist" />
                                    <Picker.Item label="Orthopedic" value="Orthopedic" />
                                    <Picker.Item label="Urologist" value="Urologist" />
                                    <Picker.Item label="Pulmonologist" value="Pulmonologist" />
                                </Picker>
                            </View>
                            <Text>Fee</Text>
                            <View style={this.state.fee != '' ? styles.singleC : styles.singleCfalse}>
                                <TextInput
                                    ref={feeref => this.feeref = feeref}
                                    returnKeyType={'next'}
                                    onSubmitEditing={() => {
                                        if (this.state.fee != '') {
                                            this.clinicalAddressref.focus()
                                        }
                                    }}
                                    keyboardType='decimal-pad'
                                    placeholder='Fee here'
                                    maxLength={4}
                                    underlineColorAndroid='black'
                                    onFocus={() => {
                                        if (this.state.fee == 'd') {
                                            this.setState({
                                                fee: ''
                                            })
                                        }
                                    }}
                                    onChangeText={(value) => {
                                        this.setState({
                                            fee: value
                                        })
                                    }} />
                            </View>
                            <Text>City</Text>
                            <View style={styles.singleC}>
                                <Picker
                                    selectedValue={this.state.city}
                                    style={{ fontWeight: 'bold' }}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ city: itemValue })
                                    }>
                                    <Picker.Item label="Peshawar" value="Peshawar" />
                                    <Picker.Item label="Islamabad" value="Islamabad" />
                                    <Picker.Item label="Karachi" value="Karachi" />
                                    <Picker.Item label="RawalPindi" value="RawalPindi" />
                                    <Picker.Item label="Mardan" value="Mardan" />
                                    <Picker.Item label="Banno" value="Banno" />
                                    <Picker.Item label="Kohat" value="Kohat" />
                                    <Picker.Item label="DI Khan" value="DI_Khan" />
                                    <Picker.Item label="Lakki Marwat" value="Lakki_Marwat" />
                                    <Picker.Item label="Swabi" value="Swabi" />
                                </Picker>
                            </View>
                            <Text>Clinical Address</Text>
                            <View style={this.state.clinicalAddress != '' ? styles.singleC : styles.singleCfalse}>
                                <TextInput
                                    ref={clinicalAddressref => this.clinicalAddressref = clinicalAddressref}
                                    returnKeyType={'done'}
                                    keyboardType='default'
                                    placeholder='Address here'
                                    underlineColorAndroid='black'
                                    onFocus={() => {
                                        if (this.state.clinicalAddress == 'd') {
                                            this.setState({
                                                clinicalAddress: ''
                                            })
                                        }
                                    }}
                                    onChangeText={(value) => {
                                        this.setState({
                                            clinicalAddress: value
                                        })
                                    }} />
                            </View>
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
                                    if (this.state.specilization == '') {
                                        return;
                                    }
                                    if (this.state.fee == '') {
                                        return;
                                    }
                                    if (this.state.city == '') {
                                        return;
                                    }
                                    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                                        .then(() => {
                                            var curr = firebase.auth().currentUser.uid;
                                            console.log(curr)

                                            firebase.database().ref('users').child('Doctors').child(curr).set({
                                                name: this.state.name,
                                                email: this.state.email,
                                                password: this.state.password,
                                                specilization: this.state.specilization,
                                                fee: this.state.fee,
                                                contact:this.state.contact,
                                                city:this.state.city,
                                                clinicalAddress:this.state.clinicalAddress
                                            })
                                            firebase.database().ref().child('DoctorArea').child(this.state.city).child(curr).set({
                                                docid:curr
                                            })
                                        })
                                        .then(() => {
                                            
                                            let curr = firebase.auth().currentUser.uid;
                                            AsyncStorage.setItem('uid', curr, () => {
                                                AsyncStorage.setItem('type', 'doctor', () => {
                                                    this.props.navigation.navigate('DoctorHome')
                                                })
                                            })
                                        })
                                        .then(()=>{
                                            
                                        })
                                        .catch(function (error) {
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
                                    marginTop: 10,
                                    borderRadius: 5
                                }}>
                                <Text style={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: 17
                                }}>Register</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    body: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 100,
    },
    singleC: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5
    },
    singleCfalse: {
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 5
    },
})