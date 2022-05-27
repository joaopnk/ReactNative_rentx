import React, { useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import { format } from 'date-fns';
import { NavigationProp, ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { 
    Calendar,
    DayProps,
    generateInterval,
    MarkedDatesProps
} from '../../components/Calendar';


import ArrowSvg from '../../assets/arrow.svg';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { CarDTO } from '../../dtos/CarDTO';

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  DateValueContainer,
  Content,
  Footer,

} from './styles';



interface RentalPeriod {
    // start: number;
    startFormatted: string;
    // end: number;
    endFormatted: string;
}

// Tipando parametros que vem de uma tela para outra
interface Params {
    car: CarDTO;
}

export function Schedulling(){
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
  // Para ter as datas selecionadas
  const [markedDates, setMarkedDates] = useState<MarkedDatesProps>({} as MarkedDatesProps);  
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)

  const theme = useTheme();
  
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  // #Recuperando os parametros que estão sendo passados para essa tela
  const route       = useRoute();
  const { car } = route.params as Params;

  
  function handleConfirmRental() {
    if(!rentalPeriod.startFormatted || !rentalPeriod.endFormatted){
        Alert.alert("Selecione o intervalo para alugar.")
    }
    else{
        navigation.navigate('SchedullingDetails', {
            car,
            dates: Object.keys(markedDates),
        });
    }
  }
  
  function handleBack(){
    navigation.goBack();
  }

  function handleChangeDate(date: DayProps){

      let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
      let end = date;

      // garantindo que a primeira data seja sempre a menor, e a maior a ultima  
      if(start.timestamp > end.timestamp){
          start = end;
          end = start;
      }

      setLastSelectedDate(end);
      const interval = generateInterval(start, end);
      setMarkedDates(interval);

      // Capturando só a primeira data   
      const firstDate = Object.keys(interval)[0];
      const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

      setRentalPeriod({
        //   start: start.timestamp,
        //   end: end.timestamp,
          startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
          endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
      })
  }


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

            <RentalPeriod>
                <DateInfo>
                    <DateTitle>DE</DateTitle>
                    <DateValueContainer selected={!!rentalPeriod.startFormatted}>
                        <DateValue>{rentalPeriod.startFormatted}</DateValue>
                    </DateValueContainer>
                </DateInfo>
                <ArrowSvg />
                <DateInfo>
                    <DateTitle>ATÉ</DateTitle>
                    <DateValueContainer selected={!!rentalPeriod.endFormatted}>
                        <DateValue>{rentalPeriod.endFormatted}</DateValue>
                    </DateValueContainer>
                </DateInfo>
            </RentalPeriod>
        </Header>

        <Content>
            <Calendar 
                markedDates={markedDates}
                onDayPress={handleChangeDate}
            />
        </Content>
            <Footer>
                <Button 
                    title="Confirmar" onPress={handleConfirmRental}
                />
            </Footer>
    </Container>
  );
}