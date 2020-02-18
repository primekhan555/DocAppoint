import React from 'react';
import {
    View,
    Text,
    FlatList,
    ImageBackground,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import firebase from 'react-native-firebase';
import AppointmentDoc from './Components/AppointmentDoc';
export default class PospondedAppoint extends React.Component{
    constructor(props){
        super(props);
        this.state={
            arr:[],
            isLoading:false
        }
    }
    componentDidMount(){
        var user = firebase.auth().currentUser;
        var uid;
        if (user != null) {
            uid = user.uid;
        }
        var newarr = [];
        var ref = firebase.database().ref();
        ref.child('users').child('Appointments').child(uid).on('value', (datasnapshot) => {
            if ((datasnapshot.exists())) {
                var value = datasnapshot.val();
                var key = Object.keys(value);
                key.forEach(element => {
                    var obj = {};
                    
                    ref.child('users').child('Appointments').child(uid).on('value', (datasnapshot1) => {
                        if ((datasnapshot1.child(element).exists())) {
                            var datasnap = datasnapshot1.child(element);
                            // console.log(datasnap.val().docName)
                            if (datasnap.val().status=='posponded') {
                                obj["patientName"] = datasnap.val().patientName;
                                obj["AppointmentStatus"] = datasnap.val().status;
                                obj["userEmail"] = datasnap.val().userEmail;
                                obj["userAddress"] = datasnap.val().userAddress;
                                obj["userGender"] = datasnap.val().userGender;
                                obj["userDoB"] = datasnap.val().userDoB;
                                obj["AppointmentDate"] = datasnap.val().date;
                                obj["uid"] = element
                                newarr.push(obj);
                                this.setState({
                                    arr: newarr,
                                    isLoading: false,
                                })
                            }
                           
                        }
                    })
                });
            }
        })
    }
    render(){
        if (this.state.isLoading) {
            <View>
                <ActivityIndicator />
            </View>
        }
        return(
            <FlatList
                extraData={this.state.arr}
                data={this.state.arr}
                // refreshing={this.state.refreshing}
                // onRefresh={() => {
                //     this.setState({
                //         refreshing: false
                //     })
                // }}
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