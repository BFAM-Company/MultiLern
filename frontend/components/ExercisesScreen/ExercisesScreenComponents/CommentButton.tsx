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

interface IImages {
	images: {
		create: {
			img: string
		}
	}
}[]

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function CommentButton({id, handleRefresh}: PostContentProps) {
  const userContext = useContext(UserDataContext)
  const {publicAxios, authAxios} = useContext(AxiosContext)
  const [modalVisible, setModalVisibile] = useState<boolean>(false)

  const [title, onChangeTitle] = useState<string>('')
  const [content, onChangeContent] = useState<string>('')
	const [images, setImages] = useState<IImages[]>([]);

  const pickImage = async () => {
		const { status } = await ImagePicker. 
            requestMediaLibraryPermissionsAsync(); 

		if (status !== "granted") { 

			Alert.alert( 
						"Permission Denied", 
						`Sorry, we need camera  
							roll permission to upload images.` 
				); 
		} else { 
				const result = 
						await ImagePicker.launchImageLibraryAsync({base64: true, quality: 0.1}); 
				
				if (!result.canceled && result.assets) {
                const image: IImages = {
                    images: {
                        create: {
                            img: `data:image/png;base64,${result.assets[0].base64}`
                        }
                    }
                };
                setImages((prevState) => [...prevState, image]);
            }
		} 
	}
     
  const handleClick = () =>{
    setModalVisibile(true)
  }
  
    const removeImage = (imageId: number) => {
        const updatedImages = images.filter((_, index) => index !== imageId);
        setImages(updatedImages);
    }
    
  const handleCommentSubmit = async() =>{
        const event = new Date();

        await publicAxios.post(`/posts/comment`, {
            title: title,
            content: content,
            date: event.toISOString(),
            parentPostId: id,
						images: images,
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
									<Text
										style={styles.hintText}
									>
										Dodaj obrazy do swojej odpowiedzi
									</Text>
									<View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap'}}>
										{images && images.map((image: any, index) => (
                                            <TouchableOpacity testID={`image-${index}`} key={index} onPress={() => removeImage(index)}>
												<View style={styles.imageButton}>
														<Image style={{width: 100, height: 100, opacity: .7, borderRadius: 5}} source={{uri: image.images.create.img}}/>
												</View>
                                            </TouchableOpacity>
										))}
                                        <TouchableOpacity onPress={pickImage} testID='uploadButton'>
                                            <View style={styles.uploadButton}>
                                                    <Image style={{width: 50, height: 50,opacity: .5}} source={require('../../../assets/upload-icon.png')}/>
                                            </View>
                                        </TouchableOpacity>
									</View>
                <TouchableOpacity
                    onPress={handleCommentSubmit}
                    style={styles.button}
                    >
                        <LinearGradient
                            colors={['rgb(45,45,55)', 'rgb(45,45,55)', 'rgb(100,100,110)']}
                            style={styles.linearGradient}
                        >
                            <Text style={{color:'white', fontWeight:'900', fontSize:22}}>Wyślij</Text>
                        </LinearGradient>
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

export default CommentButton;