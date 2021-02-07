import React, { useState, useContext} from 'react';
import { Text, ActivityIndicator } from 'react-native';

import { AuthContext } from '../../contexts/auth'

import {
  Container,
  Title,
  Input,
  Button,
  ButtonText,
  SignUpButton,
  SignUpText
} from './styles.js';



export default function Login() {
 const [ login, setLogin ] = useState(true);
 const [ name, setName ] = useState('');
 const [ email, setEmail ] = useState('');
 const [ password, setPassword ] = useState('');
 const [ techs, setTechs ] = useState([]);

 const { signUp, loadingAuth, signIn } = useContext(AuthContext)

 function toggleLogin(){
   setLogin(!login);
   setName('');
   setEmail('');
   setPassword('');
   setTechs('');
 }

 function handleSignUp(){
  if(email === '' || password === '' || name === '' || password === ''){
    console.log('Preencha todos os campos');
  }
  signUp(email, password, name, techs);

 }

 function handleLogin(){
   if(email === '' || password === ''){
     console.log('Preencha todos os campos');
     return;
   }

   signIn(email, password);
 }

 if(login){
   return(
     <Container>
      <Title>
        Dev
        <Text style={{color: '#e52246'}}>
          Net
        </Text>
      </Title>

      <Input
       placeholder="email@email.com"
       value={email}
       onChangeText={(text) => setEmail(text)}
       />

       <Input
       placeholder="******"
       secureTextEntry={true}
       onChangeText={(text) => setPassword(text)}
       />

       <Button onPress={()=> handleLogin()}>
         {
           loadingAuth ? (
             <ActivityIndicator size={20} color="#FFF" />
           ) : (

            <ButtonText>
              Fazer Login
            </ButtonText>
           )
         }
       </Button>

       <SignUpButton onPress={()=> toggleLogin()}>
         <SignUpText>
           Criar uma conta
         </SignUpText>
       </SignUpButton>
     </Container>
   )
 } 

   return (
     <Container>
         <Title>
          Dev
          <Text style={{color: '#e52246'}}>
            Net
          </Text>
        </Title>
  
         <Input
         placeholder="Nome"
         value={name}
         onChangeText={(text) => setName(text)}
         />
  
         <Input
         placeholder="email@email.com"
         value={email}
         onChangeText={(text) => setEmail(text)}
         />
  
         <Input
         placeholder="Techs de interesse"
         value={techs}
         onChangeText={(text) => setTechs(text)}
         />
  
         <Input
         placeholder="******"
         value={password}
         onChangeText={(text) => setPassword(text)}
         secureTextEntry={true}
         />
  
         <Button onPress={()=> handleSignUp()}>
         {
             loadingAuth ? (
               <ActivityIndicator size={20} color="#FFF" />
             ) : (
  
              <ButtonText>
                Cadastrar
              </ButtonText>
             )
           }
         </Button>
  
         <SignUpButton onPress={()=> toggleLogin()}>
           <SignUpText>
            Já tenho uma conta
           </SignUpText>
         </SignUpButton>
     </Container>
    );
}