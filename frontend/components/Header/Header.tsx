import { Image, StyleSheet, Text, View } from "react-native";

export default function Header() {
  return(
    <View style={styles.header}>
      <Text>Header i chuj</Text>
      <Image src="../../assets/multilern-logo.svg"/>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 50,
    backgroundColor: 'red',
  }
})