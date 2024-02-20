import React, { useEffect, useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { Canvas, Circle, Fill, Skia, Path } from "@shopify/react-native-skia";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, { useSharedValue, withDecay } from "react-native-reanimated";
import { PanGestureHandler } from 'react-native-gesture-handler';


function DrawingComponent() {
    // const [paths, addPaths] = useState<any>([]);

    const translateX = useSharedValue<number>(100);
    const translateY = useSharedValue<number>(100);

    const path = useSharedValue<any>(Skia.Path.Make())

    const gesture = Gesture.Pan()
    .onStart((e) => {
      //path.value = Skia.Path.Make()
      path.value.moveTo(e.x, e.y)
    })
    .onChange((e) => {
      translateX.value = e.x
      translateY.value = e.y
      path.value.lineTo(e.x, e.y)
    })
    .onEnd((e)=>{
      //path.value.close();
      console.debug('path closed')
      // addPaths((current: any) => [...current, path.value])
    })

    // let pathsElements: any = null;
    // for(let path of paths){
    //   pathsElements += (<Path path={path} color="red"/>)
    // }
  return (
    <GestureDetector gesture={gesture}>
      <Canvas style={[styles.container,{ flex: 1 }]}>
        <Fill color="white" />
        <Circle cx={translateX} cy={translateY} r={20} color="lightgray" />
        <Path 
          path={path} 
          color="hotpink" 
          style="stroke"
          strokeWidth={3}
        />
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