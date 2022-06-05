import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { ParamListBase, NavigationProp, useNavigation } from '@react-navigation/native';
import { StatusBar, StyleSheet, BackHandler } from 'react-native';

import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';

import { Ionicons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring
} from 'react-native-reanimated';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);


import Logo from '../../assets/logo.svg';

import  { api }  from '../../services/api';

// Tipagem dos CARROS
import  { CarDTO } from '../../dtos/CarDTO';

import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList
} from './styles';

export function Home(){

  const [cars, setCars]       = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ]
    }
  })

  // Responsável por receber
  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any){  // Quando o usuario pressiona o elemento e começa a arrastar pela tela
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any){ // Enquanto estiver arrastando
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd(){    // Quando o usuario terminou (soltou)
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    }
  });

  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const theme = useTheme();
  
  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car });
  }

  function handleOpenMyCars() {
    navigation.navigate('MyCars');
  }

  useEffect(() => {
    async function fetchCar(){
      try{
        const response = await api.get('/cars');
        setCars(response.data);
      }
      catch(err){
        console.log(`[ERROR | fetchCar()]: ${err}`);
      }
      finally{
        setLoading(false);
      }
    }

    fetchCar();
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    })
  }, []);

  return (
    <Container>
        <StatusBar 
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />

        <Header>
          <HeaderContent>
            <Logo 
              width={RFValue(108)}
              height={RFValue(12)}
            />
            {
              //Quando o load for falso, ai sim mostra o total de carros!
              !loading &&
              <TotalCars>
                Total de {cars.length} carros
              </TotalCars>
            }
          </HeaderContent>
        </Header>
        { loading ? <LoadAnimation /> : 
          <CarList
            data={cars}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => 
              <Car 
                data={item}
                onPress={() => handleCarDetails(item)} 
              />
            }
          />
        }
        
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View 
            style={[
              myCarsButtonStyle,
              {
                position: 'absolute',
                bottom: 13,
                right: 22
              }
            ]}
          >
            <ButtonAnimated 
              onPress={handleOpenMyCars}
              style={[styles.button, {backgroundColor: theme.colors.main}]}
            >
              <Ionicons 
                name="ios-car-sport" 
                size={32} 
                color={theme.colors.shape}
              />
            </ButtonAnimated>
          </Animated.View>
        </PanGestureHandler>
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent:'center',
    alignItems: 'center',
  }
})