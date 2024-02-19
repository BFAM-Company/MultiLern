import React, { useEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StylesVariables } from '../../../utils/GLOBALS';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

function NewFlashcardScreen({pageSwitcher}: any) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState('Tytuł twojego zestawu!')

  const {handleSubmit, watch, control, formState: {errors}} = useForm();
  const { fields, remove, append } = useFieldArray({
    control,
    name: "flashcards",
  });

  useEffect(() => {
    append({});
  }, []);

  const onSubmit = (data: any) => {
    console.log(data);
  };
  
  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
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
                  onPress={handleSubmit(onSubmit)}>
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
                    name={`flashcards[${index}].foreignTranslation`}
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput 
                        style={styles.input}  
                        placeholder='Podaj obce tłumaczenie'
                        onBlur={onBlur}
                        onChangeText={onChange}
                      />
                    )}
                    rules={{required: "Obce tłumaczenie jest wymagane",}}
                    />
                    <Controller
                      name={`flashcards[${index}].polishTranslation`}
                      control={control}
                      render={({field: {onChange, onBlur, value}}) => (
                        <TextInput 
                          style={styles.input}  
                          placeholder='Podaj obce tłumaczenie'
                          onBlur={onBlur}
                          onChangeText={onChange}
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
      alignItems: 'center'
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
              // height: -100,
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
    }
})

export default NewFlashcardScreen;