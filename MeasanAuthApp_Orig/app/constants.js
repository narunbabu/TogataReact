
import React from 'react';

//API URL
// export const API_URL = 'https://mesannodejsapiwithverification.herokuapp.com/api';

export const API_URL = 'http://10.0.2.2:8000/api';

//API End Points
export const REGISTER = `${API_URL}/register`;
export const LOGIN = `${API_URL}/login`;
export const UPDATE_PROFILE = `${API_URL}/user`;
export const UPLOAD_IMAGE = `${API_URL}/user/upload`;
export const FORGOT_PASSWORD = `${API_URL}/auth/recover`;
export const STATES = `${API_URL}/states`;
export const DISTRICTS = `${API_URL}/districts`;
export const MANDALS = `${API_URL}/mandals`;
export const VILLAGES = `${API_URL}/villages`;
export const VILLAGE = `${API_URL}/village`;
export const CREATEVILLAGE = `${API_URL}/village/create`;
export const CREATEHOUSE = `${API_URL}/house/create`;