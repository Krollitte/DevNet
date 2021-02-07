import React from 'react';
import { Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {
    Container,
    Header,
    Avatar,
    Name,
    ContentView,
    Content,
    Actions,
    ButtonLike,
    Like,
    TimePost
} from './styles';
export default function Posts(props) {
     console.log( props.data.content)
 return (
   <Container>
       <Header>
           {props.avatarUrl ?
           (
            <Avatar source={require('../../Assets/avatarNoPhoto.jpg')} />
           ):(

            <Avatar source={require('../../Assets/avatarNoPhoto.jpg')} />
           )}
            <Name> rasrdads</Name>
       </Header>
       <ContentView>
           <Content>
               asdadasd
           </Content>
       </ContentView>

       <Actions>
        <ButtonLike>
        <Like> 60 </Like>    
            <MaterialCommunityIcons name="heart-plus-outline"
            size={20}
            color="#e52246"
            />
        </ButtonLike>
        <TimePost>
            há 10 min
        </TimePost>
       </Actions>
   </Container>
  );
}