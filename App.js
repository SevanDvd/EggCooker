import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import EggsButton from './EggsButton';
import { SvgXml } from 'react-native-svg';
import Logo from "./assets/svg/logo.js";

export default function App() {

  return (
    <View style={styles.container}>
        <StatusBar style="auto" />

        
          
          <EggsButton/> 
    
        
          <View style={styles.svg} width="150" height="200">
            <Logo />
          </View>
          
      
        
    </View> 
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF4AC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg:{
    position: 'relative',
    top: 150,
     }
});
