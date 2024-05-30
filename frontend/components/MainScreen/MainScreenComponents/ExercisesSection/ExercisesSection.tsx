import React from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface NotepadSectionProps{
    pageSwitcher: any
}

function ExercisesSection({pageSwitcher}: NotepadSectionProps) {
  return (
    <Animated.View
        style={styles.mainContainer}
    >
        <View style={styles.TopHeader}>
            <Text style={styles.title}>Potrzebujesz pomocy?</Text>
        </View>
        <TouchableOpacity
            style={styles.container}
        >
            <Image
                style={styles.image}
                source={require('../../../../assets/users-exercises-button-bg.jpg')}
            />
            <Text style={styles.buttonTitle}>Twoje pytania</Text>
            <Text style={styles.buttonDescription}>Zobacz wszystkie</Text>
            <TouchableOpacity
                style={styles.button}
            >
                <Text style={styles.buttonText}>Dalej</Text>
            </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity
            testID='NotesPageSwitcher'
            style={styles.container}
            onPress={()=>{pageSwitcher('Notes')}}
        >
            <Image
                style={styles.image}
                source={require('../../../../assets/exercises-button-bg.jpeg')}
                resizeMode='contain'
                
            />
             <Text style={styles.buttonTitle}>Zadaj pytanie</Text>
             <Text style={styles.buttonDescription}>Zacznij notować</Text>
             <TouchableOpacity
                style={styles.button}
            >
                <Text style={styles.buttonText}>Utwórz +</Text>
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
        width:180,
        height:300,
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
        padding:10,
        borderRadius:20,
        backgroundColor:'#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            // height: 150,
            height: 0,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 20,
    },
    image:{
        width:170,
        height:170,
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
        height:30,
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
        fontSize:16,
        fontWeight:'500',
        padding:5,
    }
})

export default ExercisesSection;