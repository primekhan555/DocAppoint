import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    AsyncStorage,
    Modal,
    TouchableHighlight,
    Alert,
    StyleSheet
} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { StackActions, NavigationActions } from 'react-navigation';
import { withNavigation } from 'react-navigation';
import firebase from 'react-native-firebase';
class AppointmentItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: '',
            height: '',
            viewHeight: 170,
            modalVisible: false,
            modalheight: 370,
            confModal:false,
        }
    }
    setModalVisible(visible) {
        this.setState({ confModal: visible });
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
                borderRadius: 10,
                borderColor: 'black',
                borderWidth: .5,
                padding: 5,
                alignItems: 'center',
                backgroundColor: 'white' // this.props.index%2==0?'pink':'#91cfa9',//'white'//this.props.index % 2 == 0 ? '#9e8e8d' : '#ff6666'
            }}>
                <TouchableOpacity onPress={() => {
                    // var diseaseId = this.props.item.diseaseId;
                    // AsyncStorage.setItem('diseaseId', JSON.stringify(diseaseId), () => {
                    //     this.props.navigation.navigate('UN_VerifiedDetail')
                    // })

                }}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }}></TouchableOpacity>

                <View style={{
                    marginTop: 5,
                    flexDirection: "row",
                    width: 300
                }}>
              
                    <Text style={{
                        color: '#000000',
                        fontWeight: 'bold',
                        fontSize: 17,
                        textAlign: 'center',
                        textDecorationLine: "underline",
                        alignSelf: 'center',
                        marginStart: 0,
                    }}>Appointment</Text>
                  
                </View>
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ paddingLeft: 10, color: '#b0a9a9', fontSize: 15 }}>Doctor Name :</Text>
                        <Text style={{ width: '60%', height: 25, paddingLeft: 5, color: '#3b3030', fontStyle: 'italic' }}>{this.props.item.docName}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ paddingLeft: 10, color: '#b0a9a9', fontSize: 15 }}>Appointment Date :</Text>
                        <Text style={{ paddingLeft: 5, color: '#3b3030' }}>{this.props.item.AppointmentDate}</Text>
                    </View>
                    <View style={{}}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ paddingLeft: 10, color: '#b0a9a9', fontSize: 15 }}>Patient Name :</Text>
                            <Text style={{ paddingLeft: 5, color: '#3b3030', fontWeight: 'bold' }}>{this.props.item.patientName}</Text>
                        </View>
                        <View style={{ marginLeft: 40, flexDirection: 'row' }}>
                            <Text style={{ paddingLeft: 10, color: '#b0a9a9', fontSize: 15 }}>Status :</Text>
                            <Text style={{ paddingLeft: 5, color: this.props.item.AppointmentStatus == 'confirmed' ? 'green' : 'red', fontWeight: 'bold' }}>{this.props.item.AppointmentStatus}</Text>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => {
                                this.setModalVisible(!this.state.confModal);
                            }}
                            style={{
                                backgroundColor: '#ff7777',
                                alignSelf: 'center',
                                width: 100,
                                height: 30,
                                justifyContent: 'center',
                                borderRadius: 4,
                            }}>
                            <Text style={{
                                alignSelf: 'center',

                            }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginTop: 22 }}>
                <Modal
                    style={{
                        justifyContent: 'center',
                        backgroundColor: 'red'
                    }}
                    animationType="fade"
                    transparent={true}
                    visible={this.state.confModal}
                    onRequestClose={() => {
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
                              
                            </View>
                            <View>
                                <TouchableHighlight
                                    style={{
                                        backgroundColor: this.props.item.AppointmentStatus=='pending' ? '#40E0D0' : 'green',
                                        height: 35,
                                        width: 200,
                                        justifyContent: 'center',
                                        borderRadius: 4,
                                        marginTop: 20
                                    }}
                                    onPress={() => {
                                        if (this.props.item.AppointmentStatus=='pending') {
                                            var docuid = this.props.item.uid;
                                            console.log(docuid)
                                            var ref = firebase.database().ref();
                                            var user = firebase.auth().currentUser;
                                            var uid;
                                            if (user != null) {
                                                uid = user.uid;
                                            }
                                            ref.child('users').child('Appointments').child(docuid).child(uid).update({ 'status': 'canceled' })
                                                .then(() => {
                                                    this.setModalVisible(!this.state.confModal);
                                                    const resetAction = StackActions.reset({
                                                        index: 0,
                                                        actions: [
                                                            // NavigationActions.navigate({ routeName: 'QRCodeScanner' }),
                                                            NavigationActions.navigate({ routeName: 'PatientHome' }),
                                                        ],
                                                    });
                                                    this.props.navigation.dispatch(resetAction);
                                                    // this.setModalVisible(true);
                                                })
                                        }
                                        else{
                                            var docuid = this.props.item.uid;
                                            console.log(docuid)
                                            var ref = firebase.database().ref();
                                            var user = firebase.auth().currentUser;
                                            var uid;
                                            if (user != null) {
                                                uid = user.uid;
                                            }
                                            ref.child('users').child('Appointments').child(docuid).child(uid).remove()
                                                .then(() => {
                                                    this.setModalVisible(!this.state.confModal);
                                                    const resetAction = StackActions.reset({
                                                        index: 0,
                                                        actions: [
                                                            // NavigationActions.navigate({ routeName: 'QRCodeScanner' }),
                                                            NavigationActions.navigate({ routeName: 'PatientHome' }),
                                                        ],
                                                    });
                                                    this.props.navigation.dispatch(resetAction);
                                                    // this.setModalVisible(true);
                                                })
                                        }
                                    }}>
                                    <Text style={{
                                        alignSelf: 'center',
                                        fontWeight: 'bold',
                                        color: 'white'
                                    }}>{this.props.item.AppointmentStatus=='pending' ? 'Cancel Appointment' : 'Remove Appointment'}</Text>
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
                                            modalheight: 370,
                                        })
                                        this.setModalVisible(!this.state.confModal);
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
