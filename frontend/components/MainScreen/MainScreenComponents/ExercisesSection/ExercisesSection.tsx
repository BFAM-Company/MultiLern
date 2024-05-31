import React, { useContext } from 'react';
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { UserDataContext } from '../../../context/UserContext/UserContext';


interface NotepadSectionProps{
    pageSwitcher: any
}


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function ExercisesSection({pageSwitcher}: NotepadSectionProps) {
  const userContext = useContext(UserDataContext)
    
  return (
    <View
        style={styles.mainContainer}
    >
        <View style={styles.TopHeader}>
            <Text style={styles.title}>Potrzebujesz pomocy?</Text>
        </View>
        <TouchableOpacity
            style={styles.container}
            onPress={()=>{
                pageSwitcher('UserExercises', {userId: userContext?.userData?.id})
            }}
        >
            <Image
                style={styles.image}
                source={require('./../../../../assets/users-exercises-button-bg.jpg')}
            />
            <Text style={styles.buttonTitle}>Twoje pytania</Text>
            <Text style={styles.buttonDescription}>Zobacz wszystkie</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={()=>{
                    pageSwitcher('UserExercises', {userId: userContext?.userData?.id})
                }}
            >
                <Text style={styles.buttonText}>Dalej</Text>
            </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity
            testID='NotesPageSwitcher'
            style={styles.container}
            onPress={()=>{pageSwitcher('CreatePost')}}
        >
            <Image
                style={styles.image}
                source={require('./../../../../assets/exercises-button-bg.jpeg')}
                resizeMode='contain'
                
            />
             <Text style={styles.buttonTitle}>Zadaj pytanie</Text>
             <Text style={styles.buttonDescription}>Zacznij notować</Text>
             <TouchableOpacity
                style={styles.button}
                onPress={()=>{pageSwitcher('CreatePost')}}
            >
                <Text style={styles.buttonText}>Utwórz +</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    </View>
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
    },
    linearGradient:{
        width:'100%',
        height:'100%',
        display:'flex',
        justifyContent:'center',
        borderRadius:20,
        alignItems:'center',
    },
    modalContainer:{
        width:windowWidth,
        height:windowHeight,
        display:'flex',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        padding:20,
        backgroundColor:'white'
    },
    closeButtonContainer:{
        width:'100%',
        display:'flex',
        alignItems:'flex-end',
        padding:10,
    },
    input:{
        width:'90%',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        backgroundColor:'#fff',
        shadowColor: "#000",
        shadowOffset: {
                width: 0,
                height: 0,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,

        elevation: 16,
    },
    hintText:{
        marginTop:50,
        marginBottom:20,
        fontSize:20,
        fontWeight:'900',
        color:'rgb(45,45,55)',
    },
    smallHintText:{
        fontSize:16,
        color:'gray',
        marginBottom:20
    },
		uploadButton: {
			width: 70,
			height: 70,
			borderWidth: 1,
			borderBlockColor: 'black',
			padding:10,
			borderRadius: 5,
		},
		imageButton: {
			width: 100,
			height: 100,
			borderWidth: 1,
			borderBlockColor: 'black',
			borderRadius: 5,
			margin: 5
		}
})

export default ExercisesSection;