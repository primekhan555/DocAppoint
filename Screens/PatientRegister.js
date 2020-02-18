import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    AsyncStorage,
    StatusBar,
    Dimensions,
    ImageBackground,
    Picker,
    ScrollView
} from 'react-native';
import firebase from 'react-native-firebase'
import DatePicker from 'react-native-datepicker';
export default class DoctorRegister extends Component {
    static navigationOptions = {
        title: 'Patient Registeration',
        headerStyle: {
            backgroundColor: '#40E0D0'
        }
    }
    state = {
        name: 'd',
        email: 'd',
        password: 'd',
        confirmPassword: 'd',
        uid: 0,
        gender: 'Male',
        date: '',
        address: 'd',
        question:'WhatIsyourfavoritebook?',
        answer:'d'
    }
    componentDidMount() {

    }
    render() {
        return (
            <ImageBackground
                source={require('./images/patientreg.jpg')}
                imageStyle={{ opacity: 0.4 }}
                style={styles.body}>
                <ScrollView>
                    <View style={{
                        paddingLeft: 20,
                        paddingEnd: 20,
                        paddingTop: 20,
                        paddingBottom:20
                    }}>
                        <StatusBar backgroundColor='#40E0D0' barStyle='dark-content' />
                        <Text>Patient Name</Text>
                        <View style={this.state.name != '' ? styles.singleC : styles.singleCfalse}>
                            <TextInput
                                keyboardType='default'
                                placeholder='Name here'
                                underlineColorAndroid='black'
                                returnKeyType={'next'}
                                onSubmitEditing={() => {
                                    if (this.state.name != '') {
                                        this.emailref.focus();
                                    }
                                }}
                                onFocus={() => {
                                    if (this.state.name == 'd') {
                                        this.setState({
                                            name: ''
                                        })
                                    }
                                }}
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
                                keyboardType='default'
                                placeholder='Email here'
                                underlineColorAndroid='black'
                                returnKeyType={'next'}
                                onSubmitEditing={() => {
                                    if (this.state.email != '') {
                                        this.passref.focus();
                                    }
                                }}
                                onFocus={() => {
                                    if (this.state.email == 'd') {
                                        this.setState({
                                            email: ''
                                        })
                                    }
                                }}
                                onChangeText={(value) => {
                                    this.setState({
                                        email: value
                                    })
                                }} />
                        </View>
                        <Text>Gender</Text>
                        <View style={styles.singleC}>
                            <Picker
                                selectedValue={this.state.gender}
                                style={{ fontWeight: 'bold' }}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ gender: itemValue })
                                }>
                                <Picker.Item label="Male" value="Male" />
                                <Picker.Item label="Female" value="Female" />
                            </Picker>
                        </View>
                        <Text>Date of Birth</Text>
                        <View style={{ alignSelf: 'center', }}>
                            <DatePicker
                                style={{ width: 315 }}
                                mode="date"
                                date={this.state.date}
                                placeholder="select date"
                                format="YYYY-MM-DD"
                                minDate="1950-01-01"
                                maxDate="2025-01-01"
                                showIcon={false}
                                customStyles={{
                                    dateIcon: {
                                        position: 'relative',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 10
                                    }
                                }}
                                onDateChange={(newDate) => {
                                    this.setState({
                                        date: newDate,
                                    })
                                }} />
                        </View>
                        <Text>Address</Text>
                        <View style={this.state.address != '' ? styles.singleC : styles.singleCfalse}>
                            <TextInput
                                // ref={emailref => this.emailref = emailref}
                                keyboardType='default'
                                placeholder='Address here'
                                underlineColorAndroid='black'
                                returnKeyType={'next'}
                                onSubmitEditing={() => {
                                    if (this.state.address != '') {
                                        this.passref.focus();
                                    }
                                }}
                                onFocus={() => {
                                    if (this.state.address == 'd') {
                                        this.setState({
                                            address: ''
                                        })
                                    }
                                }}
                                onChangeText={(value) => {
                                    this.setState({
                                        address: value
                                    })
                                }} />
                        </View>
                        <Text>password</Text>
                        <View style={this.state.password != '' ? styles.singleC : styles.singleCfalse}>
                            <TextInput
                                ref={passref => this.passref = passref}
                                keyboardType='default'
                                placeholder='Password must be six character'
                                secureTextEntry={true}
                                underlineColorAndroid='black'
                                returnKeyType={'next'}
                                onSubmitEditing={() => {
                                    if (this.state.password != '') {
                                        this.conpassref.focus();
                                    }
                                }}
                                onFocus={() => {
                                    if (this.state.password == 'd') {
                                        this.setState({
                                            password: ''
                                        })
                                    }
                                }}
                                onChangeText={(value) => {
                                    this.setState({
                                        password: value
                                    })
                                }} />
                        </View>
                        <Text>Confirm password</Text>
                        <View style={this.state.confirmPassword != '' ? styles.singleC : styles.singleCfalse}>
                            <TextInput
                                ref={conpassref => this.conpassref = conpassref}
                                keyboardType='default'
                                placeholder='Confirm password here'
                                secureTextEntry={true}
                                underlineColorAndroid='black'
                                returnKeyType={'done'}
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
                        <Text>Choose a Question</Text>
                        <View style={styles.singleC}>
                            <Picker
                                selectedValue={this.state.gender}
                                style={{ fontWeight: 'bold' }}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ question: itemValue })
                                }>
                                <Picker.Item label="What Is your favorite book?" value="WhatIsyourfavoritebook?" />
                                <Picker.Item label="What is the name of the road you grew up on?" value="What is the name of the road you grew up on?" />
                                <Picker.Item label="What is your mother's maiden name?" value="What is your mother's maiden name?" />
                                <Picker.Item label="What was the name of your first/current/favorite pet?" value="What was the name of your first/current/favorite pet?" />
                                <Picker.Item label="What was the first company that you worked for?" value="What was the first company that you worked for?" />
                                <Picker.Item label="Where did you meet your spouse?" value="Where did you meet your spouse?" />
                                <Picker.Item label="Where did you go to high school/college?" value="Where did you go to high school/college?" />
                                <Picker.Item label="What is your favorite food?" value="What is your favorite food?" />
                                <Picker.Item label="What city were you born in?" value="What city were you born in?" />
                                <Picker.Item label="Where is your favorite place to vacation?" value="Where is your favorite place to vacation?" />
                            </Picker>
                        </View>
                        <Text>Answer</Text>
                        <View style={this.state.name != '' ? styles.singleC : styles.singleCfalse}>
                            <TextInput
                                keyboardType='default'
                                placeholder='Answer here'
                                underlineColorAndroid='black'
                                returnKeyType={'next'}
                                onSubmitEditing={() => {
                                    // if (this.state.answer != '') {
                                    //     this.emailref.focus();
                                    // }
                                }}
                                onFocus={() => {
                                    if (this.state.answer == 'd') {
                                        this.setState({
                                            answer: ''
                                        })
                                    }
                                }}
                                onChangeText={(value) => {
                                    this.setState({
                                        answer: value
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
                                if (this.state.answer == '') {
                                    return;
                                }
                                if (this.state.password == this.state.confirmPassword) {
                                    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                                        .then(() => {
                                            var curr = firebase.auth().currentUser.uid;
                                            firebase.database().ref('users').child('Patients').child(curr).set({
                                                name: this.state.name,
                                                email: this.state.email,
                                                password: this.state.password,
                                                date: this.state.date,
                                                gender: this.state.gender,
                                                address: this.state.address,
                                                question:this.state.question,
                                                answer:this.state.answer
                                            })
                                        })
                                        .then(() => {
                                            let curr = firebase.auth().currentUser.uid;
                                            AsyncStorage.setItem('uid', curr, () => {
                                                AsyncStorage.setItem('type', 'patient', () => {
                                                    this.props.navigation.navigate('PatientHome')
                                                })
                                            })
                                            AsyncStorage.setItem('patientName', this.state.name, () => {
                                                AsyncStorage.setItem('patientemail', this.state.email, () => {
                                                })
                                            })
                                        })
                                        .catch(function (error) {
                                            var errorCode = error.code;
                                            var errorMessage = error.message;
                                        })
                                }

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
                            }}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    body: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 150,
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