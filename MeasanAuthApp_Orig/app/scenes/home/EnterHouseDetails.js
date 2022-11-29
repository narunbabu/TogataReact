import React, { useState } from 'react';
import mFormData from './House/house_form';
import validation from './House/house_validation';
import value_data from './House/set_values';
// import {View} from 'react-native';

// import * as api from "../../services/auth";
// import { useAuth } from "../../provider";

// import Form from 'react-native-basic-form';
// import {ErrorText} from "../../components/Shared";
import MForm from '../../formcomponents'

export default function EnterHouseDetails (props) {
    // const {navigation} = props;

    // //1 - DECLARE VARIABLES
    // const [error, setError] = useState(null);
    // const [loading, setLoading] = useState(false);
    // const { state, updateUser } = useAuth();
    console.log('in EnterHouseDetails');
    async function onSubmit(data) {
        
        console.log('in onSubmit');
        console.log('data', JSON.stringify(data));
        // setLoading(true);

        // try {
        //     let response = await api.updateProfile(state.user._id, data);
        //     updateUser(response.user);

        //     setLoading(false);

        //     navigation.goBack();
        // } catch (error) {
        //     setError(error.message);
        //     setLoading(false)
        // }
    }

    // let formProps = {title: "Submit", fields, onSubmit, loading };
    return (
        <MForm mFormData={mFormData} validation={validation} onSubmitData={onSubmit}/>
        // <View style={{flex:1, paddingHorizontal: 16}}>
        //     <View style={{flex:1}}>
        //         <ErrorText error={error}/>
        //         <Form {...formProps}/>
        //     </View>
        // </View>
    );
};