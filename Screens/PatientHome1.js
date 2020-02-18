import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    Picker,
} from 'react-native';
import firebase from 'react-native-firebase'
import DocAreaC from './Components/DocAreaC';
import DatePicker from 'react-native-datepicker';
export default class PatientHome1 extends Component {
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
    constructor(props) {
        super(props);
        this.state = {
            docName: '',
            specilization: '',
            arr: [],
            isLoading: true,
            datasourse: [],
        }
    }
    componentDidMount() {
        var newarr = [];
        this.props.navigation.setParams({ signOut: this._logout.bind(this) })
        var user = firebase.auth().currentUser;
        var uid;
        if (user != null) {
            uid = user.uid;
        }
        var ref = firebase.database().ref();
        ref.child('DoctorArea').on('value', (datasnapshot) => {
            if (datasnapshot.exists()) {
                let values = datasnapshot.val()
                let key = Object.keys(values);
                key.forEach(element => {
                    var obj = {};
                    obj["area"] = element;
                    newarr.push(obj);
                });
                this.setState({
                    datasourse: newarr,
                    isLoading: false
                })
                console.log(this.state.datasourse)
            }
        })
        // ref.child('users').child('Appointments').on('value', (datasnapshot) => {
        //     if ((datasnapshot.exists())) {
        //         var value = datasnapshot.val();
        //         var key = Object.keys(value);
        //         key.forEach(element => {
        //             var obj = {};
        //             ref.child('users').child('Appointments').child(element).on('value', function (datasnapshot1) {
        //                 if ((datasnapshot1.child(uid).exists())) {
        //                     var datasnap = datasnapshot1.child(uid);
        //                     obj["patientName"] = datasnap.val().patientName;
        //                     obj["docName"] = datasnap.val().docName;
        //                     obj["AppointmentStatus"] = datasnap.val().status;
        //                     obj["AppointmentDate"] = datasnap.val().date;
        //                     obj["uid"] = element
        //                     newarr.push(obj);
        //                 }
        //             })
        //             this.setState({
        //                 arr: newarr,
        //                 isLoading:false,
        //             })
        //         });
        //     }

        // })
    }
    render() {
        if (this.state.isLoading) {
            return (
                <View>
                    <ActivityIndicator />
                </View>
            )
        }
        return (
            <View>
                
                <View>
                    <FlatList
                        // extraData={this.state}
                        data={this.state.datasourse}
                        renderItem={({ item, index }) => {
                            return (
                                <DocAreaC item={item} index={index} navigation={this.props.navigation} />
                            );
                        }}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        )

    }
}
const styles = StyleSheet.create({
    generalStyle: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        alignItems: 'center'
    },
    generalText: {
        color: '#3e5748',
        fontWeight: 'bold',
    },
})