import React, { useContext, useEffect, useMemo, useState } from "react";
import { KeyboardAvoidingView, Platform, Text, StyleSheet, View, ScrollView, Image, TouchableOpacity, Animated, FlatList, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FlashcardsListItem from "./FlashcardsListComponents/FlashcardsListItem";
import { AxiosContext } from "../../context/AxiosProvider/AxiosProvider";
import { UserDataContext } from "../../context/UserContext/UserContext";
import { ActivityIndicator } from "react-native-paper";
import Modal from "react-native-modal";
import Button from "../../Button/Button";

export interface IFichesSet {
  id: number,
  title: string
}

function FlashcardsListScreen({pageSwitcher, range}: any) {
	const {publicAxios, authAxios} = useContext(AxiosContext);
  const userContext = useContext(UserDataContext)

  const [fichesSet, setFichesSet] = useState<IFichesSet[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isListEnd, setIsListEnd] = useState(false);

  const [modalVisibility, setModalVisibility] = useState(false);
  const [chosenFlashcardSet, setChosenFlashcardCard] = useState<IFichesSet>();

  useEffect(() => {
    const getFiches = async () => {
      setLoading(true);
    if (range === 'all') {
      try {
        const result = await publicAxios.get(`/fiches/${page}`);
        if (result.data.length > 0) {
          setFichesSet((prev) => {
            return [...prev, ...result.data];
          });
        } else {
          setIsListEnd(true);
        }
      } catch (e: any) {
        console.error(e.message);
      } finally {
        setLoading(false);
      }
    } else if (range === 'my') {
      try {
        const userDataId = userContext?.userData?.id;
        if (userDataId) {
          const result = await publicAxios.get(`/fiches/userId/${userDataId}/${page}`);
          if (result.data.length > 0) {
            setFichesSet((prev) => {
              return [...prev, ...result.data];
            });
          } else {
            setIsListEnd(true);
          }
        }
      } catch (e: any) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
  }
    getFiches()
  }, [page])
  
  const deleteFlashcard = async () => {
    try {
        await authAxios.delete(`/fiches/${chosenFlashcardSet?.id}`)
        setModalVisibility(false)
			  Alert.alert('Success!', 'Usunięto fiszki!');
        setFichesSet(prevFichesSet => 
          prevFichesSet.filter(item => item.id !== chosenFlashcardSet?.id)
        );
    }
    catch(error: any){
      Alert.alert('Ups...coś poszło nie tak', error.response.data.message);
    }
  }


  const FlashcardSet = ({item}: any) => {
    return (
      <View style={styles.optionsContainer}>
        <FlashcardsListItem 
          key={item.id} 
          pageSwitcher={pageSwitcher} 
          flashcardsID={item.id} 
          title={item.title} 
          setChosenFlashcardCard={setChosenFlashcardCard}
          setModalVisibility={setModalVisibility}
          range={range}/>
      </View>)
  }

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        {loading ? (
          <ActivityIndicator color="gray" style={{ margin: 15 }} />
        ) : null}
      </View>
    );
  };

  const renderEmptyComponent = () => {
    return (
      <View style={styles.empty}>
        <Text style={{fontSize: 32, color: 'gray'}}>Niestety nic tu nie ma 🤷‍♂</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.mainContainer} edges={['top']}>
      <Modal 
          testID="modal-backdrop"
          isVisible={modalVisibility} 
          onBackdropPress={() => {setChosenFlashcardCard({id: 0, title: ''}); setModalVisibility(false)}}
          style={styles.fichesModal}>
          <View 
            style={styles.fichesModalView}>
            <Text style={{fontSize: 20, textAlign: 'center'}}>Czy na pewno chcesz usunąć fiszki <Text style={{fontSize: 32, fontWeight: '700'}}>{chosenFlashcardSet?.title}?</Text></Text>
             <Button
                colors={['rgb(244,68,78)']}
                fontColor='white'
                buttonAction={deleteFlashcard}>
                Usuń
              </Button>
          </View>
        </Modal>
          <FlatList
            testID="FlatList"
            style={{width: '100%', flex: 1}}
            ListHeaderComponent={range === 'all' ? <Text style={styles.header}>Wszystkie fiszki</Text> : <Text style={styles.header}>Twoje fiszki</Text>}
            data={fichesSet}
            keyExtractor={(item, index) => index.toString()}
            renderItem={FlashcardSet}
            onEndReached={() => {
              if(!isListEnd && !loading) {
                setPage(page + 1)
              }
            }}
            ListFooterComponent={renderFooter}
            ListEmptyComponent={renderEmptyComponent}
            onEndReachedThreshold={0}
          />
        
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer:{
      width:'100%',
      height: '100%',
      flex: 1
  },
  header: {
    width: '100%',
    color:'#c085ff',
    fontSize: 26,
    fontWeight:'900',
    textAlign: 'center',
    padding: 10
  },
  optionsContainer: {
    width: '100%',
    alignItems: 'center'
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  empty: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  fichesModal: {
    width:'100%',
    height:'100%',
    alignItems: 'center',
    margin:0,
  },
  fichesModalView: {
      width:"95%",
      height:'30%',
      backgroundColor:'#fff',
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center',
      borderRadius: 20,
      padding: 16,
    },
})


export default FlashcardsListScreen;