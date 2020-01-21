import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    AsyncStorage,
    Modal,
    TouchableHighlight,
    Alert,
    StyleSheet,
} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';
import { withNavigation } from 'react-navigation';
import { StackActions, NavigationActions } from 'react-navigation';
import firebase from 'react-native-firebase';
class AppointmentItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: '',
            height: '',
            viewHeight: 70,
            confModel: false,
            datevisibility: false,
            modalheight: 370,
            today: ''
        }
    }
    setModalVisible(visible) {
        this.setState({ confModel: visible });
    }
    componentDidMount() {
        let date = new Date();
        let year = date.getFullYear().toString()
        let month = date.getMonth() + 1;
        let month1 = month.toString();
        let day = date.getDate().toString();
        let whole = year + "-" + month1 + "-" + day;
        this.setState({
            today: whole
        })
    }
    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: "column",
                marginBottom: 9,
                marginTop: 2,
                height: this.state.viewHeight,
                marginLeft: 10,
                marginRight: 10,
                borderRadius: 8,
                borderColor: 'black',
                borderWidth: .5,
                padding: 5,
                alignItems: 'center',
                backgroundColor: '#f5f5f5'//this.props.index % 2 == 0 ? '#9e8e8d' : '#ff6666'
            }}>
                <TouchableOpacity onPress={() => {
                    this.setModalVisible(!this.state.confModel)
                }}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }}>
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ paddingLeft: 10, color: '#b0a9a9', fontSize: 15 }}>Doctor Name :</Text>
                            <Text style={{ width: '40%', paddingLeft: 5, color: '#3b3030', fontStyle: 'italic' }}>{this.props.item.name}</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ paddingLeft: 10, color: '#b0a9a9', fontSize: 15 }}>Specialization :</Text>
                            <Text style={{ paddingLeft: 5, color: '#3b3030' }}>{this.props.item.specialization}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ paddingLeft: 10, color: '#b0a9a9', fontSize: 15 }}>Contact No :</Text>
                                <Text style={{ paddingLeft: 5, color: '#3b3030', fontWeight: 'bold' }}>{this.props.item.contact}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <Modal
                    style={{
                        justifyContent: 'center',
                        backgroundColor: 'red'
                    }}
                    animationType="fade"
                    transparent={true}
                    visible={this.state.confModel}
                    onRequestClose={() => {
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
                                }}>Doctor Detail</Text>
                                <View style={{
                                    borderColor: 'black',
                                    borderWidth: 1,
                                    width: 120,
                                    marginBottom: 10
                                }} />
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.heading}>Doctor Name</Text>
                                    <Text style={styles.values}>{this.props.item.name}</Text>
                                </View>
                                <View style={styles.hr} />
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.heading}>Specialization</Text>
                                    <Text style={styles.values}>{this.props.item.specialization}</Text>
                                </View>
                                <View style={styles.hr} />
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.heading}>Clinical Address</Text>
                                    <Text style={styles.values}>{this.props.item.clinicalAddress}</Text>
                                </View>
                                <View style={styles.hr} />
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.heading}>Email</Text>
                                    <Text style={styles.values}>{this.props.item.email}</Text>
                                </View>
                                <View style={styles.hr} />
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.heading}>Fee</Text>
                                    <Text style={styles.values}>{this.props.item.fee}</Text>
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
                                <TouchableHighlight
                                    style={{
                                        backgroundColor: this.state.datevisibility ? '#40E0D0' : 'green',
                                        height: 35,
                                        width: 200,
                                        justifyContent: 'center',
                                        borderRadius: 4,
                                        marginTop: 20
                                    }}
                                    onPress={() => {
                                        if (!this.state.datevisibility) {
                                            this.setState({
                                                datevisibility: true,
                                                modalheight: 450,
                                            })
                                        }
                                        else {
                                            var user = firebase.auth().currentUser;
                                            var uid;
                                            if (user != null) {
                                                uid = user.uid;
                                            }
                                            var username, userEmail, date, docuid, doctorName,userAddress,userGender,userDoB;
                                            date = this.state.date;
                                            docuid = this.props.item.uid;
                                            doctorName = this.props.item.name;
                                            var ref = firebase.database().ref().child('users').child('Patients').child(uid);
                                            ref.once('value').then(function (snapshot) {
                                                username = snapshot.val().name;
                                                userAddress = snapshot.val().address;
                                                userEmail = snapshot.val().email;
                                                userGender = snapshot.val().gender;
                                                userDoB = snapshot.val().date;
                                                firebase.database().ref('users').child('Appointments').child(docuid).child(uid).set({
                                                    docName: doctorName,
                                                    patientName: username,
                                                    userAddress: userAddress,
                                                    userEmail:userEmail,
                                                    userGender:userGender,
                                                    userDoB:userDoB,
                                                    date: date,
                                                    status: 'pending'
                                                })
                                            })
                                                .then(() => {
                                                    const resetAction = StackActions.reset({
                                                        index: 0,
                                                        actions: [
                                                            // NavigationActions.navigate({ routeName: 'QRCodeScanner' }),
                                                            NavigationActions.navigate({ routeName: 'PatientHome' }),
                                                        ],
                                                    });
                                                    this.props.navigation.dispatch(resetAction);
                                                    // this.props.navigation.navigate('PatientHome');
                                                })
                                            this.setModalVisible(!this.state.confModel);
                                            // this.setState({
                                            //     datevisibility: false,
                                            //     modalheight: 370,
                                            // })
                                        }
                                    }}>
                                    <Text style={{
                                        alignSelf: 'center',
                                        fontWeight: 'bold',
                                        color: 'white'
                                    }}>{this.state.datevisibility ? 'Confirm Appointment' : 'Book Appointment'}</Text>
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
                                        this.setState({
                                            datevisibility: false,
                                            modalheight: 370,
                                        })
                                        this.setModalVisible(!this.state.confModel);
                                    }}>
                                    <Text style={{
                                        alignSelf: 'center',
                                        fontWeight: 'bold',
                                        color: 'white',
                                    }}>{this.state.datevisibility ? 'Cancel' : 'Close'}</Text>
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
    heading: {
        color: 'gray',
        paddingRight: 10,
    },
    values: {
        fontWeight: 'bold'
    },
    hr: {
        borderBottomColor: 'black',
        borderBottomWidth: .5,
        width: 220,
        marginBottom: 10
    },
})
export default withNavigation(AppointmentItem)
