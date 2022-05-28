import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import {
  Container
} from './styles';

export function MyCars(){

  const [cars, setCars] = useState<CarDTO[]>([]);
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

    </Container>
  );
}