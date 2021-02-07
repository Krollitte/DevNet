import React, { useState, createContext, useEffect } from 'react';
import firebase from '../services/firebaseConnection';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [ user, setUser  ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const [ loadingAuth, setLoadingAuth ] = useState(false);

  useEffect(()=>{
    async function loadStorage(){
      const storageUser = await AsyncStorage.getItem('devData');

      if(storageUser){
        setUser(JSON.parse(storageUser));
        setLoading(false)
      }

      setLoading(false); 
    }

    loadStorage()
  })

  async function signIn(email, password){
    setLoadingAuth(true);

    await firebase.auth().signInWithEmailAndPassword(email, password)
    .then( async (value) =>{
      let uid = value.user.uid;
      console.log(uid)
      await firebase.database().ref('users').child(uid).once('value')
      .then((snapshot) =>{
        console.log(snapshot.val())
        let data = {
          uid: uid,
          name: snapshot.val().name,
          techs: snapshot.val().techs,
          email: value.user.email
        };

        setUser(data);
        storageUser(data);
        setLoadingAuth(false);
      })
    })
    .catch((error) =>{
      console.log(error);
      setLoadingAuth(false);
    })
  }

  async function signUp(email, password, name, techs){
    setLoadingAuth(true);
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then( async (value)=>{
      let uid = value.user.uid;
      await firebase.database().ref('users').child(uid).set({
        name: name,
        techs: techs
      }).then(()=>{
        let data = {
          uid: uid,
          name: name,
          techs: techs,
          email: value.user.email
        };

        setUser(data);
        storageUser(data);
        setLoadingAuth(false);
      });
      
    })
    .catch((error)=>{
      console.log(error)
      setLoadingAuth(false);
    })
  }

  async function signOut(){
    await firebase.auth().signOut();
    await AsyncStorage.clear()
    .then(() =>{
      setUser(null);
    })
  }

  async function storageUser(data){
    await AsyncStorage.setItem('devData', JSON.stringify(data));
  }
  

 return (
   <AuthContext.Provider value={{signed: !!user, user, signUp, signOut, signIn, loadingAuth, loading}}>
       {children}
   </AuthContext.Provider>
  );
}