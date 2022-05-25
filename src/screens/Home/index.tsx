import React, { useEffect, useState } from 'react';
import { ParamListBase, NavigationProp, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';

import  { api }  from '../../services/api';

// Tipagem dos CARROS
import  { CarDTO } from '../../dtos/CarDTO';

import { Car } from '../../components/Car';
import { Load } from '../../components/Load';

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

  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  
  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car });
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
            <TotalCars>
              Total de 12 carros
            </TotalCars>
          </HeaderContent>
        </Header>
        { loading ? <Load /> : 
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
        

    </Container>
  );
}