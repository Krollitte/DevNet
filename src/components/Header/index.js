import React from 'react';
import { View, Text } from 'react-native';


import {
  Container,
  Title
} from './styles'
export default function Header() {
 return (
   <Container>
       <Title> 
         DEV
         <Text style={{fontStyle:'italic', color:'#E52246'}}>
          Net
         </Text>
       </Title>
   </Container>
  );
}