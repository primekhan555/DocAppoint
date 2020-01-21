import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    AsyncStorage,
    StatusBar,
    ImageBackground,
    Dimensions
} from 'react-native';


export default class DoctorOptions extends Component {
    static navigationOptions = {
        title: 'Doctor Options',
        headerStyle: {
            backgroundColor: '#CBBAF1'
        }
    }
    componentDidMount() { }
    render() {
        return (
            <ImageBackground
                source={require('./images/docOptions.jpg')}
                imageStyle={{ opacity: 0.4 }}
                style={styles.body}
            >
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 40 }}>
                        Welcome
                    </Text>
                    <Text>
                        Please Select Your Desired Option
                    </Text>
                </View>
                <View style={{ flex: 2, justifyContent: 'center',marginTop:150, alignItems: 'center' }}>
                    <StatusBar backgroundColor='#CBBAF1' barStyle='dark-content' />

                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('DoctorSignIn')
                        }}
                        style={{
                            backgroundColor: '#CBBAF1',
                            height: 40,
                            width: 180,
                            justifyContent: 'center',
                            borderRadius: 5
                        }}>
                        <Text style={{
                            color: 'white',
                            alignSelf: 'center',
                            fontWeight: 'bold',
                            fontSize:15,
                        }}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('DoctorRegister')
                        }}
                        style={{
                            // backgroundColor:'#ff6666', 
                            borderColor: '#CBBAF1',
                            borderWidth: 3,
                            height: 40,
                            marginTop: 20,
                            width: 180,
                            justifyContent: 'center',
                            borderRadius: 5
                        }}>
                        <Text style={{
                            color: '#CBBAF1',
                            alignSelf: 'center',
                            fontWeight: 'bold',
                            fontSize:15,
                        }}>Create new Account</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    body: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 100,
    }
})