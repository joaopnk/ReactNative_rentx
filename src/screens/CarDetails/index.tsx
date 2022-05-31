import React from 'react';
import { NavigationProp, ParamListBase, useNavigation, useRoute } from '@react-navigation/native';

import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

// Tipagem
import  { CarDTO } from '../../dtos/CarDTO';



// Componentes
import { BackButton }   from '../../components/BackButton';
import { ImageSlider }  from '../../components/ImageSlider';
import { Accessory }    from '../../components/Accessory';
import { Button }       from '../../components/Button';


// SVGS (FUNÇÃO QUE VALIDA O TIPO DO ICON)
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';



import {
  Container,
  Header,
  Details,
  CarImages,
  Description,
  Brand,
  Name,
  Period,
  Rent,
  Price,
  About,
  Accessories,
  Footer
} from './styles';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { StatusBar, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';


// Tipando parametros que vem de uma tela para outra
interface Params {
  car: CarDTO;
}

export function CarDetails(){
  const theme = useTheme();


  const navigation  = useNavigation<NavigationProp<ParamListBase>>();
  
  // #Recuperando os parametros que estão sendo passados para essa tela
  const route       = useRoute();
  const { car } = route.params as Params;

  const scrollY = useSharedValue(0);
  const scrollHandle = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle( () => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      )
    }
  })
  
  const sliderCarsStyleAnimation = useAnimatedStyle( () => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 150], // Para o carro sumir já quando atingir 150
        [1, 0],
        Extrapolate.CLAMP //Garantir que nossas regras sejam respeitadas!
      )
    }
  })

  function handleConfirmRental() {
    navigation.navigate('Schedulling', { car });
  }

  function handleBack(){
    navigation.goBack();
  }

  

  return (
    <Container>
      <StatusBar 
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Animated.View
        style={[
            headerStyleAnimation, 
            styles.header,
            {backgroundColor: theme.colors.background_secondary} 
          ]}
      >
        <Header>
          <BackButton onPress={handleBack} />
        </Header>

        <CarImages>
          <Animated.View style={sliderCarsStyleAnimation}>
              <ImageSlider 
                imagesUrl={car.photos} 
              />
          </Animated.View>
        </CarImages>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{ 
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 160,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandle}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

         <Accessories>
           {  
             car.accessories.map(accessory => (
               <Accessory 
                key={accessory.type}
                name={accessory.name} 
                icon={getAccessoryIcon(accessory.type)}
                />
             ))
           }
           
         </Accessories>

        <About>{car.about}</About>
      </Animated.ScrollView>

      <Footer>
        <Button title="Escolher período do aluguel" onPress={handleConfirmRental}/>
      </Footer>

    </Container>
  );
}

const styles = StyleSheet.create({
  header:{
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1
  },
})