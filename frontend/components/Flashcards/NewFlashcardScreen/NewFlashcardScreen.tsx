import React, { useContext, useEffect, useMemo, useState } from 'react';
import {Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, Modal as ErrorModal, View, Alert, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StylesVariables } from '../../../utils/GLOBALS';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { UserDataContext } from '../../context/UserContext';
import Modal from "react-native-modal";
import Button from '../../Button/Button';
import { AxiosContext } from '../../context/AxiosProvider';
import { FichesContext } from '../../context/FichesContext';


function NewFlashcardScreen({pageSwitcher}: any) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState('Tytuł twojego zestawu!')
  const userContext = useContext(UserDataContext)
  const signUpModalVisibility = useMemo(() => {return userContext?.userData?.id === -1}, [userContext?.userData?.id])
  const [errorModalVisibility, setErrorModalVisibility] = useState(false)
  const {authAxios, publicAxios} = useContext(AxiosContext);
  const fichesContext = useContext(FichesContext)

  useEffect(() => {
    return () => {
        fichesContext?.setFichesState(0);
      };
  }, []);

  const {handleSubmit, control, formState: {errors}} = useForm({
  });
  const { fields, remove, append } = useFieldArray({
    control,
    name: "translationsList",
  });

  useEffect(() => {
    const getFiches = async () => {
      if(fichesContext?.fichesState && fichesContext?.fichesState !== 0) {
        const response = await publicAxios.get(`/fiches/id/${fichesContext.fichesState}`)
        if(response && response.data) {
          response.data.fiches_translations.map((item:any) => (
            append({ translations: { create: { foreignTranslation: item.translations.foreignTranslation, polishTranslation: item.translations.polishTranslation } } })
          ))
          setTitle(response.data.title)
        }
      }
      else {
        append({});
      }
    }
    getFiches()
  }, [fichesContext?.fichesState]);


  const onSubmit = async (data: any) => {
    try {
        if(!fichesContext?.fichesState || fichesContext?.fichesState === 0) {
          await authAxios.post('/fiches', {
            title: data.title ? data.title : 'Zestaw fiszek',
            translationsList: data.translationsList,
            userId: userContext?.userData?.id,
            }, {
              headers: {
                'Content-Type': 'application/json'
              }
          })
          Alert.alert('Success!', 'Stworzono fiszki!');
          pageSwitcher('Main')
        }
        else {
          await authAxios.patch(`/fiches/${fichesContext.fichesState}`, {
            title: data.title || title,
            translationsList: data.translationsList
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          Alert.alert('Success!', 'Edytowano fiszki!');
          pageSwitcher('Main')
        }
    }
    catch(error: any){
      Alert.alert('Ups...coś poszło nie tak', error.response.data.message);
    }
  };
  
  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
        <Modal 
          isVisible={signUpModalVisibility} 
          onBackdropPress={() => {pageSwitcher('Main')}}
          style={styles.signUpModal}>
          <View 
            style={styles.signUpView}>
            <Text style={{fontSize: 20}}>Zaloguj się aby stworzyć fiszki!</Text>
             <Button
                colors={['rgb(33,33,43)']}
                fontColor='white'
                buttonAction={() => pageSwitcher('Home')}
              >
                Zaloguj się lub zajerestruj!
              </Button>
          </View>
        </Modal>
        <ErrorModal
					animationType='slide'
					transparent={true}
					visible={errorModalVisibility}
					onRequestClose={() => {
						setErrorModalVisibility(!errorModalVisibility)
					}}
				>
					<TouchableOpacity
					style={{
							width: '100%',
							height: '100%',
							//@ts-ignore
							cursor: 'default'
						}}
						onPress={() => setErrorModalVisibility(false)}
						activeOpacity={1}
					>
					<View style={styles.centeredViewModal}>
						<View style={styles.modalView}>
              <Text style={styles.errorMessage}>⚠ Nie uzupełniłes wszystkich pól!</Text>
						</View>
					</View>
					</TouchableOpacity>


				</ErrorModal>
        <ScrollView>
          <SafeAreaView style={styles.mainContainer}>
            <View style={styles.topicContainer}>
              {isEditing ? 
                <Controller
                  name="title"
                  control={control}
                  render={({field: {onChange, onBlur, value}}) => (
                    <TextInput 
                      style={[styles.topicInput]} 
                      placeholder='Wpisz tytuł'
                      defaultValue={title}
                      autoFocus
                      onBlur={() => {onBlur; setIsEditing(false)}}
                      onChangeText={(text) => {onChange(text); setTitle(text)}}
                      value={value}
                    />
                  )}
                />
                :
                <Text style={[styles.topicText]} onPress={() => setIsEditing(true)}>{title}</Text>
              } 
              <View style={styles.saveIcon}>
                <Pressable
                  onPress={handleSubmit(onSubmit, () => setErrorModalVisibility(true))}>
                  <Image
                    style={{width: 25, height: 25, tintColor: '#764ba3',}}
                    source= {require('./../../../assets/check-mark_icon.png')}
                  />
                </Pressable>
              </View>
            </View>
            <View style={styles.flashcardsContainer}>
              {fields.map((field, index) => (
                <View key={field.id} style={styles.flashcard}>
                  <View style={styles.closeIcon}>
                    <Pressable
                      onPress={() => remove(index)}
                    >
                      <Image
                        style={{width: 25, height: 25, tintColor: '#764ba3',}}
                        source= {require('./../../../assets/close_icon.png')}
                      />
                    </Pressable>
                  </View>
                  <Controller
                    name={`translationsList[${index}].translations.create.foreignTranslation`}
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput 
                        style={styles.input}  
                        placeholder='Podaj obce tłumaczenie'
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    rules={{required: "Obce tłumaczenie jest wymagane",}}
                    />
                    <Controller
                      name={`translationsList[${index}].translations.create.polishTranslation`}
                      control={control}
                      render={({field: {onChange, onBlur, value}}) => (
                        <TextInput 
                          style={styles.input}  
                          placeholder='Podaj obce tłumaczenie'
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                        />
                      )}
                      rules={{required: "Polskie tłumaczenie jest wymagane",}}
                    />
                </View>
              ))}
            </View>
            <View style={styles.addIcon}>
              <Pressable
                onPress={() => append({})}>
                <Image
                  style={{width: 25, height: 25, tintColor: 'white',}}
                  source= {require('./../../../assets/plus_icon.png')}
                />
              </Pressable>
            </View>
          </SafeAreaView>
        </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
    mainContainer: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    topicContainer: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: 10
    },
    input: {
      backgroundColor: 'white',
      width: '90%',
      height: StylesVariables.InputSize,
      borderColor: '#764ba3',
      borderWidth: 2,
      borderRadius:20,
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      paddingLeft: 10
    },
    topicInput: {
      width: '80%',
      height: StylesVariables.InputSize/1.3,
      borderBottomWidth: 2,
      borderBottomColor: '#c085ff',
      backgroundColor: '#cfa4fc33',
      padding: 0.4,
      color:'#c085ff',
      paddingLeft: 10,
      marginLeft: 10,
    },
    topicText: {
      width: '85%',
      color:'#c085ff',
      fontSize: 26,
      fontWeight:'900',
      textAlign: 'center',
      textAlignVertical: 'center'
    },
    flashcardsContainer: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 5,
      marginTop: 10
    },
    flashcard: {
      margin:10,
      width:'90%',
      display:'flex',
      alignItems:'center',
      justifyContent:'space-between',
      gap: 20,
      borderRadius:20,
      padding:20,
      backgroundColor:'#fff',
      shadowColor: "#000",
      shadowOffset: {
              width: 0,
              height: 0,
      },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
      position: 'relative'
    },
    closeIcon: {
      position: 'absolute',
      color: '#764ba3',
      top: 0,
      right: 0,
      zIndex: 2,
      padding: 5
    },
    addIcon: {
      padding: 5,
      width: 50,
      height: 50,
      backgroundColor: '#764ba3',
      borderRadius: 50,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10
    },
    saveIcon: {
      display:  'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
      width: 50,
      height: 50,
      color: '#764ba3',
      zIndex: 2,
      marginRight: 7
    },
    signUpModal: {
      width:'100%',
      height:'100%',
      alignItems: 'center',
      margin:0,
    },
    signUpView: {
      width:"90%",
      height:'30%',
      backgroundColor:'#fff',
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center',
      borderRadius: 20
    },
    centeredViewModal: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  errorMessage: {
    color: "#bf1650",
    margin: 4,
  },

})

export default NewFlashcardScreen;