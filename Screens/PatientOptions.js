import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    ImageBackground,
    Dimensions,
} from 'react-native';

export default class PatientOptions extends Component {
    static navigationOptions = {
        title: 'Patient Options',
        headerStyle: {
            backgroundColor: '#40E0D0'
        }
    }
    render() {
        return (
            <ImageBackground
                source={require('./images/patOp.jpg')}
                imageStyle={{opacity:0.4}}
                style={styles.body}
            >
                <View style={{alignItems:'center'}}>
                    <Text style={{fontWeight:'bold',fontSize:40}}>
                        Welcome
                    </Text>
                    <Text>
                        Please Select Your Desired Option
                    </Text>
                </View>
                <View style={{ flex: 2, justifyContent: 'center',marginTop:150, alignItems: 'center' }}>
                    <StatusBar backgroundColor='#40E0D0' barStyle='dark-content' />

                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('PatientSignIn')
                        }}
                        style={{
                            backgroundColor: '#40E0D0',
                            height: 40,
                            width: 180,
                            justifyContent: 'center',
                            borderRadius: 5
                        }}>
                        <Text style={{
                            color: 'white',
                            alignSelf: 'center',
                            fontWeight: 'bold'
                        }}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('PatientRegister')
                        }}
                        style={{
                            // backgroundColor: '#40E0D0',
                            borderColor:'#40E0D0',
                            borderWidth:3,
                            height: 40,
                            marginTop: 20,
                            width: 180,
                            justifyContent: 'center',
                            borderRadius: 5
                        }}>
                        <Text style={{
                            color: '#40E0D0',
                            alignSelf: 'center',
                            fontWeight: 'bold'
                        }}>Create new Account</Text>
                    </TouchableOpacity>

                </View>
            </ImageBackground>
        )
    }
}
const styles=StyleSheet.create({
    body:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height-70,
    }
})