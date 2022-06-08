import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Schedulling } from '../screens/Schedulling';
import { SchedullingDetails } from '../screens/SchedullingDetails';
import { SchedullingComplete } from '../screens/SchedullingComplete';
import { MyCars } from '../screens/MyCars';
import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/SignIn';


const { Navigator, Screen } = createStackNavigator();

export function StackRoutes(){
    return(
        <Navigator screenOptions={{ headerShown: false }} initialRouteName="SignIn">
        {/* <Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash"> */}
            <Screen 
                name="SignIn"
                component={SignIn}
            />
            {/* # Desativando a Splash para ganhar tempo trabalhando com signIn 
            <Screen 
                name="Splash"
                component={Splash}
            /> */}
            <Screen 
                name="Home"
                component={Home}
                options={{
                    // Desabilitando opção do usuario (no caso do IOS) segurar e arrastar pro lado e voltar para tela de SPLASH
                    gestureEnabled: false
                }}
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