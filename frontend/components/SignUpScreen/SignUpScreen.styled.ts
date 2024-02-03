import { StyleSheet, Platform } from "react-native";
import { StylesVariables } from "../../utils/GLOBALS";

export const styles = StyleSheet.create({
  mainContainer:{
      width:'100%',
      height:'100%',
      backgroundColor: 'white',
  },
  image:{
      width:'100%',
      height:'100%',
      display:'flex',
      
      alignItems:'center',
      objectFit: 'cover',
      ...Platform.select({
          web: {
              justifyContent:'center',
          },
          default: {
              justifyContent:'flex-end',
          }
      }),
      
  },
  fadingHeader:{
      width:'100%',
      display:'flex',
      alignItems:'center',
      justifyContent: 'center',
  },
  AccountCreateContainer:{
      height:'60%',
      display:'flex',
      justifyContent:'space-around',
      ...Platform.select({
          web: {
              alignItems:'center',
              width: '75%'
          },
          default: {
              width:'100%',	
              justifyContent: 'flex-end',
              marginBottom:20,
          }
      }),
  }, 
  LogoContainer:{
      width:'100%',
      display:'flex',
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
  },
  LogoImage:{
      width:StylesVariables.LogoSize,
      height:StylesVariables.LogoSize,        
      borderRadius:5,
  },
  titleText:{
      fontSize:30,
      color:'rgb(33,33,43)',
      fontWeight:'600',
      margin:10
  },
  mainTextContainer:{
      width:'100%',
      display:'flex',
      alignItems:'center',
      marginBottom: 10
  },
  mainText:{
      width:'90%',
      fontSize:19,
      fontWeight:'700',
      color:'gray',
      textAlign:'center',
  },
  mainContentContainer:{
      ...Platform.select({
          web: {
              width: '50%'
          },
          default: {
              width: '100%'
          }
      }),
      display:'flex',
      height: '100%',
      justifyContent:'space-around',
      alignItems:'center',
      margin:10,
  },
  formContainer: {
    width: '100%', 
    display: 'flex',
    margin: 10, 
    justifyContent:'space-around',
    alignItems:'center',
    height: '55%'
  },
  ORTextContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    margin: 20
  },
  buttonsContainer: {
    width: '100%',
    display: 'flex',
    justifyContent:'space-around',
    alignItems:'center',
    height: '40%',
    margin: 10
  },
  input: {
      backgroundColor: 'white',
      width:'80%',
      height: StylesVariables.InputSize,
      borderRadius:20,
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      margin:20,
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
  }
})
