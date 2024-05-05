import { LinearGradient } from 'expo-linear-gradient';
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { StylesVariables } from '../../utils/GLOBALS';

interface ButtonProps {
  buttonAction: () => void,
  icons?: any[],
  children: string | JSX.Element,
  colors: string[],
  fontColor?: string;
}

function Button({buttonAction, icons, children, colors, fontColor}: ButtonProps) {

  if(colors.length == 1){
    colors.push(colors[0]);
  }

  const textAlignment = icons ? 'left' : 'center'
  const width = icons ? 'auto' : '100%' 

  return (
    <TouchableOpacity style={[styles.button]} onPress = {buttonAction}>
      <LinearGradient
      colors={colors}
      style={styles.gradient}
      > 
      <Text style={[styles.buttonsText, {color: fontColor, textAlign: textAlignment, width: width}]}>{children}</Text>
      {icons && icons.length > 0 && 
        <View style={styles.imagesContainer}>
          {icons?.map((icon) => (
            <Image key={icon} source={icon} style={[styles.accountServiceIcon, {tintColor: fontColor}]}/>
          ))}
        </View>
      }
      </LinearGradient>
  </TouchableOpacity>
  )
}




const styles = StyleSheet.create({
  button:{
    width:'80%',
    height:StylesVariables.ButtonSize,
    borderRadius:20,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    margin:15,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
  },
  gradient:{
    width:'100%',
    height:'100%',
    borderRadius:20,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingLeft:40,
    paddingRight:40,
  },
  buttonsText:{
    fontSize:17,
    fontWeight:'700',
    color:'rgb(33,33,43)'
  },
  imagesContainer:{
    margin: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-around',
  },
  accountServiceIcon:{
    width: StylesVariables.LogoSize*0.6,
    height:StylesVariables.LogoSize*0.6,
    margin: 5
},
})

export default Button