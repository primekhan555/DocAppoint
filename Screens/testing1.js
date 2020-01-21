

import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native'
export default class testing1 extends React.Component{
    Constractor(props){
        super(props)
        this.state={
        name:'',
        password:''
        }
    }

    render(){
        return(
            <View>
    <Text>{this.state.name}</Text>
                <TextInput 
                onChangeText={(value)=>{
                  this.setState({
                      name:value

                  })  
                }}
                />
                <TextInput
                onChangeText={(value)=>{
                    this.setState({
                        password:value
                    })
                }
                } />
                <TouchableOpacity
                onPress={()=>{
                    let name=this.setState.name
                    let pass=this.setState.password
                    console.log('logged in')
                }
                } />
            </View>

        )
    }

}
