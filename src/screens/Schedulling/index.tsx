import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
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


export function Schedulling(){
  
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);

  // Para ter as datas selecionadas
  const [markedDates, setMarkedDates] = useState<MarkedDatesProps>({} as MarkedDatesProps);  

  const theme = useTheme();

  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  
  function handleConfirmRental() {
    navigation.navigate('SchedullingDetails');
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
                    <DateValueContainer selected={false}>
                        <DateValue>18/06/2021</DateValue>
                    </DateValueContainer>
                </DateInfo>
                <ArrowSvg />
                <DateInfo>
                    <DateTitle>ATÉ</DateTitle>
                    <DateValueContainer selected={false}>
                        <DateValue>18/06/2021</DateValue>
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