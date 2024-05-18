import React from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';


interface ExamsSectionProps{
    pageSwitcher: any
}

function ExamsSection({pageSwitcher}: ExamsSectionProps) {
  return (
    <Animated.View
        style={styles.mainContainer}
    >
        <View style={styles.TopHeader}>
            <Text style={styles.title}>Sprawdziany - pewniaczki</Text>
        </View>
        <TouchableOpacity
            style={styles.container}
            //onPress={pageSwitcher('Main')}
        >
            <Text style={styles.title}>Nasz Zbiór Sprawdzianów</Text>
            <Image
                source={require('../../../../assets/exams-image.png')}
                style={styles.image}
            />
            <Text style={styles.buttonDescription}>
                Największa baza realnych sprawdzianów dodawanych przez użytkowników z całej Polski. 
                Znajdź swój sprawdzian!
            </Text>
            <TouchableOpacity
                style={styles.button}
                //onPress={pageSwitcher('Main')}
            >
                <Text style={styles.buttonText}>Sprawdź</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
    mainContainer:{
        width:'100%',
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-around',
        alignItems:'center',
        marginTop:100,
    },
    TopHeader:{
        width:'100%',
        display:'flex',
        alignItems:'flex-start',
        justifyContent:'center',
        padding:20,
    },
    title:{
        fontSize:24,
        fontWeight:'900',
        color:'rgb(33,33,43)',
    },
    container:{
        width:'90%',
        height:500,
        marginTop:50,
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
        padding:10,
        borderRadius:20,
        backgroundColor:'#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 20,
    },
    image:{
        width:200,
        height:200,
        borderRadius:20,
        backgroundColor:'#F5F5F5',
    },
    buttonTitle:{
        color:'rgb(33,33,43)',
        fontSize:18,
        fontWeight:'900',
        padding:5,
    },
    button:{
        width:'90%',
        height:50,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgb(33,33,43)',
        borderRadius:20,
    },
    buttonText:{
        color:'#fff',
        fontWeight:'500',
        fontSize:16,
    },
    buttonDescription:{
        color:'#c085ff',
        fontSize:20,
        textAlign:'center',
        fontWeight:'500',
        padding:5,
    }
})

export default ExamsSection;