import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    AsyncStorage,
    StyleSheet,
    ActivityIndicator,
    Dimensions,
    ImageBackground,
    StatusBar,
    ScrollView,
    FlatList,
} from 'react-native';
import firebase from 'react-native-firebase';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppointmentItem from './Components/AppointmentItem';
export default class PatientHome extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        let headerStyle = ({
            backgroundColor: '#40E0D0',
        });
        let title = 'Home';
        let headerLeft = null;
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
        return { headerRight, headerLeft, title, headerStyle };
    }
    state = {
        docName: '',
        specilization: '',
        arr: [],
        loading: true,
        datasourse: [],
        buttonState: true,
        buttonColor: "green"
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
        this.props.navigation.setParams({ signOut: this._logout.bind(this) })
        var user = firebase.auth().currentUser;
        var uid;
        if (user != null) {
            uid = user.uid;
        }
        var newarr = [];
        var ref = firebase.database().ref();
        ref.child('users').child('Appointments').on('value', (datasnapshot) => {
            if ((datasnapshot.exists())) {
                var value = datasnapshot.val();
                var key = Object.keys(value);
                key.forEach(element => {
                    var obj = {};
                    ref.child('users').child('Appointments').child(element).on('value', (datasnapshot1) => {
                        if ((datasnapshot1.child(uid).exists())) {
                            var datasnap = datasnapshot1.child(uid);
                            console.log(datasnap.val().docName)
                            obj["patientName"] = datasnap.val().patientName;
                            obj["docName"] = datasnap.val().docName;
                            obj["AppointmentStatus"] = datasnap.val().status;
                            obj["AppointmentDate"] = datasnap.val().date;
                            obj["uid"] = element
                            newarr.push(obj);
                            this.setState({
                                arr: newarr,
                                isLoading: false,
                            })
                            console.log(this.state.arr)
                        }
                    })
                });
            }
        })
    }

    render() {
        if (this.state.arr.length==0) {
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
                        title="New Appointment"
                        onPress={() => this.props.navigation.navigate('PatientHome1')}>
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
        if (this.state.isLoading) {
            return (
                <View>
                <ActivityIndicator />
                </View>
            )
        }
        return (
            <ImageBackground
                imageStyle={{ opacity: 0.4 }}
                style={styles.body}
                source={require('./images/docOptions2.png')}>
                <View>
                    <StatusBar backgroundColor='#40E0D0' barStyle='dark-content' />
                    <FlatList
                        data={this.state.arr}
                        renderItem={({ item, index }) => {
                            return (
                                <AppointmentItem item={item} index={index} />
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
                        title="New Appointment"
                        onPress={() => this.props.navigation.navigate('PatientHome1')}>
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
}
const styles = StyleSheet.create({
    body: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 100,
    },
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
    actionButtonIcon: {
        fontSize: 30,
        height: 30,
        color: 'black',
    },
})