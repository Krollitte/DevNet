import React, { useContext } from 'react';
import { Button, Text, View } from 'react-native';

import { AuthContext } from '../../contexts/auth'
export default function Profile() {
  const { signOut } = useContext(AuthContext);
 return (
   <View>
       <Text>
           Profile
       </Text>
       <Button title="sair" onPress={()=>signOut()} />
   </View>
  );
}