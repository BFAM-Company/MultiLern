import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const YellowStar = ({rate}: any) => {
    let coverageWidth = rate*25 
    return(
            <View style={styles.container}>
                <Image
                source={require('./../../../assets/star-rate-icon.png')}
                style={[styles.starIcon, {tintColor:'dimgray'}]}
                />
                <View style={[styles.goldStarContainer,{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, width:coverageWidth }]}>
                <Image
                    source={require('./../../../assets/star-rate-icon.png')}
                    style={[styles.starIcon, {tintColor:'gold', }]}
                /> 
                </View>
            </View>
    )
  
}
const styles = StyleSheet.create({
    container:{
        width:25,
        height:25,
        display:'flex',
        alignItems:'center',
        //justifyContent:'center',
    },
    starIcon:{
        width:25,
        height:25,
        resizeMode:'cover',  
        position:'absolute',
        top:0,
        left:0,
    },
    goldStarContainer:{
        display:'flex',
        alignItems:'flex-start',
        justifyContent:'center',
        overflow:'hidden',
    }
})
export default YellowStar;
