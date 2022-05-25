import React from 'react';
import { NavigationProp, ParamListBase, useNavigation, useRoute } from '@react-navigation/native';

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
  CarImages,
  Content,
  Details,
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


// Tipando parametros que vem de uma tela para outra
interface Params {
  car: CarDTO;
}

export function CarDetails(){
  const navigation  = useNavigation<NavigationProp<ParamListBase>>();
  
  // #Recuperando os parametros que estão sendo passados para essa tela
  const route       = useRoute();
  const { car } = route.params as Params;
  
  function handleConfirmRental() {
    navigation.navigate('Schedulling');
  }

  function handleBack(){
    navigation.goBack();
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>

      <CarImages>
        <ImageSlider 
          imagesUrl={car.photos} 
        />
      </CarImages>

      <Content>
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
      </Content>

      <Footer>
        <Button title="Escolher período do aluguel" onPress={handleConfirmRental}/>
      </Footer>

    </Container>
  );
}