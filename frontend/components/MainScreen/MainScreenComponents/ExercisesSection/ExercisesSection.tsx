import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext, useState } from 'react';
import { Alert, Animated, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { UserDataContext } from '../../../context/UserContext/UserContext';
import { AxiosContext } from '../../../context/AxiosProvider/AxiosProvider';
import { Modal } from 'react-native-paper';
import * as ImagePicker from "expo-image-picker"; 


interface NotepadSectionProps{
    pageSwitcher: any
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

function ExercisesSection({pageSwitcher}: NotepadSectionProps) {
    const userContext = useContext(UserDataContext)
    const {publicAxios, authAxios} = useContext(AxiosContext)
    const [modalVisible, setModalVisibile] = useState<boolean>(false)

    const [file, setFile] = useState();

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
     

  const handleCommentSubmit = async() =>{
        const event = new Date();

        await publicAxios.post(`/posts/comment`, {
            title: title,
            content: content,
            date: event.toISOString(),
			images: images,
            userId: userContext?.userData?.id,
            }, {
              headers: {
                'Content-Type': 'application/json'
              }
          })
        setModalVisibile(false)
        pageSwitcher('Main')
      }


  return (
    <View
        style={styles.mainContainer}
    >
        <Modal
            visible={modalVisible}
            style={{width:windowWidth, height:windowHeight, position:'absolute', top:0,left:0, right:0, zIndex:10000000}}
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
                            source={require('./../../../../assets/close-icon-bold.png')} 
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
										{images && images.map((image: any) => (
												<View style={styles.imageButton} key={image.images.create.img}>
													<TouchableOpacity>
														<Image style={{width: 100, height: 100, opacity: .7, borderRadius: 5}} source={{uri: image.images.create.img}}/>
													</TouchableOpacity>
												</View>
										))}
										<View style={styles.uploadButton}>
											<TouchableOpacity onPress={pickImage}>
												<Image style={{width: 50, height: 50,opacity: .5}} source={require('./../../../../assets/upload-icon.png')}/>
											</TouchableOpacity>
										</View>
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
            style={styles.container}
            onPress={()=>{setModalVisibile(true)}}
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