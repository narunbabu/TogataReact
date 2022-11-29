import React, { useState, useEffect } from 'react';

import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import * as api from "../../services/auth";
import { useAuth } from "../../provider";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Form from 'react-native-basic-form';
import {ErrorText} from "../../components/Shared";
import Dropdown from './DropDown';
// import { Dropdown } from 'react-native-material-dropdown';

export default function SelectVillage (props) {
    const {navigation} = props;
    const {navigate} = props.navigation;
    

    //1 - DECLARE VARIABLES
    const [error, setError] = useState(null);
    const [states, setStates] = useState(null);
    const [districts, setDistricts] = useState(null);
    const [mandals, setMandals] = useState(null);
    const [villages, SetVillages] = useState(null);
    const [selectedVillage, setSelectedVillage] = useState(null);
    const [newVillage, setNewVillage] = useState(null);
    const [mandalid, setMandalid] = useState(null);
    const [villageName, setVillageName] = useState(null);
    const [loading, setLoading] = useState(false);
    const { state, handleVillageselect } = useAuth();

    const fields = [
        // {name: 'firstName', label: 'First Name', required: true, value:state.user.surname},
        // {name: 'lastName', label: 'Last Name', required: true, value:state.user.name},
        // {name: 'username', label: 'Username', required: true, value:state.user.email}
    ];

    useEffect(() => {
        const load = async () => {
          setLoading(true);
          try {
            let mstates = await api.getStates({});
            setStates(mstates);
            setLoading(false);  
          } catch (error) {
              setError(error.message);
              setLoading(false)
          }
        }
        load();
      }, []);

      async function onStateSelect(data) {
        setLoading(true);
        try {
            let mdistricts = await api.getDistricts({'state_id':data.value});
            console.log(mdistricts);
            setDistricts(mdistricts)
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false)
        }
    }
    async function onDistrictSelect(data) {
        setLoading(true);
        try {
            let mmandals = await api.getMandals({'district_id':data.value});
            setMandals(mmandals)
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false)
        }
    }
    async function onMandalSelect(data) {
        setLoading(true);
        try {
            setMandalid(data.value);
            let vvillages = await api.getVillages({'mandal_id':data.value});
            
            SetVillages([...vvillages,{'label':'New','value':999}])
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false)
        }
    }
    async function onVillageSelect(data) {
        if( data.label=='New'){
            console.log('selected new');
            setNewVillage(data);
        }
        else{
            console.log(data);
            handleVillageselect({'name':data.label,'id':data.value});
            navigation.goBack();
            // selectVillage(data);

        }

            

    }


    async function onnewSubmit() {
        
        // let token = await AsyncStorage.getItem('token')
        // console.log('villageName',villageName, token);
        setLoading(true);
        try {
            var data={'name':villageName,'mandal_id':mandalid};
            let response = 
            await api.createVillage(data);
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
        <View style={{flex:1, paddingHorizontal: 16}}>
            <Text>In Select Village</Text>
            {!! states && <Dropdown label="Select Item" data={states} onSelect={onStateSelect} />}
            {!! districts && <Dropdown label="Select Item" data={districts} onSelect={onDistrictSelect} />}
            {!! mandals && <Dropdown label="Select Item" data={mandals} onSelect={onMandalSelect} />}
            {!! villages && <Dropdown label="Select Item" data={villages} onSelect={onVillageSelect} />}
            {!!newVillage && (
                    // <Text>
                    // Selected: label = {selectedVillage.label} and value = {selectedVillage.value}
                    // </Text>
                    <View>
                    <TextInput
                    style={styles.input}
                    onChangeText={(text)=>setVillageName(text)}

                  />
                  <Button title={"Create Village"} onPress={() => onnewSubmit()}/>
                  </View>
                )}
            

            {/* <View style={{flex:1}}>
                <ErrorText error={error}/>
                <Form {...formProps}/>
            </View> */}
        </View>
    );

    
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