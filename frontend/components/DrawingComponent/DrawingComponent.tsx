import {Canvas, CornerPathEffect, DashPathEffect, DiscretePathEffect, Path, SkPath, Skia, TouchInfo, useTouchHandler} from "@shopify/react-native-skia";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useSharedValue } from "react-native-reanimated";

type pathType = {
  path: SkPath;
  color?: string;
  width?: number;
  style?: string
};

interface DrawingComponentProps{
  color:string
  width: number
  style: string
  isDrawingEnabled: boolean
}

export const DrawingComponent = ({color, width, style, isDrawingEnabled}: DrawingComponentProps) => {
  const [paths, setPaths] = useState<pathType[]>([]);
  const selectedColor = useSharedValue<string>(color)
  const selectedWidth = useSharedValue<number>(width)
  const selectedStyle = useSharedValue<string>(style)
  const isPenSelected = useSharedValue<boolean>(isDrawingEnabled)

  useEffect(()=>{
    selectedColor.value = color
    selectedWidth.value = width
    selectedStyle.value = style
    isPenSelected.value = isDrawingEnabled
  })

  const drawingStartHandler = useCallback((touchInfo: TouchInfo) => {
    if(isPenSelected.value){
      setPaths((currentPaths: any) => {
        const { x, y } = touchInfo;
        const newPath = Skia.Path.Make();
        newPath.moveTo(x, y);
        return [
          ...currentPaths,
          {
            path: newPath,
            color: selectedColor.value,
            width: selectedWidth.value,
            style: selectedStyle.value,
          },
        ]
      })
    }
    else{
      setPaths((currentPaths: any) => {
        const { x, y } = touchInfo;
        for(let i = 0; i<currentPaths.length; i++ ){
          if(currentPaths[i]?.path.contains(x, y)){
            return [...currentPaths.slice(0, i), ...currentPaths.slice(i+1)]
          }
        }
        return[...currentPaths]
      })
    }
  }, [isPenSelected, selectedColor.value, selectedWidth.value, selectedStyle.value, paths]);

  const positionChangeHandler = useCallback((touchInfo: TouchInfo) => {
    if(isPenSelected.value){
      setPaths((currentPaths: any) => {
        const { x, y } = touchInfo;
        const currentPath = currentPaths[currentPaths.length - 1];
        const lastPoint = currentPath.path.getLastPt();
        const xMid = (lastPoint.x + x) / 2;
        const yMid = (lastPoint.y + y) / 2;
  
        currentPath.path.quadTo(lastPoint.x, lastPoint.y, xMid, yMid);
        return [...currentPaths.slice(0, currentPaths.length - 1), currentPath];
      });
    }   
    else{
      setPaths((currentPaths: any) => {
        const { x, y } = touchInfo;
        for(let i = 0; i<currentPaths.length; i++ ){
          if(currentPaths[i]?.path.contains(x, y)){
            return [...currentPaths.slice(0, i), ...currentPaths.slice(i+1)]
          }
        }
        return[...currentPaths]
      })
    }
  }, [isPenSelected, paths]);

  const touchHandler = useTouchHandler(
    {
      onActive: positionChangeHandler,
      onStart: drawingStartHandler,
    },
    [positionChangeHandler, drawingStartHandler]
  );

  return (
      <Canvas style={myStyle.container} onTouch={touchHandler}>
        {paths.map((path, index) => (
          <Path
            key={index}
            path={path.path}
            color={path.color}
            style={"stroke"}
            strokeWidth={path.width}
          >
            {path.style == 'dashed'?<DashPathEffect intervals={[4, 4]} />:null}
            {path.style == 'discrete'?<DiscretePathEffect length={10} deviation={2} />:null}
          </Path>
        ))}
      </Canvas>
  );
};

const myStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});