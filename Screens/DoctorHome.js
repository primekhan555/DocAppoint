import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    AsyncStorage,
    FlatList,
} from 'react-native';

import firebase from 'react-native-firebase';
import AppointmentDoc from './Components/AppointmentDoc';
export default class DoctorHome extends Component {
    state = {
        Loading: true,
        arr: [],
        refreshing: false
    }
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        let headerRight = (
            <TouchableOpacity
                onPress={() => {
                    params.signOut()
                }}
                style={{
                    backgroundColor: '#ff6666',
                    height: 30,
                    width: 50,
                    justifyContent: 'center',
                    borderRadius: 3,
                    marginRight: 10
                }}><Text style={{
                    color: 'white',
                    fontWeight: 'bold',
                    alignSelf: 'center'
                }}>logout</Text></TouchableOpacity>
        );
        return { headerRight };
    }
    _logout() {
        firebase.auth().signOut()
            .then(() => {
                AsyncStorage.removeItem('uid');
                this.props.navigation.navigate('OptionsScreen');
            }).catch((error) => {
                console.log('internal error occured')
            });
    }
    componentDidMount() {
        this.props.navigation.setParams({ signOut: this._logout.bind(this) });
        var user = firebase.auth().currentUser;
        var uid;
        if (user != null) {
            uid = user.uid;
        }
        var newarr = [];
        var ref = firebase.database().ref();
        ref.child('users').child('Appointments').child(uid).on('value', (datasnapshot) => {
            if (datasnapshot.exists()) {
                var value = datasnapshot.val();
                var key = Object.keys(value);
                key.forEach(element => {
                    var k = element;
                    var obj = {};
                    ref.child('users').child('Appointments').child(uid).on('value', (datasnapshot1) => {
                        if (datasnapshot1.child(k).exists()) {
                            var datasnap = datasnapshot1.child(k);
                            obj["patientName"] = datasnap.val().patientName;
                            obj["AppointmentStatus"] = datasnap.val().status;
                            obj["userEmail"] = datasnap.val().userEmail;
                            obj["userAddress"] = datasnap.val().userAddress;
                            obj["userGender"] = datasnap.val().userGender;
                            obj["userDoB"] = datasnap.val().userDoB;
                            obj["AppointmentDate"] = datasnap.val().date;
                            obj["uid"] = k
                            newarr.push(obj);
                            this.setState({
                                arr: newarr,
                                Loading: false
                            })
                        }
                    })
                });
            }
        })
        if (this.state.arr.length == 0) {
            console.log("fjsalfk")
        }
        console.log(this.state.arr.length)
    }
    render() {

        if (this.state.arr.length == 0) {
            return (
                <View style={{}}>
                    <Text style={{ fontSize: 20,alignSelf:'center', paddingTop:50 }}>No Appointment Exist</Text>
                </View>
            )
        }
        if (this.state.Loading) {
            return (
                <ActivityIndicator />
            )
        }
        return (
            <FlatList
                extraData={this.state.arr}
                data={this.state.arr}
                refreshing={this.state.refreshing}
                onRefresh={() => {
                    this.setState({
                        refreshing: false
                    })
                }}
                renderItem={({ item, index }) => {
                    return (
                        <AppointmentDoc item={item} index={index} navigation={this.props.navigation} />
                    )
                }}
                keyExtractor={(item, index) => item.toString()}
            />
        )
    }
}
