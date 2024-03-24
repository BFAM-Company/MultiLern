import React, { useContext, useEffect, useMemo, useState } from "react";
import { KeyboardAvoidingView, Platform, Text, StyleSheet, View, ScrollView, Image, TouchableOpacity, Animated, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FlashcardsListItem from "./FlashcardsListComponents/FlashcardsListItem";
import { AxiosContext } from "../../context/AxiosProvider";
import { UserDataContext } from "../../context/UserContext";
import { ActivityIndicator } from "react-native-paper";

interface fichesSet {
  id: number,
  title: string
}

function FlashcardsListScreen({pageSwitcher, range}: any) {
	const {publicAxios} = useContext(AxiosContext);
  const userContext = useContext(UserDataContext)

  const [fichesSet, setFichesSet] = useState<fichesSet[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isListEnd, setIsListEnd] = useState(false);

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
        console.error(e.message);
      } finally {
        setLoading(false);
      }
    }
  }
    getFiches()
  }, [page])
  

  const FlashcardSet = ({item}: any) => {
    return (
      <View style={styles.optionsContainer}>
        <FlashcardsListItem key={item.id} pageSwitcher={pageSwitcher} flashcardsID={item.id} title={item.title}/>
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
          <FlatList
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
  }
})


export default FlashcardsListScreen;