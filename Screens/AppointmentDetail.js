import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    TouchableHighlight,
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import firebase from 'react-native-firebase';
import DatePicker from 'react-native-datepicker';

export default class AppointmentDetail extends Component {
    state = {
        patientuid: '',
        patientName: '',
        appointmentDate: '',
        appointmentStatus: '',
        confModel: false,
        pospmod: false,
        cancelmod: false,
        date: '2019-10-22'
    }
    componentDidMount() {
        let date = new Date();
        let year = date.getFullYear().toString();
        let month = date.getMonth() + 1;
        let month1 = month.toString();
        let day = date.getDate().toString();
        var patientuid = this.props.navigation.getParam('patientuid', '');
        var patientName = this.props.navigation.getParam('patientName', '');
        var appointmentStatus = this.props.navigation.getParam('AppointmentStatus', '');
        var appointmentDate = this.props.navigation.getParam('AppointmentDate', '');
        this.setState({
            patientuid: patientuid,
            patientName: patientName,
            appointmentDate: appointmentDate,
            appointmentStatus: appointmentStatus,
        })
    }
    render() {
        return (
            <View style={{
                justifyContent: 'center',
                alignContent: 'center'
            }}>
                <Text style={{
                    justifyContent: 'center',
                    alignSelf: 'center',
                    fontSize: 20,
                    paddingTop: 10,
                }}>
                    Appointment Detail
                </Text>
                <View style={styles.content}>
                    <Text style={styles.texthead}>Patient Name</Text>
                    <Text style={styles.textdata}>{this.state.patientName != '' ? this.state.patientName : ''}</Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.texthead}>Appointment Date</Text>
                    <Text style={styles.textdata}>{this.state.appointmentDate != '' ? this.state.appointmentDate : ''}</Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.texthead}>Appointment Status</Text>
                    <Text style={styles.textdata}>{this.state.appointmentStatus != '' ? this.state.appointmentStatus : ''}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    marginTop: 20
                }}>
                    <TouchableOpacity
                        style={{
                            marginStart: 20,
                            backgroundColor: 'lightgreen',
                            width: 80,
                            height: 30,
                            justifyContent: 'center',
                            borderRadius: 3
                        }}
                        onPress={() => {
                            this.setState({
                                confModel: true,
                            })
                        }}>
                        <Text style={{
                            color: 'white',
                            fontWeight: 'bold',
                            justifyContent: 'center',
                            alignSelf: 'center',
                        }}>Confirm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            marginStart: 20,
                            backgroundColor: '#c91010',
                            justifyContent: 'center',
                            height: 30,
                            width: 80,
                            borderRadius: 3,
                        }}
                        onPress={() => {
                            var patientuid = this.state.patientuid;
                            var ref = firebase.database().ref();
                            var user = firebase.auth().currentUser;
                            var uid;
                            if (user != null) {
                                uid = user.uid;
                            }
                            ref.child('users').child('Appointments').child(uid).child(patientuid).update({ 'status': 'canceled' })
                                .then(() => {
                                    const resetAction = StackActions.reset({
                                        index: 0,
                                        actions: [
                                            // NavigationActions.navigate({ routeName: 'QRCodeScanner' }),
                                            NavigationActions.navigate({ routeName: 'DoctorHome' }),
                                        ],
                                    });
                                    this.props.navigation.dispatch(resetAction);
                                    // this.props.navigation.navigate('DoctorHome');
                                })
                        }}>
                        <Text style={{
                            color: 'white',
                            fontWeight: 'bold',
                            alignSelf: 'center'
                        }}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            marginStart: 20,
                            backgroundColor: 'lightblue',
                            justifyContent: 'center',
                            height: 30,
                            width: 80,
                            borderRadius: 3,
                        }}
                        onPress={() => {
                            this.setState({
                                pospmod: true
                            })
                        }}>
                        <Text style={{
                            color: 'white',
                            fontWeight: 'bold',
                            alignSelf: 'center'
                        }}>Pospond</Text>
                    </TouchableOpacity>
                </View>
                <Modal
                    style={{
                        justifyContent: 'center',
                        backgroundColor: 'red'
                    }}
                    animationType="fade"
                    transparent={true}
                    visible={this.state.confModel}
                    onRequestClose={() => {
                        // Alert.alert('Modal has been closed.');

                        this.setModalVisible(!this.state.confModel);
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
                            height: 270,
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
                                }}>Confirmation</Text>
                                <View style={{
                                    borderColor: 'black',
                                    borderWidth: 1,
                                    width: 120,
                                    marginBottom: 10
                                }} />
                                <Text>Are you Sure , The appointment will be confirmed After pressing Confirm</Text>
                            </View>
                            <View>
                                <TouchableHighlight
                                    style={{
                                        backgroundColor: 'green',
                                        height: 35,
                                        width: 200,
                                        justifyContent: 'center',
                                        borderRadius: 4,
                                        marginTop: 20
                                    }}
                                    onPress={() => {
                                        var patientuid = this.state.patientuid;
                                        var ref = firebase.database().ref();
                                        var user = firebase.auth().currentUser;
                                        var uid;
                                        if (user != null) {
                                            uid = user.uid;
                                        }
                                        ref.child('users').child('Appointments').child(uid).child(patientuid).update({ 'status': 'confirmed' })
                                            .then(() => {
                                                const resetAction = StackActions.reset({
                                                    index: 0,
                                                    actions: [
                                                        // NavigationActions.navigate({ routeName: 'QRCodeScanner' }),
                                                        NavigationActions.navigate({ routeName: 'DoctorHome' }),
                                                    ],
                                                });
                                                this.props.navigation.dispatch(resetAction);
                                                // this.props.navigation.navigate('DoctorHome');
                                            })
                                        this.setModalVisible(!this.state.confModel);
                                    }}>
                                    <Text style={{
                                        alignSelf: 'center',
                                        fontWeight: 'bold',
                                        color: 'white'
                                    }}>Confirm</Text>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    style={{
                                        backgroundColor: 'red',
                                        height: 35,
                                        width: 200,
                                        justifyContent: 'center',
                                        borderRadius: 4,
                                        marginTop: 10
                                    }}
                                    onPress={() => {
                                        this.setModalVisible(!this.state.confModel);
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
                {/* Pospond modal */}
                <Modal
                    style={{
                        justifyContent: 'center',
                        backgroundColor: 'red'
                    }}
                    animationType="fade"
                    transparent={true}
                    visible={this.state.pospmod}
                    onRequestClose={() => {
                        // Alert.alert('Modal has been closed.');
                        this.setpospModalVisible(!this.state.pospmod);
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
                            height: 330,
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
                                }}>Confirmation</Text>
                                <View style={{
                                    borderColor: 'black',
                                    borderWidth: 1,
                                    width: 120,
                                    marginBottom: 10
                                }} />
                                <Text>Are you Sure , The appointment will be posponded to the given date</Text>
                            </View>
                            <View>
                                <View style={{ margin: 10, alignSelf: 'center', marginTop: 30, }}>
                                    <DatePicker
                                        style={{ width: 275 }}
                                        mode="date"
                                        date={this.state.date}
                                        placeholder="select date"
                                        format="YYYY-MM-DD"
                                        minDate="1980-01-01"
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
                            </View>
                            <View>
                                <TouchableHighlight
                                    style={{
                                        backgroundColor: 'green',
                                        height: 35,
                                        width: 200,
                                        justifyContent: 'center',
                                        borderRadius: 4,
                                        marginTop: 20
                                    }}
                                    onPress={() => {
                                        this.setpospModalVisible(!this.state.pospmod);
                                    }}>
                                    <Text style={{
                                        alignSelf: 'center',
                                        fontWeight: 'bold',
                                        color: 'white'
                                    }}>Confirm</Text>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    style={{
                                        backgroundColor: 'red',
                                        height: 35,
                                        width: 200,
                                        justifyContent: 'center',
                                        borderRadius: 4,
                                        marginTop: 10
                                    }}
                                    onPress={() => {
                                        this.setpospModalVisible(!this.state.pospmod);
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
    setModalVisible(visible) {
        this.setState({ confModel: visible });
    }
    setpospModalVisible(visible) {
        this.setState({ pospmod: visible });
    }
}
const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        marginTop: 20,
        alignSelf: 'center'
    },
    texthead: {
        fontWeight: 'bold',
        color: 'gray'
    },
    textdata: {
        marginLeft: 40
    }
})