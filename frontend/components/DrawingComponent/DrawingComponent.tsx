import {
  Canvas,
  Color,
  Path,
  SkPath,
  Skia,
  TouchInfo,
  useTouchHandler,
} from "@shopify/react-native-skia";
import React, { useCallback, useState } from "react";
import { StyleSheet } from "react-native";

type pathType = {
  path: SkPath;
  color?: string;
  width?: number;
};

export const DrawingComponent = () => {
  const [paths, setPaths] = useState<pathType[]>([]);

  const drawingStartHandler = useCallback((touchInfo: TouchInfo) => {
    setPaths((currentPaths: any) => {
      const { x, y } = touchInfo;
      const newPath = Skia.Path.Make();
      newPath.moveTo(x, y);
      return [
        ...currentPaths,
        {
          path: newPath,
          color: 'black',
          width: 2,
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
    <Canvas style={style.container} onTouch={touchHandler}>
      {paths.map((path, index) => (
        <Path
          key={index}
          path={path.path}
          color={"black"}
          style={"stroke"}
          strokeWidth={2}
        />
      ))}
    </Canvas>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});