import React, { useContext, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, Alert, Text, TextInput, Dimensions, Image } from 'react-native';
import { UserDataContext } from '../context/UserContext/UserContext';
import { AxiosContext } from '../context/AxiosProvider/AxiosProvider';
import * as ImagePicker from "expo-image-picker"; 
import { LinearGradient } from 'expo-linear-gradient';
import RNPickerSelect from "react-native-picker-select";


interface IImages {
	images: {
		create: {
			img: string
		}
	}
}[]

const windowWidth = Dimensions.get('window').width;

const CreatePostScreen = ({pageSwitcher}: any) =>{
    const userContext = useContext(UserDataContext)
    const {publicAxios, authAxios} = useContext(AxiosContext)

    const [title, onChangeTitle] = useState<string>('')
    const [content, onChangeContent] = useState<string>('')
    const [images, setImages] = useState<IImages[]>([])
    const [category, setCategory] = useState<string>('')

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

        await publicAxios.post(`/posts/post`, {
            title: title,
            content: content,
            category: category,
            date: event.toISOString(),
            images: images,
            tags: [],
            userId: userContext?.userData?.id
            }, {
              headers: {
                'Content-Type': 'application/json'
              }
          })
          pageSwitcher('UserExercises', {userId: userContext?.userData?.id})
      }

    const removeImage = (imageId: number) => {
        const updatedImages = images.filter((_, index) => index !== imageId);
        setImages(updatedImages);
    }

    return(
        <ScrollView
            style={{width:windowWidth, height:'auto'}}
            testID='createPostScroll'
        >
            <ScrollView             
            style={{width:windowWidth,}}
            >
            <ScrollView
                contentContainerStyle={styles.modalContainer}
            >
                <Text
                    style={styles.hintText}
                >
                    Dodaj tytuł do swojego pytania
                </Text>
                <Text
                    style={styles.smallHintText}
                >
                    Ułatwi to późniejsze znalezienie go innym użytkownikom
                </Text>
                <TextInput
                    style={[styles.input, {height:50}]}
                    onChangeText={onChangeTitle}
                    value={title}
                    placeholder='tytuł...'
                    testID='title'
                />
                <Text
                    style={styles.hintText}
                >
                    Dodaj kategorie zadania
                </Text>
                <RNPickerSelect
                 onValueChange={(value) => setCategory(value)}
                 placeholder={{ label: "Wybierz kategorie...", value: null }}
                 useNativeAndroidPickerStyle={false}
                 items={[
                     { label: "Matematyka", value: "Matematyka" },
                     { label: "Język Polski", value: "Język Polski" },
                     { label: "Języki obce", value: "Języki obce" },
                     { label: "Geografia", value: "Geografia" },
                     { label: "Fizyka", value: "Fizyka" },
                     { label: "Biologia", value: "Biologia" },
                     { label: "Chemia", value: "Chemia" },
                     { label: "Informatyka", value: "Informatyka" },
                 ]}
                />
                 <Text
                    style={styles.hintText}
                 >
                    Dodaj treść swojego pytania
                </Text>
                <Text
                    style={styles.smallHintText}
                >
                    Nie bój się poprosić o pomoc! Codziennie tysiące użytkowników jest gotowych by pomóc
                </Text>
								<TextInput
                                    testID='content'
									editable
									multiline
									style={[styles.input, {minHeight:400,}]}
									onChangeText={onChangeContent}
									value={content}
									placeholder={'Treść zadania...'}
							/>
									<Text
										style={styles.hintText}
									>
										Dodaj obrazy do swojego pytania
									</Text>
									<View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap'}}>
										{images && images.map((image: any, index) => (
                                            <TouchableOpacity key={index} onPress={() => removeImage(index)} testID={`image-${index}`}>
												<View  style={styles.imageButton}>
														<Image style={{width: 100, height: 100, opacity: .7, borderRadius: 5}} source={{uri: image.images.create.img}}/>
												</View>
                                            </TouchableOpacity>
										))}
                                        <TouchableOpacity onPress={pickImage} testID='uploadButton'>
                                            <View style={styles.uploadButton}>
                                                    <Image style={{width: 50, height: 50,opacity: .5}} source={require('./../../assets/upload-icon.png')}/>
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
                            <Text testID='submit' style={{color:'white', fontWeight:'900', fontSize:22}}>Wyślij</Text>
                        </LinearGradient>
                </TouchableOpacity>
            </ScrollView> 
            </ScrollView>
        </ScrollView>
            
    );
}

const styles = StyleSheet.create({
    button:{
        width:300,
        height:55,
        borderRadius:20,
        margin:20,
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
        height:'auto',
        display:'flex',
        alignItems:'center',
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
        padding:10,
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
});

export default CreatePostScreen;

