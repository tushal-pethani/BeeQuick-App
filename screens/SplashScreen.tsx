import React, {Dispatch, SetStateAction, useEffect} from 'react';
import {View, Text} from 'react-native';
import LottieView from 'lottie-react-native';

interface SplashProps {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export default function Splash({setIsLoading}: SplashProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds delay for testing

    return () => clearTimeout(timer);
  }, [setIsLoading]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ffcc31',
        alignItems: 'center',
      }}>
      <LottieView
        source={require('../assets/animation.json')}
        autoPlay
        loop={false}
        style={{width: 400, height: 400}}
        // resizeMode="cover"
        onAnimationFinish={() => setIsLoading(false)}
      />
    </View>
  );
}
