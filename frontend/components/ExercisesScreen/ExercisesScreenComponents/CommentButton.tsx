import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext, useState } from 'react'
import {StyleSheet, TouchableOpacity, Text, Modal, Dimensions, View, Image, ScrollView, Alert} from 'react-native'
import { AxiosContext } from '../../context/AxiosProvider/AxiosProvider';
import { UserDataContext } from '../../context/UserContext/UserContext';
import { TextInput } from 'react-native-paper';
import * as ImagePicker from "expo-image-picker"; 

interface PostContentProps{
    id:number,
    handleRefresh: any,
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function CommentButton({id, handleRefresh}: PostContentProps) {
  const userContext = useContext(UserDataContext)
  const {publicAxios, authAxios} = useContext(AxiosContext)
  const [modalVisible, setModalVisibile] = useState<boolean>(false)

  const [file, setFile] = useState();

  const [title, onChangeTitle] = useState<string>('')
  const [content, onChangeContent] = useState<string>('')

  const pickImage = async () => {
		const { status } = await ImagePicker. 
            requestMediaLibraryPermissionsAsync(); 
  
        if (status !== "granted") { 
  
            // If permission is denied, show an alert 
            Alert.alert( 
                "Permission Denied", 
                `Sorry, we need camera  
                 roll permission to upload images.` 
            ); 
        } else { 
  
            // Launch the image library and get 
            // the selected image 
            const result = 
                await ImagePicker.launchImageLibraryAsync(); 
  
            if (!result.canceled) { 
  
                // If an image is selected (not cancelled),  
                // update the file state variable 
								console.log(result);
            } 
        } 
	}
     
  const handleClick = () =>{
    setModalVisibile(true)
  }

  const handleSubmit = async() =>{
        const event = new Date();

        await publicAxios.post(`/posts/comment`, {
            title: title,
            content: content,
            date: event.toISOString(),
            parentPostId: id,
            userId: userContext?.userData?.id,
            }, {
              headers: {
                'Content-Type': 'application/json'
              }
          })
        setModalVisibile(false)
        await handleRefresh()
      }


  return (
    <>
        <Modal
            visible={modalVisible}
            style={{width:windowWidth, height:windowHeight}}
        >
            <ScrollView>
            <View
                style={styles.modalContainer}
            >
                <View
                    style={styles.closeButtonContainer}
                >
                    <TouchableOpacity
                        onPress={()=>{setModalVisibile(false)}}
                    >
                        <Image 
                            source={require('./../../../assets/close-icon-bold.png')} 
                            style={{width:30,height:30,}}
                        />
                    </TouchableOpacity>
                </View>
                <Text
                    style={styles.hintText}
                >
                    Dodaj tytuł do swojej odpowiedzi!
                </Text>
                <Text
                    style={styles.smallHintText}
                >
                    Może ułatwić to późniejsze znalezienie twojej odpowiedzi innym użytkownikom
                </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeTitle}
                    value={title}
                    placeholder='tytuł(opcjonalny)...'
                />
                 <Text
                    style={styles.hintText}
                 >
                    Dodaj treść swojej odpowiedzi
                </Text>
                <Text
                    style={styles.smallHintText}
                >
                    Pomóż innym. Staraj się wyjaśnić rozwiązanie i swój tok myślenia!
                </Text>
                <TextInput
                    editable
                    multiline
                    style={[styles.input, {minHeight:400,}]}
                    onChangeText={onChangeContent}
                    value={content}
                    placeholder={'Rozwiązanie...'}
                />
                <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.button}
                    >
                        <LinearGradient
                            colors={['rgb(45,45,55)', 'rgb(45,45,55)', 'rgb(100,100,110)']}
                            style={styles.linearGradient}
                        >
                            <Text style={{color:'white', fontWeight:'900', fontSize:22}}>Wyślij</Text>
                        </LinearGradient>
                </TouchableOpacity>
								<TouchableOpacity style={styles.button} 
                onPress={pickImage}> 
                <Text> 
                    Choose Image 
                </Text> 
            </TouchableOpacity> 
            </View> 
            </ScrollView>
        </Modal>
        <TouchableOpacity
            onPress={handleClick}
            style={styles.button}
        >
            <LinearGradient
                colors={['rgb(45,45,55)', 'rgb(45,45,55)', 'rgb(100,100,110)']}
                style={styles.linearGradient}
            >
                <Text style={{color:'white', fontWeight:'900', fontSize:22}}>Odpowiedz</Text>
            </LinearGradient>
        </TouchableOpacity>
    </>
    
  );
}




const styles = StyleSheet.create({
    button:{
        width:300,
        height:55,
        borderRadius:20,
        margin:20,
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
        width:'100%',
        height:'100%',
        display:'flex',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        padding:20,
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
})

export default CommentButton;