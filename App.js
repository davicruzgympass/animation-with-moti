import React, { useState, useRef } from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity, Pressable, Dimensions, Animated } from 'react-native'
import { MotiView, useAnimationState, AnimatePresence } from 'moti'

const {height} = Dimensions.get('screen')
function ShapeMin() {
  const [isExpanded,setIsExpanded] = useState(false)

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1800,
      delay: 100,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1800,
      useNativeDriver: true,
    }).start();
  };

  const animationState = useAnimationState({
  from: {
    height: 90,
  },
  to: {
    height: 90,
  },
  expanded: {
    height: height,
  },
  
})

const onPress = () => {
  if (animationState.current !== 'expanded') {
    animationState.transitionTo('expanded');
    setTimeout(() => {
      setIsExpanded(!isExpanded)
      fadeIn();
    }, 600)
  }else{
    animationState.transitionTo('from')
    fadeOut()
    setTimeout(() => {
      setIsExpanded(!isExpanded)
    }, 1600)
  }
}

  return (
    <MotiView
      state={animationState}
      style={styles.shapeMin}
      transition={
        {
          type: 'timing',
          duration: 2000,
        }
      }
    >
      <AnimatePresence exitBeforeEnter>
        <MotiView
          from={{
            opacity: 1,
            scale: 1,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 0.9,
          }}
          transition={{
            duration: 1800,
            type: 'timing'
          }}
        >

        {
          isExpanded ? (
           
              <Animated.View
              style={[
                styles.containerMax,
                {
                  opacity: fadeAnim,
                },
              ]}>

              <Image style={styles.image} source={{uri: 'https://images.unsplash.com/photo-1677009741202-b761c523fd15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60'}} />
            <Text>Titulo Teste</Text>
            <View style={styles.containerButtonMax}>
              <TouchableOpacity>
                <Text>⏪</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onPress}>
                <Text>⏸</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text>⏩</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onPress}>
                <Text>❌</Text>
              </TouchableOpacity>
            </View>            
            </Animated.View>
          ) : (
            <View
              style={styles.containerMin}
            > 
              <Text>Titulo Teste</Text>
              <View style={styles.containerButtonMin}>
                <TouchableOpacity>
                  <Text>⏪</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPress}>
                  <Text>⏸</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text>⏩</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPress}>
                  <Text>❌</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        }  
        </MotiView>
      </AnimatePresence>
    </MotiView>        
  )
}

export default function App() {
  return (
    <MotiView style={styles.container}>
      <ShapeMin />
    </MotiView>
  )
}

const styles = StyleSheet.create({
  shapeMin: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 90,
    width: '100%',
    borderRadius: 8,
    bottom: 0,
    position: 'absolute',
    backgroundColor: 'white',
  },
  shape: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
    width: 250,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#9c1aff',
  },
  containerMin: {
        flexDirection: 'row', alignItems: 'center', width: '100%',
        justifyContent: 'space-between', paddingHorizontal: 15},
  containerMax: {
        flexDirection: 'column', alignItems: 'center', width: '100%',
        justifyContent: 'center', paddingHorizontal: 15},
  image: {
    height: 100,
    width: 100,
    borderRadius: 100
  },

  containerButtonMax: {
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-between', 
        width: '100%', 
        paddingHorizontal: 10
      },

      containerButtonMin: 
        {flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-evenly', flex: 1, paddingHorizontal: 10},
      
})