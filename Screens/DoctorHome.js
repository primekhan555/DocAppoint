import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    AsyncStorage,
    FlatList,
    ImageBackground,
    Dimensions
} from 'react-native';

import firebase from 'react-native-firebase';
import ActionButton from 'react-native-action-button';
import AppointmentDoc from './Components/AppointmentDoc';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class DoctorHome extends Component {
    state = {
        Loading: true,
        arr: [],
        refreshing: false,
        buttonState: true,
        buttonColor: "green"
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
                            if (datasnap.val().status != 'canceled' && datasnap.val().status != 'posponded') {
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
                <ImageBackground
                imageStyle={{ opacity: 0.4 }}
                style={styles.body}
                source={require('./images/docOptions2.png')}>
                <View style={{}}>
                    <Text style={{ fontSize: 20,alignSelf:'center', paddingTop:50 }}>No Appointment Exist</Text>
                </View>
                <ActionButton
                    style={{
                        marginEnd: -15,
                        marginBottom: -20,
                    }}
                    degrees={310}
                    buttonColor={this.state.buttonColor}
                    onPress={() => {
                        if (this.state.buttonColor == "red") {
                            this.setState({
                                buttonColor: "green",
                                buttonState: false
                            })
                        }
                        else {
                            this.setState({
                                buttonColor: "red",
                                buttonState: true
                            })
                        }
                    }}>
                    <ActionButton.Item
                        size={56}
                        buttonColor='#fcba03'
                        title="Posponded Appointment"
                        onPress={() => this.props.navigation.navigate('PospondedAppoint')}>
                        <Icon
                            name="calendar-plus-o"
                            style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    {/* <ActionButton.Item
                        buttonColor='#03fc84'
                        title="Personal Information"
                        onPress={() => {
                            this.props.navigation.navigate('PersonalInfo')
                        }}>
                        <Icon
                            name="cog"
                            style={styles.actionButtonIcon} />
                    </ActionButton.Item> */}
                </ActionButton>
                </ImageBackground>
            )
        }
        if (this.state.Loading) {
            return (
                <ActivityIndicator />
            )
        }
        return (
            <ImageBackground
            imageStyle={{ opacity: 0.4 }}
            style={styles.body}
            source={require('./images/docOptions2.png')}>
                <View>
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
            </View>
            <ActionButton
                    style={{
                        marginEnd: -15,
                        marginBottom: -20,
                    }}
                    degrees={310}
                    buttonColor={this.state.buttonColor}
                    onPress={() => {
                        if (this.state.buttonColor == "red") {
                            this.setState({
                                buttonColor: "green",
                                buttonState: false
                            })
                        }
                        else {
                            this.setState({
                                buttonColor: "red",
                                buttonState: true
                            })
                        }
                    }}>
                    <ActionButton.Item
                        size={56}
                        buttonColor='#fcba03'
                        title="Posponded Appointment"
                        onPress={() => this.props.navigation.navigate('PospondedAppoint')}>
                        <Icon
                            name="calendar-plus-o"
                            style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
            </ImageBackground>
        )
    }
}
const styles =StyleSheet.create({
    actionButtonIcon: {
        fontSize: 30,
        height: 30,
        color: 'black',
    },
    body: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 100,
    },
})
