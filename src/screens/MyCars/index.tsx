import React, { useState, useEffect } from 'react';
import { StatusBar, FlatList } from 'react-native';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { api } from '../../services/api';
import { Car } from '../../components/Car';
import { CarDTO } from '../../dtos/CarDTO';
import { BackButton } from '../../components/BackButton';


import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,


} from './styles';

interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
}

export function MyCars(){

  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const theme = useTheme();

  function handleBack(){
    navigation.goBack();
  }

  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect( () => {
    async function fetchCars(){
      try{
        // passando usuario fixo
        const response = await api.get('/schedules_byuser?user_id=1');
        setCars(response.data);
      }
      catch(err){
        console.log(`Houve um erro ao executar a função fetchCars()\n${err}`);
      }
      finally{
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

  return (
    <Container>
        <Header>
            <StatusBar 
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            />
            <BackButton 
                onPress={handleBack} 
                color={theme.colors.shape}
            />
            <Title>
                Escolha uma{'\n'}
                data de início e{'\n'}
                fim do aluguel
            </Title>
            <SubTitle>
              Conforto, segurança e praticidade.
            </SubTitle>
        </Header>

        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>05</AppointmentsQuantity>
          </Appointments>
          <FlatList 
            data={cars}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <Car data={item.car} />
            )}
          />
        </Content>
    </Container>
  );
}