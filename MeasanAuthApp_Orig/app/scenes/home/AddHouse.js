import React, { useState, useEffect } from 'react';

import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import * as api from "../../services/auth";
import { useAuth } from "../../provider";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import Form from 'react-native-basic-form';
import Form from 'react-native-form';
import {ErrorText} from "../../components/Shared";
import Dropdown from './DropDown';

// import { Dropdown } from 'react-native-material-dropdown';

export default function AddHouse (props) {
    const {navigation} = props;
    const {navigate} = props.navigation;
    

    //1 - DECLARE VARIABLES
    const [error, setError] = useState(null);

    const { state, handleVillageselect } = useAuth();

    const fields = [
        {name: 'wardno', label: 'Ward Number', required: true},
        {name: 'buildingno', label: 'Building Number', required: true},
        {name: 'houseno', label: 'House Number', required: true},
        {name: 'email', label: 'Email Address', required: true},
        {name: 'mobile', label: 'Mobile No.', required: true},
        {name: 'password', label: 'Password', required: true, secure:true}
    ];

    // useEffect(() => {
    //     const load = async () => {
    //       setLoading(true);
    //       try {
    //         let mstates = await api.getStates({});
    //         setStates(mstates);
    //         setLoading(false);  
    //       } catch (error) {
    //           setError(error.message);
    //           setLoading(false)
    //       }
    //     }
    //     load();
    //   }, []);

     

    async function onnewSubmit() {
        
        // let token = await AsyncStorage.getItem('token')
        // console.log('villageName',villageName, token);
        setLoading(true);
        try {
            var data={'name':villageName,'mandal_id':mandalid};
            let response = 
            await api.createHouse(data);
            console.log('response in ',response)
            if (response.error) {
                Alert.alert(
                    'Error....',
                    response.error,
                    [{text: 'OK', onPress: () => {}}],
                    {cancelable: false},
                );
            }else{
                Alert.alert(
                    'Entry Successful',
                    `Village: ${response.name} stored successfully`,
                    [{text: 'OK', onPress: () => navigation.goBack()}],
                    {cancelable: false},
                );
                handleVillageselect(response);
            }
            // updateUser(response.user);
            setLoading(false);

            // navigation.goBack();
        } catch (error) {
            setError(error.message);
            setLoading(false)
        }
    }
    function onChangeText(text){
        console.log(text);
    }
    

    // let formProps = {title: "Get States", fields, onSubmit, loading };
    // const [selectedState, setSelectedState] = useState(undefined);

    return (
        <Form >
  <View>
    <Text>Name</Text>
      <TextInput style= {styles.input} type="TextInput" name="myTextInput" /> 
    
  </View>
  </Form>);
    

    
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
  });