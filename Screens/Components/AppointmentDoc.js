import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    TouchableHighlight,
} from 'react-native';
import firebase from 'react-native-firebase';
import DatePicker from 'react-native-datepicker';
import { StackActions, NavigationActions } from 'react-navigation';
export default class AppointmentDoc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confModal: false,
            datevisibility: false,
            modalheight: 470,
            date: ''
        }
    }
    setModalVisible(visible) {
        this.setState({ confModal: visible });
    }
    render() {
        return (
            <View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        this.setModalVisible(!this.state.confModal)

                    }}>
                    <View
                        style={{
                            flexDirection: 'column',
                            borderColor: 'lightgray',
                            borderWidth: 1,
                            width: '97%',
                            marginTop: 10,
                            marginLeft: 5,
                            borderRadius: 4,
                            marginEnd: 1,
                            backgroundColor: 'white',
                            paddingBottom: 20
                        }}>

                        <View style={{
                            backgroundColor: 'white',
                            flexDirection: 'row',
                        }}>
                            <View style={{ marginLeft: 30, marginBottom: 30, flex: 8, marginTop: 20 }}>
                                <Text style={{ color: '#434547', fontWeight: 'bold', fontSize: 15 }}>{this.props.item.patientName}</Text>
                            </View>
                            <View style={[styles.generalStyle]}>
                                <Text style={{
                                    color: this.props.item.AppointmentStatus=='confirmed'?'green':'red',
                                    fontWeight: 'bold',
                                }}>{this.props.item.AppointmentStatus}</Text>
                            </View>
                            <View style={{ marginLeft: 20, marginBottom: 30, flex: 8, marginTop: 20, paddingRight: 10 }}>
                                <Text style={{
                                    color: '#434547',
                                    fontWeight: 'bold',
                                    fontSize: 15
                                }}>{this.props.item.AppointmentDate}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <Modal
                    style={{
                        justifyContent: 'center',
                        backgroundColor: 'red',
                    }}
                    animationType="fade"
                    transparent={true}
                    visible={this.state.confModal}
                    onRequestClose={() => {
                        // Alert.alert('Modal has been closed.');
                        this.setModalVisible(!this.state.confModal);
                    }}>
                    <View style={{
                        backgroundColor: 'rgba(203, 192, 192, 0.8)',
                        flex: 1,
                        justifyContent: 'center'
                    }}>
                        <View style={{
                            marginTop: '20%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'white',
                            height: this.state.modalheight,
                            width: 300,
                            alignSelf: 'center',
                            borderRadius: 10,
                            justifyContent: 'center'
                        }}>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingRight: 20,
                                paddingLeft: 20
                            }}>
                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: 'bold'
                                }}>Patient Detail</Text>
                                <View style={{
                                    borderColor: 'black',
                                    borderWidth: 1,
                                    width: 120,
                                    marginBottom: 10
                                }} />
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.heading}>Patient Name : </Text>
                                    <Text style={styles.values}>{this.props.item.patientName}</Text>
                                </View>
                                <View style={styles.hr} />
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.heading}>Appointment Date : </Text>
                                    <Text style={styles.values}>{this.props.item.AppointmentDate}</Text>
                                </View>
                                <View style={styles.hr} />
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.heading}>Patient Address : </Text>
                                    <Text style={styles.values}>{this.props.item.userAddress}</Text>
                                </View>
                                <View style={styles.hr} />
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.heading}>Email : </Text>
                            <Text style={styles.values}>{this.props.item.userEmail}</Text>
                                </View>
                                <View style={styles.hr} />
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.heading}>Age : </Text>
                                    <Text style={styles.values}>{this.props.item.userDoB}</Text>
                                </View>
                                <View style={styles.hr} />
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.heading}>Gender : </Text>
                                    <Text style={styles.values}>{this.props.item.userGender}</Text>
                                </View>
                                <View style={styles.hr} />
                                {this.state.datevisibility ?
                                    <View style={{ margin: 10, marginTop: 30, }}>
                                        <DatePicker
                                            style={{ width: 275, }}
                                            mode="date"
                                            date={this.state.date}
                                            placeholder="select date"
                                            format="YYYY-MM-DD"
                                            minDate={this.state.today}
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
                                    </View> : null
                                }
                            </View>
                            <View>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableHighlight
                                        style={{
                                            backgroundColor: 'green',//this.state.datevisibility ? '#40E0D0' : 'green',
                                            height: 35,
                                            width: 70,
                                            justifyContent: 'center',
                                            borderRadius: 4,
                                            marginTop: 20,
                                            marginRight: 5
                                        }}
                                        onPress={() => {
                                            let pUid = this.props.item.uid
                                            var user = firebase.auth().currentUser;
                                            var uid;
                                            if (user != null) {
                                                uid = user.uid;
                                            }
                                            firebase.database().ref('users').child('Appointments').child(uid).child(pUid).update({
                                                status: 'confirmed'
                                            }).then(() => {
                                                const resetAction = StackActions.reset({
                                                    index: 0,
                                                    actions: [
                                                        // NavigationActions.navigate({ routeName: 'QRCodeScanner' }),
                                                        NavigationActions.navigate({ routeName: 'DoctorHome' }),
                                                    ],
                                                });
                                                this.props.navigation.dispatch(resetAction);
                                                // this.setModalVisible(!this.state.confModal);
                                            })
                                        }}>
                                        <Text style={{
                                            alignSelf: 'center',
                                            fontWeight: 'bold',
                                            color: 'white'
                                        }}>Confirm</Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight
                                        style={{
                                            backgroundColor: this.state.datevisibility ? '#40E0D0' : 'lightblue',
                                            height: 35,
                                            width: 80,
                                            justifyContent: 'center',
                                            borderRadius: 4,
                                            marginTop: 20,
                                            marginRight: 5
                                        }}
                                        onPress={() => {
                                            if (!this.state.datevisibility) {
                                                this.setState({
                                                    datevisibility: true,
                                                    modalheight: 450,
                                                })
                                            }
                                            else {
                                                let pUid = this.props.item.uid;
                                                var user = firebase.auth().currentUser;
                                                var uid;
                                                if (user != null) {
                                                    uid = user.uid;
                                                }
                                                let date = this.state.date;
                                                firebase.database().ref('users').child('Appointments').child(uid).child(pUid).update({
                                                    date: date,
                                                    status: 'posponded'
                                                })
                                                    .then(() => {
                                                        // this.setModalVisible(!this.state.confModal);
                                                        const resetAction = StackActions.reset({
                                                            index: 0,
                                                            actions: [
                                                                // NavigationActions.navigate({ routeName: 'QRCodeScanner' }),
                                                                NavigationActions.navigate({ routeName: 'DoctorHome' }),
                                                            ],
                                                        });
                                                        this.props.navigation.dispatch(resetAction);
                                                    })
                                            }
                                        }}>
                                        <Text style={{
                                            alignSelf: 'center',
                                            fontWeight: 'bold',
                                            color: 'white'
                                        }}>Pospond</Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight
                                        style={{
                                            backgroundColor: 'orange',//this.state.datevisibility ? '#40E0D0' : 'green',
                                            height: 35,
                                            width: 80,
                                            justifyContent: 'center',
                                            borderRadius: 4,
                                            marginTop: 20,
                                        }}
                                        onPress={() => {
                                            console.log(this.props.item.uid)
                                            let pUid = this.props.item.uid

                                            var user = firebase.auth().currentUser;
                                            var uid;
                                            if (user != null) {
                                                uid = user.uid;
                                            }
                                            firebase.database().ref('users').child('Appointments').child(uid).child(pUid).update({
                                                status: 'canceled'
                                            }).then(() => {
                                                const resetAction = StackActions.reset({
                                                    index: 0,
                                                    actions: [
                                                        // NavigationActions.navigate({ routeName: 'QRCodeScanner' }),
                                                        NavigationActions.navigate({ routeName: 'DoctorHome' }),
                                                    ],
                                                });
                                                this.props.navigation.dispatch(resetAction);
                                                // this.setModalVisible(!this.state.confModal);
                                            })
                                        }}>
                                        <Text style={{
                                            alignSelf: 'center',
                                            fontWeight: 'bold',
                                            color: 'white'
                                        }}>Remove</Text>
                                    </TouchableHighlight>
                                </View>
                                <TouchableHighlight
                                    style={{
                                        backgroundColor: 'red',
                                        height: 35,
                                        width: 240,
                                        justifyContent: 'center',
                                        borderRadius: 4,
                                        marginTop: 10
                                    }}
                                    onPress={() => {
                                        this.setState({
                                            datevisibility: false,
                                            modalheight: 370,
                                        })
                                        this.setModalVisible(!this.state.confModal);
                                    }}>
                                    <Text style={{
                                        alignSelf: 'center',
                                        fontWeight: 'bold',
                                        color: 'white',
                                    }}>Close</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
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