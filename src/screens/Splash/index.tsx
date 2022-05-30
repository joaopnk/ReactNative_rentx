import React from 'react';
import { Button, StyleSheet, Dimensions } from 'react-native';

import Animated, { 
  useSharedValue, 
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const WIDTH = Dimensions.get('window').width;

import {
  Container
} from './styles';

export function Splash(){

  const animation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() =>{
    return {
      transform: [
        { 
          translateX: withTiming(animation.value, {
            // Tempo da animação 
            duration: 500,
            // Tipo de animação, ex: linear, etc (EFEITOS)
            easing: Easing.ease

          })
        }
      ]
    }
  })

  function handleAnimationPosition(){
    animation.value = Math.random() * (WIDTH - 100);
  }

  return (
    <Container>
      <Animated.View style={[style.box, animatedStyles]}/>
      <Button title="Mover" onPress={handleAnimationPosition}/>
    </Container>
  );
}

const style = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red'
  }
})