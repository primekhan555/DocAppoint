import React from 'react';
import {
    View,
    Text,
    FlatList,
    AsyncStorage,
    ActivityIndicator,
    Picker
} from 'react-native';
import firebase from 'react-native-firebase';
import DoctorC from './Components/DoctorC';

export default class AreaDoctors extends React.Component {
    static navigationOptions={
        headerTitle:false,
        headerStyle:{
            backgroundColor:'#40E0D0'
        }
    }
    constructor(props){
        super(props)
        this.state={
            datasource:[],
            isLoading:true,
        }
    }
  
    componentDidMount() {
        var newarr = [];
        AsyncStorage.getItem('area', (err, result) => {
            if (result != null) {
                var ref = firebase.database().ref();
                ref.child('DoctorArea').child(result).on('value', (datasnapshot) => {
                    if (datasnapshot.exists()) {
                        let values = datasnapshot.val()
                        let key = Object.keys(values);
                        key.forEach(element => {
                            var obj = {};
                            ref.child('users').child('Doctors').child(element).on('value',(datasnapshot1)=> {
                                if ((datasnapshot1.exists())) {
                                    obj["name"] = datasnapshot1.val().name;
                                    obj["specialization"] = datasnapshot1.val().specilization;
                                    obj["contact"] = datasnapshot1.val().contact;
                                    obj["email"] = datasnapshot1.val().email;
                                    obj["fee"] = datasnapshot1.val().fee;
                                    obj["clinicalAddress"] = datasnapshot1.val().clinicalAddress;
                                    obj["uid"] = element
                                    newarr.push(obj);
                                    
                                    this.setState({
                                        datasource:newarr,
                                        isLoading:false
                                    })
                                }
                            })
                        });
                    }
                })
            }
        })
    }
     hello(value){
        console.log(value)
        var newarr = [];
        AsyncStorage.getItem('area', (err, result) => {
            if (result != null) {
                var ref = firebase.database().ref();
                ref.child('DoctorArea').child(result).on('value', (datasnapshot) => {
                    if (datasnapshot.exists()) {
                        let values = datasnapshot.val()
                        let key = Object.keys(values);
                        this.setState({
                            datasource:[]
                        })
                        key.forEach(element => {
                            var obj = {};
                            ref.child('users').child('Doctors').child(element).on('value',(datasnapshot1)=> {
                                if ((datasnapshot1.exists())) {
                                    
                                    if (datasnapshot1.val().specilization==value) {
                                        obj["name"] = datasnapshot1.val().name;
                                        obj["specialization"] = datasnapshot1.val().specilization;
                                        obj["contact"] = datasnapshot1.val().contact;
                                        obj["email"] = datasnapshot1.val().email;
                                        obj["fee"] = datasnapshot1.val().fee;
                                        obj["clinicalAddress"] = datasnapshot1.val().clinicalAddress;
                                        obj["uid"] = element
                                        console.log(obj)
                                        newarr.push(obj);
                                        console.log(newarr)
                                        this.setState({
                                            datasource:newarr,
                                            isLoading:false
                                        })
                                    }
                                }
                            })
                        });
                    }
                })
            }
        })
    }
    render() {
        if (this.state.isLoading) {
            <ActivityIndicator />
        }
        if (this.state.datasource.length==null) {
            return(
                <View>
                    <Text>
                        No Doctor Found
                    </Text>
                </View>
            )
        }
        return (
            <View>
                 <Picker
                    selectedValue={this.state.specilization}
                    style={{ fontWeight: 'bold' }}
                    onValueChange={(itemValue, itemIndex) =>{
                        this.hello(itemValue)
                        this.setState({ specilization: itemValue })
                    }}>
                    <Picker.Item label="Select Specialization" value="Select" />
                    <Picker.Item label="Heart Specialist" value="HeartSpecialist" />
                    <Picker.Item label="Eye Specialist" value="EyeSpecialist" />
                    <Picker.Item label="Neurologist" value="Neurologist" />
                    <Picker.Item label="Dentist" value="Dentist" />
                    <Picker.Item label="Gastrologist" value="Gastrologist" />
                    <Picker.Item label="Orthopedic" value="Orthopedic" />
                    <Picker.Item label="Urologist" value="Urologist" />
                    <Picker.Item label="Pulmonologist" value="Pulmonologist" />
                    </Picker>
                <FlatList
                data={this.state.datasource}
                renderItem={({item,index})=>{
                    return(
                        <DoctorC item={item} index={index} navigation={this.props.navigation} />
                    )
                }}
                keyExtractor={(item,index)=>index.toString()}
                 />
            </View>
        )
    }
}