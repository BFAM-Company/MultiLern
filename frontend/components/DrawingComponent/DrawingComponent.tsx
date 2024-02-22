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
}

export const DrawingComponent = ({color, width, style}: DrawingComponentProps) => {
  const [paths, setPaths] = useState<pathType[]>([]);
  const selectedColor = useSharedValue<string>(color)
  const selectedWidth = useSharedValue<number>(width)
  const selectedStyle = useSharedValue<string>(style)

  useEffect(()=>{
    selectedColor.value = color
    selectedWidth.value = width
    selectedStyle.value = style
  })

  const drawingStartHandler = useCallback((touchInfo: TouchInfo) => {
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
      ];
    });
  }, []);

  const positionChangeHandler = useCallback((touchInfo: TouchInfo) => {
    setPaths((currentPaths: any) => {
      const { x, y } = touchInfo;
      const currentPath = currentPaths[currentPaths.length - 1];
      const lastPoint = currentPath.path.getLastPt();
      const xMid = (lastPoint.x + x) / 2;
      const yMid = (lastPoint.y + y) / 2;

      currentPath.path.quadTo(lastPoint.x, lastPoint.y, xMid, yMid);
      return [...currentPaths.slice(0, currentPaths.length - 1), currentPath];
    });
  }, []);

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