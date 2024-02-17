//types.ts
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DimensionValue } from "react-native"

export type RootStackParamList = {
    Home: undefined,
    LogIn: undefined,
    SignUp: undefined,
    Main: undefined,
    NewFlashcard: undefined,
    FlashcardsList: {range: string},
    FlashcardsSet: {id: number}

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

export interface SignUpPageProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'SignUp'>;
}

export interface NewFlashcardPageProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'NewFlashcard'>;
}


export interface IStylesVariable{
    LogoSize:  number
    ButtonSize:  DimensionValue | undefined
    InputSize: number
}
