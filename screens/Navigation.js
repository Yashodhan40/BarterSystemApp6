import * as React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import Drawer from '../screens/Drawer';
import appTab from '../screens/appTab';
import settings from '../screens/Settings';
import MyBarter from '../screens/MyBarters';

const navi = createDrawerNavigator({
        Home:{
            screen:appTab
        },
        Settings:{
            screen:settings
        },
        MyBarters:{
            screen:MyBarter
        }
    },
        {
            contentComponent:Drawer
        },
        {
            initialRouteName:'Home'
})

export default navi;