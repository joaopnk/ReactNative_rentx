import React, { useEffect } from 'react';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

import Animated, { 
  useSharedValue, 
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS
} from 'react-native-reanimated';


import {
  Container
} from './styles';

export function Splash(){

  const splashAnimation = useSharedValue(0);

  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const brandStyle = useAnimatedStyle( () => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 50], [1, 0]),
      transform: [
        {
          translateX: interpolate(splashAnimation.value,
            [0, 50],
            [0, -50],
            Extrapolate.CLAMP
          )
        }
      ],
    }
  });
  const logoStyle = useAnimatedStyle( () => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 25, 50], [0, .3, 1]),
      transform: [
        {
          translateX: interpolate(splashAnimation.value, 
            [0, 50],
            [-50, 0],
            Extrapolate.CLAMP
          )
        }
      ]
    }
  });


  // Função que vai levar o usuario para pagina de home após a animação acabar!
  function startApp(){
    navigation.navigate('Home');
  }

  useEffect(() => {
    // Colocando para aparecer após 1s
    splashAnimation.value = withTiming(
      50, 
      { duration: 1000},
      () => {
        // Redirecionando para Home!
        'worklet'
        runOnJS(startApp)();
        
      }
    )
  }, []);
  return (
    <Container> 
      <Animated.View style={[brandStyle, {position: 'absolute'}]}>
        <BrandSvg width={80} height={50} />
      </Animated.View>
      <Animated.View style={[logoStyle, {position: 'absolute'}]}>
        <LogoSvg width={180} height={20} />
      </Animated.View>
    </Container>
  );
}

