import React from 'react'
import { Dimensions, Image, Platform, StyleProp, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface ButtonProps {
  buttonAction: () => void,
  icons?: any[],
  children: string | JSX.Element,
  color: string,
  fontColor?: string;
}

function Button({buttonAction, icons, children, color, fontColor}: ButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, {backgroundColor: color}]} onPress = {buttonAction}>
      <Text style={[styles.buttonsText, {color: fontColor}]}>{children}</Text>
      <View style={styles.imagesContainer}>
        {icons && icons?.map((icon) => (
          <Image key={icon} source={icon} style={[styles.accountServiceIcon, {tintColor: fontColor}]}/>
        ))}
      </View>
  </TouchableOpacity>
  )
}

const PCRatio = Platform.OS === 'web' ? 0.4 : 1
const LogoSize = Dimensions.get('window').width*0.10*PCRatio;
const ButtonsSize = Dimensions.get('window').height*0.07;

const styles = StyleSheet.create({
  button:{
    width:'80%',
    height: ButtonsSize,
    borderRadius:20,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    margin:15,
    paddingLeft:40,
    paddingRight:40,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
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
    width:LogoSize*0.6,
    height:LogoSize*0.6,
    margin: 5
},
})

export default Button