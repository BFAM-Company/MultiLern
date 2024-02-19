import React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { Canvas, Circle, Fill } from "@shopify/react-native-skia";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, { useSharedValue, withDecay } from "react-native-reanimated";
import { PanGestureHandler } from 'react-native-gesture-handler';


function DrawingComponent() {

    const translateX = useSharedValue<number>(100);
    const translateY = useSharedValue<number>(100);

    const gesture = Gesture.Pan()
    .onChange((e) => {
      translateX.value = e.x
      translateY.value = e.y
    })


  return (
    <GestureDetector gesture={gesture}>
      <Canvas style={[styles.container,{ flex: 1 }]}>
        <Fill color="lightblue" />
        <Circle cx={translateX} cy={translateY} r={20} color="#3E3E" />
      </Canvas>
    </GestureDetector>
  )
}




const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:'100%',
    }
})

export default DrawingComponent;