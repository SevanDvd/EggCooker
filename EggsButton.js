import React, {useRef ,useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert, Animated } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useFonts } from 'expo-font';
import { useTimer } from "react-timer-hook";
import { Audio } from 'expo-av';
import { TouchableNativeFeedback } from 'react-native-web';
import * as Haptics from 'expo-haptics';
import HardSvg from './assets/svg/hardSvg.js';
import MediumSvg from './assets/svg/mediumSvg.js';
import SoftSvg from './assets/svg/softSvg.js';

const EggsButton = () => {


    const [timer, setTimer] = useState(null);

    const [fontsLoaded] = useFonts({
        'MyAdobeFont': require('./assets/fonts/KGRedHands.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }



      function startTimer(duration){
          const time = new Date();
          time.setSeconds(time.getSeconds()+duration)
          setTimer(time);
      }

    
    

    return (
        <View style={styles.eggsContainer}>

                <TouchableOpacity onPress={() => {Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft); startTimer(540)}}>
                    <View style={styles.egg}>
                    <HardSvg/>
                    <Text style={styles.eggText}>Hard Boiled</Text>
                    </View>
                </TouchableOpacity>
                
                
                <TouchableOpacity onPress={() => {Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft); startTimer(300)}}>
                    <View style={styles.egg}>
                    <MediumSvg/>
                    <Text style={styles.eggText}>Medium Boiled</Text>
                    </View>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => {Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft); startTimer(180)}}>
                    <View style={styles.egg}>
                    <SoftSvg/>
                    <Text style={styles.eggText}>Soft Boiled</Text>
                    </View>
                </TouchableOpacity>

                <View>
                  {timer !== null ? <Timer key={timer.toISOString()} expiration={timer}/> : null}
                </View>
        </View>
    )
}

function Timer({expiration}){

  const {minutes, seconds} = useTimer({expiryTimestamp : expiration, autoStart: true});

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/ring.mp3') // Replace with the path to your sound file
    );
    await sound.playAsync();
  }

  useEffect(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
    if(!minutes && seconds === 1){

      setTimeout(() => {


        playSound();
        Alert.alert('Cooked !', 'Your egg is cooked.', [
          {
            text: 'Ok',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          }])

        const interval = setInterval(() => {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        }, 500);
       
        setTimeout(() => {
          clearInterval(interval);
        }, 2000);

      }, 1000)
      
  }
  }, [minutes, seconds]);

  

    return(
      <>
        <Text style={styles.timerText}>
        {minutes}:{seconds}
        </Text>
      </>
    );

}


const styles = StyleSheet.create({
    eggsContainer: {
        // borderBlockColor: 'black',
        // borderBlockStyle: 'solid',
        // borderWidth: 1,
        width: "90%",
        height: 200,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
      },
      egg:{
        alignItems: 'center',
        width: 115,
        height: 115,
      },
      eggText: {
        fontFamily: 'MyAdobeFont',
        margin : 10,
        fontSize: 15,
        textAlign: 'center',
      },
      timerText: {
        marginTop: 100,
        fontFamily: 'MyAdobeFont',
        fontSize: 40,
        textAlign: 'center',
      }
})



export default EggsButton;