import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { BorderlessButtonProps } from 'react-native-gesture-handler';

import { useTheme } from 'styled-components';

import {
  Container
} from './styles';


// Passando a cor do botão por parametro, porque cada hora ele pode ser uma cor devido a alteração do fundo
interface Props extends BorderlessButtonProps {
    color?: string;
}


export function BackButton({color, ...rest}: Props){

  const theme = useTheme();

  return (
    <Container {...rest}>
        <MaterialIcons 
            name="chevron-left"
            size={24}
            color={color ? color : theme.colors.text }
        />
    </Container>
  );
}