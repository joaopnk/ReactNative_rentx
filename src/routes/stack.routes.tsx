import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Schedulling } from '../screens/Schedulling';
import { SchedullingDetails } from '../screens/SchedullingDetails';
import { SchedullingComplete } from '../screens/SchedullingComplete';
import { MyCars } from '../screens/MyCars';

const { Navigator, Screen } = createStackNavigator();

export function StackRoutes(){
    return(
        <Navigator screenOptions={{ headerShown: false }} >
            <Screen 
                name="Home"
                component={Home}
            />
            <Screen 
                name="CarDetails"
                component={CarDetails}
            />
            <Screen 
                name="Schedulling"
                component={Schedulling}
            />
            <Screen 
                name="SchedullingDetails"
                component={SchedullingDetails}
            />
            <Screen 
                name="SchedullingComplete"
                component={SchedullingComplete}
            />
            <Screen 
                name="MyCars"
                component={MyCars}
            />
        </Navigator>
    )
}