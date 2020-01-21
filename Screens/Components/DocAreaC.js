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
import Icon from 'react-native-vector-icons/FontAwesome';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { withNavigation } from 'react-navigation';
class AppointmentItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: '',
            height: '',
            viewHeight: 60,
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
                flexDirection: "row",
                marginBottom: 4,
                marginTop: 4,
                height: this.state.viewHeight,
                marginLeft: 10,
                marginRight: 10,
                borderRadius: 8,
                borderColor: 'red',
                padding: 5,
                alignItems: 'center',
                backgroundColor: 'lightgray'//this.props.index % 2 == 0 ? '#9e8e8d' : '#ff6666'
            }}>

                <TouchableOpacity onPress={() => {
                    let area = this.props.item.area;
                    AsyncStorage.setItem('area', area, () => {
                    this.props.navigation.navigate('AreaDoctors')
                    })
                }}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 100,
                        top: 0,
                        bottom: 0,
                        justifycontent: 'center',
                        // alignContent:'center',
                        paddingTop:15,
                        backgroundColor: 'none'
                    }}>
                    <Text style={{
                        color: '#000000',
                        fontWeight: 'bold',
                        fontSize: 20,
                        marginStart: 0,
                        paddingLeft: 10,
                    }}>{this.props.item.area}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
export default withNavigation(AppointmentItem)
