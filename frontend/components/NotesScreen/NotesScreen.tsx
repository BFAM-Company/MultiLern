import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import {DrawingComponent} from '../DrawingComponent/DrawingComponent';
import ToolKit from './NotesScreenComponents/ToolKit';

function NotesScreen() {
  const [color, setColor] = useState<string>('black')
  const [width, setWidth] = useState<number>(2)
  const [style, setStyle] = useState<string>('normal')

  const colorChanger = (col: string) => {
    setColor(col)
  }

  const widthChanger = (wid: number) => {
    setWidth(wid)
  }

  const styleChanger = (stl: string) => {
    setStyle(stl)
  }

  return (
      <View style={styles.container}>
        <DrawingComponent color={color} width={width} style={style}/>
        <ToolKit color={color} width={width} style={style} returnColor={colorChanger} returnWidth={widthChanger} returnStyle={styleChanger}/>
      </View>
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