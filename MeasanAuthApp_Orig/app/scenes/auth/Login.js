import React, { useState } from 'react';
import mFormData from './Login/login_form';
import validation from './Login/login_validation';
// import value_data from './House/set_values';
import {View, Text} from 'react-native';
import CTA from "../../components/CTA";
import {Header, ErrorText} from "../../components/Shared";

import * as api from "../../services/auth";
import { useAuth } from "../../provider";

import MForm from '../../formcomponents'

 function Mycomponent (props){
    const {navigation} = props;
    const [error, setError] = useState(null);
return <View>
        <ErrorText error={error}/>

        <CTA
            ctaText={"Forgot Password?"}
            onPress={() => navigation.navigate("ForgotPassword")}
            style={{marginTop: 20}}/>

        <CTA
            title={"Don't have an account?"}
            ctaText={"Register"}
            onPress={() => navigation.replace("Register")}
            style={{marginTop: 50}}/>
    </View>
}

export default function Login (props) {
    const {navigation} = props;
    const {navigate} = navigation;

    // //1 - DECLARE VARIABLES
    
    const [loading, setLoading] = useState(false);
    // const { state, updateUser } = useAuth();
    const { handleLogin } = useAuth();

    // async function onSubmit(data) {
        
    //     console.log('in onSubmit');
    //     console.log('data', JSON.stringify(data));
        
    // }

    async function onSubmit(state) {
        setLoading(true);

        try {
            let response = await api.login(state);
            console.log('response in login',response)
            await handleLogin(response);

            setLoading(false);

            //check if username is null
            let username = (response.user.username !== null);
            if (username) navigate('App');
            else navigation.replace('Username');
        } catch (error) {
            setError(error.message);
            setLoading(false)
        }
    }

    // let formProps = {title: "Submit", fields, onSubmit, loading };
    return (
        <View style={{flex: 1, paddingHorizontal: 16, backgroundColor:"#fff"}}>
        <MForm mFormData={mFormData} validation={validation} onSubmitData={onSubmit} Extracomp={Mycomponent} navigation={navigation}/>
        
                

            </View>

    );
};