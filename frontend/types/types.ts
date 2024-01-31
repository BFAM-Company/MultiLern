//types.ts
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DimensionValue } from "react-native"

export type RootStackParamList = {
    Home: undefined,
    LogIn: undefined
}

export interface PageSwitchTemplateProps {
    navigation: NativeStackNavigationProp<RootStackParamList, keyof RootStackParamList>;//typy do dopracowania
    children: JSX.Element
}


export interface HomePageProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
  }
  
export interface LogInPageProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'LogIn'>;
  }

export interface IStylesVariable{
    LogoSize:  number
    ButtonSize:  DimensionValue | undefined
    InputSize: number
}
