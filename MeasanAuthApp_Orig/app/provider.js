import React, {useMemo, useReducer, useContext} from 'react';
// import {AsyncStorage} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

//IMPORT REDUCER, INITIAL STATE AND ACTION TYPES
import reducer, {initialState, LOGGED_IN, LOGGED_OUT} from "./reducer";

// CONFIG KEYS [Storage Keys]===================================
export const TOKEN_KEY = 'token';
export const USER_KEY = 'user';
export const VILL_KEY = 'village_id';
// export const MANDAL_ID = 'mandal_id';
export const VILLAGE = 'village';
export const keys = [TOKEN_KEY, USER_KEY,VILL_KEY,VILLAGE];

// CONTEXT ===================================
const AuthContext = React.createContext();

function AuthProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState || {});

    // Get Auth state
    const getAuthState = async () => {
        try {
            //GET TOKEN && USER
            let token = await AsyncStorage.getItem(TOKEN_KEY);
            let user = await AsyncStorage.getItem(USER_KEY);
            let village_id = await AsyncStorage.getItem(VILL_KEY);
            user = JSON.parse(user);

            if (token !== null && user!== null) await handleLogin({token, user, village_id});
            else await handleLogout();

            return {token, user};
        } catch (error) {
            throw new Error(error)
        }
    };

    // Handle Login
    const handleLogin = async (data) => {
        try{
            //STORE DATA
            // console.log('data in handle login',data)
            let {authorisation, user} = data;
            // console.log('data in handle login',authorisation, user)
            let data_ = [[USER_KEY, JSON.stringify(user)], [TOKEN_KEY, authorisation.token], [VILL_KEY, JSON.stringify(user.editing_village_id)]];
            
            await AsyncStorage.multiSet(data_);

            //AXIOS AUTHORIZATION HEADER
            axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

            console.log('data',data);

            //DISPATCH TO REDUCER
            dispatch({type: LOGGED_IN, user:data.user});
        }catch (error) {
            throw new Error(error);
        }
    };
    const handleVillageselect = async (data) => {
        try{
            //STORE DATA
            // console.log('VILLAGE data STORing',data);
            let {name, id} = data;
            let data_ = [ [VILLAGE, name], [VILL_KEY, JSON.stringify(id)]];
            // console.log('data',data);
            await AsyncStorage.multiSet(data_);
            // console.log('VILLAGE data STORED',data);

            //AXIOS AUTHORIZATION HEADER
            // axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

            //DISPATCH TO REDUCER
            // dispatch({type: LOGGED_IN, user:data.user});
        }catch (error) {
            throw new Error(error);
        }
    };

    // Handle Logout
    const handleLogout = async () => {
        try{

            //REMOVE DATA
            await AsyncStorage.multiRemove(keys);

            //AXIOS AUTHORIZATION HEADER
            delete axios.defaults.headers.common["Authorization"];

            //DISPATCH TO REDUCER
            dispatch({type: LOGGED_OUT});
        }catch (error) {
            throw new Error(error);
        }
    };

    //UPDATE USER LOCAL STORAGE DATA AND DISPATCH TO REDUCER
    const updateUser = async (user) => {
        try {
            await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
            dispatch({type: LOGGED_IN, user}); //DISPATCH TO REDUCER
        } catch (error) {
            throw new Error(error);
        }
    };

    const value = useMemo(() => {
        return {state, getAuthState, handleLogin, handleLogout, updateUser,handleVillageselect};
    }, [state]);

    return (
        <AuthContext.Provider value={value}>
        {props.children}
</AuthContext.Provider>
);
}

const useAuth = () => useContext(AuthContext);
export { AuthContext, useAuth }
export default AuthProvider;