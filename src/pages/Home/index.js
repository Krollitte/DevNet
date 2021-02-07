import React, { useState, useContext, useEffect } from 'react';
import { Text, View, Modal, Platform, Button, KeyboardAvoidingView, TextInput, ActivityIndicator } from 'react-native';
import firebase from '../../services/firebaseConnection'
import Feather from 'react-native-vector-icons/Feather';

import Header from '../../components/Header';
import Posts from '../../components/Posts';

import { AuthContext } from '../../contexts/auth'
import {
  Container,
  ButtonPost,
  ButtonFinishPost,
  ButtonCancelPost,
  ViewModal,
  TitleModal,
  ListPosts
} from './styles'

export default function Home() {
  const [ newPostModalisOpen, setNewPostModalisOpen ] = useState(false);
  const [ post, setPost ] = useState('');
  const [ posts, setPosts] = useState([]);
  const [ loading, setLoading ] = useState(true)

  const { user } = useContext(AuthContext)

  useEffect(()=>{

    const subscriber = 
    firebase
    .database()
    .ref('posts')
    
    .on('value', snapshot => {
      console.log('snapshot-->', snapshot)
      const postList = [];
      snapshot.forEach(post => {
        console.log('post -->', post)
        postList.push(
          post,
        );
      });
      
      setPosts(postList);
      setLoading(false)
      
    });
    //quando demonsta o componente desativa o olheiro
     
    
  },[]);

  async function handlePost(){

    if(post === ''){
      alert('Post vazio não vale :c')
      return ;
    }
    
    let avatarUrl = '';
    try{
      let response =  await firebase.storage().ref('users').child(user?.uid).getDownloadURL();
      avatarUrl = response;
    }catch(err){
      avatarUrl = '';
    }
    let date =  await new Date().toString();
    console.log(date)
    let key = await firebase.database().ref('posts').child(user.uid).push().key;
    await firebase.database().ref('posts').child(key).set({
      createdAt:  date,
      content: post,
      author: user.name,
      likes:0,
      avatarUrl: avatarUrl,
      userId: user.uid,
      postId:key
    }).then(()=>{
      console.log('foi')
      setPost('');
      setNewPostModalisOpen(false);
    })
    .catch((error)=>{
      console.log('error->', error)
    })
    

    }
    
  
 return (
   <Container>
     <Modal
        animationType="slide"
        transparent={true}
        visible={newPostModalisOpen}
      >
        <KeyboardAvoidingView behavior={Platform.OS === "android" ? "padding" : "height"} style={{
          flex: 0.4,
          justifyContent: "flex-start",
          alignItems: "center",
          marginLeft: "7.5%",
          marginRight: "7.5%",
          backgroundColor:'#fff',
          borderRadius: 20,
          shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            marginTop:'30.5%'
          
        }}>
          <ViewModal>
            <View style={{flexDirection:'row', height:30, borderTopRightRadius:20, borderTopLeftRadius: 20,justifyContent:'space-around',alignItems:'center', borderBottomWidth:1, borderColor:'black'}}>

            <TitleModal>Novo Post</TitleModal>
            <ButtonCancelPost onPress={()=> setNewPostModalisOpen(!newPostModalisOpen)} >
              <Feather 
              name="x"
              color="#000"
              size={25}/>
            </ButtonCancelPost> 

            <ButtonFinishPost onPress={()=> handlePost()}>
              <Feather 
              name="check"
              color="#000"
              size={25}/>
            </ButtonFinishPost>

            </View>
            <TextInput 
            multiline={true} 
            onChangeText={(text) => setPost(text)}
            value={post}
            style={{ 
              fontSize: 20, 
              textAlignVertical : "top", 
              justifyContent: "flex-start", 
              paddingTop: 10,
              paddingBottom: 0, 
              paddingLeft:10,
              paddingRight:10,
              borderBottomLeftRadius:20,
              borderBottomRightRadius:20,
              alignItems: "flex-start", 
              height:'80%', 
              width:'100%', 
              textAlign:'left', 
            }}/>
          </ViewModal>
        </KeyboardAvoidingView>
      </Modal>

      <Header />

      {loading ? (
        <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
          <ActivityIndicator size={50} color="#E52246"/>
        </View>
      ):(
        <ListPosts
        showVerticalIndicator={false}
        data={posts}
        renderItem={ (item) =>{
          console.log('item -->', item)
          return(
            <Posts data={item.item} userId={user.uid} />
          )
        }}/>
      )}


     <ButtonPost onPress={()=> setNewPostModalisOpen(!newPostModalisOpen)}>
      <Feather 
      name="edit-2"
      color="#FFF"
      size={25}/>
      </ButtonPost>
   </Container>
  );
}