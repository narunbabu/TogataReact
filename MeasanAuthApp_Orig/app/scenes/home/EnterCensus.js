import React, { useState, useEffect } from 'react';
// import {View, Text} from 'react-native';
import {StyleSheet,Text, View, Button, ActivityIndicator, Alert} from 'react-native';

import * as api from "../../services/auth";
import { useAuth, VILLAGE, VILL_KEY } from "../../provider";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Form from 'react-native-basic-form';
import {ErrorText} from "../../components/Shared";

export default function EnterCensus (props) {
    const {navigation} = props;
    const {navigate} = props.navigation;

    //1 - DECLARE VARIABLES
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { state, updateUser } = useAuth();
    const [village,setVillage]= useState(null);


    // const fields = [
    //     {name: 'firstName', label: 'First Name', required: true, value:state.user.surname},
    //     {name: 'lastName', label: 'Last Name', required: true, value:state.user.name},
    //     {name: 'username', label: 'Username', required: true, value:state.user.email}
    // ];

    useEffect(() => {
         let load=async () => {
          setLoading(true);
          try {
            let mvillage_id = await AsyncStorage.getItem(VILL_KEY);

            // let mvillage = await AsyncStorage.getItem(VILLAGE); 
            // // console.log('mvillage_id,mvillage',mvillage_id,mvillage,!mvillage);
            // if (!mvillage) {
                // console.log('in eee',mvillage_id,mvillage,!mvillage);
                let mvillage = await api.getVillage({'id':mvillage_id});
                console.log('in e',mvillage);
                AsyncStorage.setItem(VILLAGE, mvillage.name);
            // }
            // console.log('mvillage_id,mvillage he',mvillage_id,mvillage);
            

            setVillage(mvillage.name);
            // console.log(village);
            setLoading(false);  
          } 
          catch (error) {
              setError(error.message);
              setLoading(false)
          }
        }
        load();
      }, []);

    async function getVillage() {
        
        console.log(village);
        // setLoading(true);
        
        // try {
        //     console.log('in get village');
        // let village_id = await AsyncStorage.getItem(VILL_KEY);

        //     let mvillage = await AsyncStorage.getItem(VILLAGE); 
        //     console.log(village_id,mvillage);
            

        //     setVillage(mvillage);
        //     //  village = await api.getVillage({'id':village_id});
        //     // setVillage(village)
        //     setLoading(false);
        // } catch (error) {
        //     setError(error.message);
        //     setLoading(false)
        // }
    }
    async function onSubmit(data) {
        setLoading(true);

        try {
            // let response = await api.updateProfile(state.user._id, data);
            console.log(state.user);
            // updateUser(response.user);

            // setLoading(false);

            // navigation.goBack();
        } catch (error) {
            setError(error.message);
            setLoading(false)
        }
    }

    // let formProps = {title: "Submit", fields, onSubmit, loading };
    return (
        <View style={{flex:1, paddingHorizontal: 16}}>
            <View style={{flex:1}}>
                
                {!!village && (
                    <View style = {{alignItems: 'center'}}>
                <Text >Selected Village:</Text>
                <Text style={styles.text}>{` ${village} `}</Text>
                </View>
                ) }
                {!! village && (
                <Button title={"Change Village"} onPress={() => navigate('SelectVillage')}/>
                )}
                {!! !village && (
                    <Button title={"Select Village"} onPress={() => navigate('SelectVillage')}/>
                    )}
                <Text></Text>
                <Button title={"Add House"} onPress={() => navigate('EnterHouseDetails')}/>
                 
                {/* <ErrorText error={error}/>
                <Form {...formProps}/> */}
            </View>
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
      text:{
        fontSize:40,

      }
  });