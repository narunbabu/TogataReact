import React,{useState} from 'react';
import {View, Text} from 'react-native';
import Form, {TYPES} from 'react-native-basic-form';

export default function FormExampleApp(props) {
    const [loading, setLoading] = useState(false);

    const options = [
        {label:"Basic", value:1},
        {label:"Premium", value:2}
    ];
    
    //Used in EDIT MODE
    const initialData = {
        "image": "http://res.cloudinary.com/ddv9bxonm/image/upload/v1585512850/ib9c0dml4dlksi8xgvob.jpg",
        "email": "Johnsmith@yahoo.com",
        "password": "thispasswordisencrypted",
        "account_type": 1, //Basic account, see options
        "price": 20,
        "about_me": "Blah blah blah.....",
        "start_date": "2020-04-17T21:00:00.000Z",
        "end_date": "2020-04-17T21:00:00.000Z",
    };

    const fields = [
        {name: 'image', label: 'Profile Image', required: true, type: TYPES.Image},
        {name: 'email', label: 'Email Address', required: true, type: TYPES.Email},
        {name: 'username', label: 'Username', required: true, autoCapitalize: "none", autoCorrect: false},
        {name: 'password', label: 'Password', required: true, secure: true},
        {name: 'account_type', label: 'Account Type', required: true, type: TYPES.Dropdown, options: options},
        {name: 'price', label: 'ENTRANCE FEE', required: true, type:TYPES.Number},
        {name: 'about_me', label: 'About Me', required: true, multiline: true},
        [
            //group to appear side by side
            {name: 'start_date', label: 'START DATE', required: true, type: TYPES.Date},
            {name: 'end_date', label: 'END DATE', required: true, type: TYPES.Date}
        ]
    ];

    async function onSubmit(data) {
        setLoading(true);

        console.log(data);

    }
    
    async function showImagePicker() {
        try{
            //return - cancelled or error or uri
            //return {cancelled:true}
            //return {error:"error message}
            //return {uri:...}
            console.log('image picker');
        }catch(e){
            return {error:e}
        }
    }

    
        return (
            <View>
                <Text>Hello guy</Text>
                {/* <Form
                    title={"Register"} //this is the button title
                    fields={fields}
                    initialData={initialData} //used in edit mode
                    onSubmit={onSubmit}
                    loading={loading}
                    showImagePicker={showImagePicker}
                    style={{}}/> */}
            </View>
        );
    
};