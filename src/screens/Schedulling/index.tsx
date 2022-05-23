import React from 'react';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';


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
import { StatusBar } from 'react-native';


export function Schedulling(){
  const theme = useTheme();

  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  
  function handleConfirmRental() {
    navigation.navigate('SchedullingDetails');
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
                onPress={() => {}} 
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
                    {/* <DateValue selected={false}></DateValue> */}
                    <DateValueContainer selected={false}>
                        <DateValue>18/06/2021</DateValue>
                    </DateValueContainer>
                </DateInfo>
                <ArrowSvg />
                <DateInfo>
                    <DateTitle>ATÉ</DateTitle>
                    {/* <DateValueContainer selected={!!rentalPeriod.endFormatted}> */}
                    <DateValueContainer selected={false}>
                        <DateValue>18/06/2021</DateValue>
                    </DateValueContainer>
                </DateInfo>
            </RentalPeriod>
        </Header>

        <Content>
            <Calendar />
        </Content>
            <Footer>
                <Button 
                    title="Confirmar" onPress={handleConfirmRental}
                />
            </Footer>
    </Container>
  );
}