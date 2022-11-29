import axios from 'axios';

import * as c from '../constants';
import AsyncStorage from "@react-native-async-storage/async-storage";
export async function register(data){
    try{
        let res = await axios.post(c.REGISTER, data);

        return res.data;
    }catch (e) {
        throw handler(e)
    }
}

export async function login(data){
    try{
        console.log(data);
        
        data= {"email": "ab2@ameyem.com", "password": "arun123"};
        console.log(data);
        let res = await axios.post(c.LOGIN, data);
        console.log(res.data);
        return res.data;
    }catch (e) {
        throw handler(e);
    }
}
const labelizedata =(data)=>  
    data.map(k=>{
        let myvar={};
        myvar['label']=k.name;
    myvar['value']=k.id;
    return myvar;
    });


export async function forgotPassword(data) {
    try {
        let res = await axios.post(c.FORGOT_PASSWORD, data);

        return res.data;
    } catch (e) {
        throw handler(e);
    }
}
export async function getStates(data) {
    try {
        let res = await axios.get(c.STATES, data);
        // console.log(labelizedata(res.data.states));
        return labelizedata(res.data.states);
    } catch (e) {
        throw handler(e);
    }
}

export async function getDistricts(data) {
    try {
        let res = await axios.get(c.DISTRICTS, {'params':data});
        return labelizedata(res.data.districts);
    } catch (e) {
        throw handler(e);
    }
}
export async function getMandals(data) {
    try {
        let res = await axios.get(c.MANDALS, {'params':data});
        return labelizedata(res.data.mandals);
    } catch (e) {
        throw handler(e);
    }
}
export async function getVillages(data) {
    try {
        let res = await axios.get(c.VILLAGES, {'params':data});
        return labelizedata(res.data.villages);
    } catch (e) {
        throw handler(e);
    }
}
export async function getVillage(data) {
    // try {
        // console.log(c.VILLAGE,{'params':data});
        // let res = await axios.get(c.VILLAGE, {'params':data});
        // console.log(res);

        const token = await AsyncStorage.getItem('token')
            const config = {
                method: 'get',
                url: c.VILLAGE,
                headers: {

                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,                    
                },
                params: data,
            };
            // console.log(config);
            let res=await axios(config);
        // res.map(k=>{
        //     console.log(k,res[k])
        // });

            console.log('res.......................',res.data.village);

        return res.data.village;
    // } catch (e) {
    //     throw handler(e);
    // }
}
export async function createVillage( data){
       
        try{
            const token = await AsyncStorage.getItem('token')
            const config = {
                method: 'post',
                url: c.CREATEVILLAGE,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,                    
                },
                data: JSON.stringify(data),
            };

            let res=await axios(config);
            return res.data;
        }catch (e) {
            // throw handler(e);
            return {'error':e};
        }
}
export async function createHouse( data){
       
    try{
        const token = await AsyncStorage.getItem('token')
        const config = {
            method: 'post',
            url: c.CREATEHOUSE,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,                    
            },
            data: JSON.stringify(data),
        };

        let res=await axios(config);
        return res.data;
    }catch (e) {
        // throw handler(e);
        return {'error':e};
    }
}
export async function updateProfile(userId, data){
    try{
        const options = {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data"

            }
        };

        const form_data = new FormData();
        for ( let key in data )
            form_data.append(key, data[key]);

        let res = await axios.put(`${c.UPDATE_PROFILE}/${userId}`, form_data, options);
        return res.data;
    }catch (e) {
        throw handler(e);
    }
}

export function handler(err) {
    let error = err;

    if (err.response && err.response.data.hasOwnProperty("message"))
        error = err.response.data;
    else if (!err.hasOwnProperty("message")) error = err.toJSON();

    return new Error(error.message);
}