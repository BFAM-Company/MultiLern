import React, {useState} from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import {DrawingComponent} from '../DrawingComponent/DrawingComponent';
import ToolKit from './NotesScreenComponents/ToolKit';
import HomeButton from './NotesScreenComponents/HomeButton';

function NotesScreen({pageSwitcher}: any) {
  const [color, setColor] = useState<string>('black')
  const [width, setWidth] = useState<number>(2)
  const [style, setStyle] = useState<string>('normal')
  const [isDrawingEnabled, setIsDrawingEnabled] = useState<boolean>(true)

  const colorChanger = (col: string) => {
    setColor(col)
  }

  const widthChanger = (wid: number) => {
    setWidth(wid)
  }

  const styleChanger = (stl: string) => {
    setStyle(stl)
  }
  const drawingChanger = (drw: boolean) => {
    setIsDrawingEnabled(drw)
  }
  return (
      <SafeAreaView style={styles.container}>
        <DrawingComponent 
          color={color} 
          width={width} 
          style={style} 
          isDrawingEnabled={isDrawingEnabled}
        />
        <ToolKit 
          color={color} 
          width={width} 
          style={style} 
          isDrawingEnabled={isDrawingEnabled}
          returnColor={colorChanger} 
          returnWidth={widthChanger} 
          returnStyle={styleChanger}
          returnIsDrawingEnabled={drawingChanger}
        />
        <HomeButton pageSwitcher={()=>{pageSwitcher('Main')}}/>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    width:'100%',
    alignItems:'center',
    justifyContent:'center'
  }
})

export default NotesScreen;