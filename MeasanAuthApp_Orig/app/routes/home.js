import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

//IMPORT SCENES
import HomeScreen from "../scenes/home/Home";
import UpdateProfileScreen from "../scenes/home/UpdateProfile";
import EnterCensusScreen from "../scenes/home/EnterCensus";
import SelectVillageScreen from '../scenes/home/SelectVillage';
import AddHouseScreen from '../scenes/home/AddHouse';

import {headerStyle, headerTitleStyle} from '../theme'
import EnterHouseDetailsScreen from '../scenes/home/EnterHouseDetails';
import EnterHouseHoldScreen from '../scenes/home/EnterHouseHold';

const HomeStack = createStackNavigator(
    {
        Home: HomeScreen,
        UpdateProfile: UpdateProfileScreen,
        EnterCensus: EnterCensusScreen,
        SelectVillage: SelectVillageScreen,
        EnterHouseDetails: EnterHouseDetailsScreen,
        EnterHouseHold: EnterHouseHoldScreen,
        AddHouse: AddHouseScreen,
    },
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: () => ({headerStyle, headerTitleStyle})
    }
);

export default HomeStack;