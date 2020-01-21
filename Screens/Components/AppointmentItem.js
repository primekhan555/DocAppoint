import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    AsyncStorage,
    Modal,
    TouchableHighlight,
    Alert
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
        }
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
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
                    {/* <Icon
                        style={{
                            marginTop: 2
                        }}
                        name='times-circle'
                        size={19}
                        color='red'
                        onPress={() => {
                            // this.props.navigation.navigate('UN_VerifiedDetail', {
                            //     diseaseId: this.props.item.diseaseId,
                            // })
                            var diseaseId = this.props.item.diseaseId;
                            AsyncStorage.setItem('diseaseId', JSON.stringify(diseaseId), () => {
                                this.props.navigation.navigate('UN_VerifiedDetail')
                            })
                        }}
                    /> */}
                    <Text style={{
                        color: '#000000',
                        fontWeight: 'bold',
                        fontSize: 17,
                        textAlign: 'center',
                        textDecorationLine: "underline",
                        alignSelf: 'center',
                        marginStart: 0,
                    }}>Appointment</Text>
                    {/* <Icon
                        style={{
                            marginLeft: 70,
                            marginTop: 10
                        }}
                        name='plus'
                        size={18}
                        color='gray'
                        onPress={() => {
                            this.props.navigation.navigate('UN_VerifiedDetail')
                        }}
                    /> */}

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
                        }}
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            // Alert.alert('Modal has been closed.');
                            this.setModalVisible(!this.state.modalVisible);
                        }}>
                        <View style={{
                            marginTop: '50%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'white',
                            height: 400,
                            width: 300,
                            alignSelf: 'center',
                            borderRadius: 10
                        }}>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'red',
                            }}>
                                <Text>Hello World!</Text>

                                <TouchableHighlight
                                    onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                    }}>
                                    <Text>Hide Modal</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>

                    {/* <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>Show Modal</Text>
        </TouchableHighlight> */}
                </View>
            </View>
        );
    }
}
export default withNavigation(AppointmentItem)
