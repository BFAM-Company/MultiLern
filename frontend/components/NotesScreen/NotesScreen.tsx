import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import DrawingComponent from '../DrawingComponent/DrawingComponent';

function NotesScreen() {
  return (
      <View style={styles.container}>
        <DrawingComponent />
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